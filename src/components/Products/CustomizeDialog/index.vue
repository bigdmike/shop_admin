<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <CreateAllStockDialog
      ref="CreateAllStockDialog"
      :product_id="id"
      :spec_data="spec"
      :category_data="category"
    />
    <DeleteDialog ref="DeleteDialog" />
    <EditStockDialog
      ref="EditStockDialog"
      :spec_data="spec"
      :category_data="category"
      v-on:update-stock="CreateStockData"
    />
    <v-card class="grey lighten-3 overflow-hidden">
      <v-toolbar class="white primary--text elevation-1">
        <v-toolbar-title>
          <p class="ma-0 font-weight-bold">商品庫存設定</p>
          <p class="ma-0 text-caption">{{ product_name }}</p></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <div class="d-flex align-center">
            <v-btn class="elevation-0" outlined @click="Cancel"> 關閉 </v-btn>
          </div>
        </v-toolbar-items>
      </v-toolbar>
      <v-row class="pa-8">
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center mb-2">
            <h3>庫存設定</h3>
            <div class="d-flex align-center">
              <v-select
                class="mr-5"
                v-model="stock_filter"
                :items="stock_filter_list"
                label="篩選設定"
                dense
                hide-details=""
                outlined
              ></v-select>
              <v-btn
                @click="OpenCreateAllStockDialog()"
                class="light-blue lighten-1 white--text font-weight-bold elevation-0"
                >自動產生庫存</v-btn
              >
              <v-btn
                @click="OpenCreateStockDialog()"
                class="light-blue lighten-1 white--text font-weight-bold elevation-0"
                >新增庫存</v-btn
              >
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="4"
          v-for="(item, item_index) in stocks"
          :key="`stock_${item_index}`"
        >
          <v-card class="pa-5 rounded-lg">
            <div class="d-flex justify-space-between">
              <div class="d-flex">
                <h4 class="primary--text mb-1 mr-2">
                  庫存選項{{ item_index + 1 }}
                </h4>
                <v-chip
                  label
                  small
                  :color="item.Status == 'Y' ? 'success' : ''"
                  >{{ item.Status == 'Y' ? '已啟用' : '已停用' }}</v-chip
                >
              </div>
              <div cols="12" md="6" class="d-flex pb-0">
                <p class="mb-0 text-body-2 mr-2">售價:</p>
                <p class="mb-0 text-body-2">{{ item.SellPrice }}</p>
              </div>
            </div>
            <v-divider class="mb-2"></v-divider>
            <v-row class="mb-2">
              <v-col
                cols="12"
                md="6"
                v-for="(spec, spec_index) in item.SpecList"
                :key="`spec_${item_index}_${spec_index}`"
                class="d-flex"
              >
                <p class="mb-0 text-body-2 mr-2">{{ spec.CategoryTitle }}:</p>
                <p class="mb-0 text-body-2">{{ spec.Title }}</p>
              </v-col>
            </v-row>
            <div class="d-flex justify-end">
              <v-btn
                small
                @click="OpenEditStockDialog(item)"
                class="light-blue lighten-1 white--text font-weight-bold elevation-0"
                >編輯</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { create_stock, update_stock_sort } from '@/api/product_customize.js';
import { getOptionStock } from '@/api/product_customize.js';
import EditStockDialog from './EditStockDialog/index.vue';
import DeleteDialog from '@/components/MainDeleteDialog/index.vue';
import CreateAllStockDialog from '@/components/Products/CustomizeDialog/CreateAllStockDialog/index.vue';
export default {
  name: 'CustomizeDialog',
  components: {
    DeleteDialog,
    EditStockDialog,
    CreateAllStockDialog,
  },
  data() {
    return {
      id: 1,
      category: null,
      spec: null,
      stocks: null,
      dialog: false,
      stock_filter_list: ['全部顯示', '只顯示啟用', '只顯示停用'],
      stock_filter: '只顯示啟用',
    };
  },
  computed: {
    product_name() {
      return this.product == null ? '' : this.product.Title;
    },
    filter_stock() {
      if (this.stocks == null) {
        return null;
      }
      if (this.stock_filter == '全部顯示') {
        return this.stocks;
      } else if (this.stock_filter == '只顯示啟用') {
        return this.stocks.filter((item) => item.Status == 'Y');
      } else {
        return this.stocks.filter((item) => item.Status == 'N');
      }
    },
  },
  methods: {
    // main dialog
    Open(id) {
      this.id = id;
      this.GetStockOptionData();
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    GetStockOptionData() {
      getOptionStock(this.id).then((res) => {
        // [category, spec, stocks]
        res[1].data.forEach((item) => {
          item.CategoryTitle = res[0].data.filter(
            (category) => category.SpecCategoryID == item.SpecCategoryID
          )[0].Title;
        });
        res[2].data.forEach((item) => {
          item.SpecList = [];
          item.CustomSpecID.split(',').forEach((spec) => {
            const spec_data = res[1].data.filter(
              (spec_item) => spec_item.CustomSpecID == spec
            )[0];
            item.SpecList.push({
              Title: spec_data.Title,
              CustomSpecID: spec_data.CustomSpecID,
              CategoryTitle: spec_data.CategoryTitle,
              SpecCategoryID: spec_data.SpecCategoryID,
            });
          });
        });
        this.category = res[0].data;
        this.spec = res[1].data;
        this.stocks = res[2].data.filter((item) => item.GoodsID == this.id);
      });
    },
    OpenCreateAllStockDialog() {
      this.$refs.CreateAllStockDialog.Open();
    },
    // stocks
    OpenCreateStockDialog() {
      this.$refs.EditStockDialog.Open(null, 'create');
    },
    OpenEditStockDialog(item) {
      this.$refs.EditStockDialog.Open(item, 'edit');
    },
    CreateStockData(data) {
      data.GoodsID = this.id;
      data.CustomSpecID = '';
      data.SpecList.forEach((item, item_index) => {
        item_index != 0 ? (data.CustomSpecID += ',') : '';
        data.CustomSpecID += item.CustomSpecID;
      });
      create_stock(data).then(() => {
        this.$refs.EditStockDialog.Cancel();
        this.GetStockOptionData();
      });
    },
    SortStockData(data) {
      let tmp_data = JSON.parse(JSON.stringify(data));
      tmp_data.forEach((item, item_index) => {
        tmp_data[item_index].Seq = item_index + 2;
      });
      update_stock_sort(tmp_data).then(() => {
        this.GetStockOptionData();
      });
    },
  },
};
</script>
