<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <EditDialog ref="EditDialog" v-on:update-option="SendUpdateData" />
    <CreateDialog ref="CreateDialog" v-on:create-option="SendCreateData" />
    <DeleteDialog ref="DeleteDialog" v-on:delete-option="SendDeleteData" />
    <CreateStockDialog
      ref="CreateStockDialog"
      :option_1="option_1"
      :option_2="option_2"
      v-on:create-stock="SendCreateStock"
    />
    <EditStockDialog
      ref="EditStockDialog"
      :option_1="option_1"
      :option_2="option_2"
      v-on:update-stock="SendCreateStock"
    />
    <v-card class="grey lighten-3 overflow-hidden">
      <v-toolbar dark color="primary">
        <v-toolbar-title>商品庫存設定</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="Cancel"> 關閉 </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row class="pa-8">
        <v-col cols="12">
          <h2>{{ product_name }}</h2>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex justify-space-between align-center">
            <h3>選項一</h3>
            <v-btn
              @click="OpenCreate(id, 'Color')"
              color="primary font-weight-bold"
              >新增</v-btn
            >
          </div>
          <ListShow
            v-if="option_1 != null"
            type="Color"
            v-on:re-load="GetGoodsStockData"
            v-on:delete-option="OpenDelete"
            v-on:set-edit="OpenEdit"
            v-model="option_1"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex justify-space-between align-center">
            <h3>選項二</h3>
            <v-btn
              @click="OpenCreate(id, 'Size')"
              color="primary font-weight-bold"
              >新增</v-btn
            >
          </div>
          <ListShow
            v-if="option_2 != null"
            type="Size"
            v-on:re-load="GetGoodsStockData"
            v-on:delete-option="OpenDelete"
            v-on:set-edit="OpenEdit"
            v-model="option_2"
          />
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
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
              <v-btn @click="OpenCreateStock()" color="primary font-weight-bold"
                >新增</v-btn
              >
            </div>
          </div>
          <StockList
            v-if="stocks != null"
            :option_1="option_1"
            :option_2="option_2"
            v-on:set-edit="OpenEditStock"
            v-on:sort-update="SendUpdateSortData"
            v-model="filter_stock"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { get_goods } from '@/api/products.js';
import {
  getOptionStock,
  create_color,
  create_size,
  update_color,
  update_size,
  create_stock,
  update_stock_sort,
} from '@/api/product_option.js';
import ListShow from './ListShow/index.vue';
import StockList from './StockListShow/index.vue';
import CreateDialog from './CreateDialog/index.vue';
import CreateStockDialog from './CreateStockDialog/index.vue';
import EditDialog from './EditDialog/index.vue';
import EditStockDialog from './EditStockDialog/index.vue';
import DeleteDialog from './DeleteDialog/index.vue';
export default {
  name: 'OptionDialog',
  components: {
    ListShow,
    StockList,
    CreateDialog,
    DeleteDialog,
    EditDialog,
    CreateStockDialog,
    EditStockDialog,
  },
  data() {
    return {
      id: 1,
      product: null,
      option_1: null,
      option_2: null,
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
    Open(id) {
      console.log(id);
      this.id = id;
      this.GetGoodsStockData();
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    OpenCreate(id, type) {
      this.$refs.CreateDialog.Open(id, type);
    },
    OpenEdit(id, type, title) {
      this.$refs.EditDialog.Open(id, type, title);
    },
    OpenDelete(item) {
      this.$refs.DeleteDialog.Open(item);
    },
    SortOption(data, title) {
      let tmp_data = JSON.parse(JSON.stringify(data));
      let first_option = tmp_data.filter((item) => item[title] == '無')[0];
      tmp_data.splice(tmp_data.indexOf(first_option), 1);
      tmp_data.splice(0, 0, first_option);
      return tmp_data;
    },
    OpenCreateStock() {
      this.$refs.CreateStockDialog.Open();
    },
    OpenEditStock(item) {
      this.$refs.EditStockDialog.Open(item);
    },
    async GetGoodsStockData() {
      get_goods().then((res) => {
        this.product = res.data.filter((item) => item.GoodsID == this.id)[0];
        getOptionStock(this.product.GoodsID).then((res) => {
          this.option_1 = res[0].data.filter((item) => {
            return item.GoodsID == this.product.GoodsID || item.GoodsID == 0
              ? item.Status == 'Y'
                ? item
                : ''
              : '';
          });
          // this.option_1 = this.SortOption(this.option_1, 'ColorTitle');
          this.option_2 = res[1].data.filter((item) => {
            return item.GoodsID == this.product.GoodsID || item.GoodsID == 0
              ? item.Status == 'Y' && item.SizeTitle != 'F'
                ? item
                : ''
              : '';
          });
          this.option_2 = this.SortOption(this.option_2, 'SizeTitle');
          this.stocks = res[2].data;
        });
      });
    },
    async SendCreateData(data) {
      if (data.ColorTitle) {
        create_color(data).then(() => {
          this.$refs.CreateDialog.Cancel();
          this.GetGoodsStockData();
        });
      } else {
        create_size(data).then(() => {
          this.$refs.CreateDialog.Cancel();
          this.GetGoodsStockData();
        });
      }
    },
    async SendUpdateData(data) {
      data.GoodsID = this.id;
      if (data.ColorTitle) {
        data.ID = data.ColorID;
        update_color(data).then(() => {
          this.$refs.EditDialog.Cancel();
          this.GetGoodsStockData();
        });
      } else {
        data.ID = data.SizeID;
        update_size(data).then(() => {
          this.$refs.EditDialog.Cancel();
          this.GetGoodsStockData();
        });
      }
    },
    async SendDeleteData(data) {
      // 停用相關庫存
      if (data.ColorTitle) {
        for (let item of this.stocks) {
          if (item.ColorID == data.ColorID) {
            item.Status = 'N';
            await this.SendCreateStock(item);
          }
        }
      } else {
        for (let item of this.stocks) {
          if (item.SizeID == data.SizeID) {
            item.Status = 'N';
            await this.SendCreateStock(item);
          }
        }
      }

      // 停用該選項
      data.Status = 'N';
      this.SendUpdateData(data);
      this.$refs.DeleteDialog.Cancel();
    },
    async SendCreateStock(data) {
      data.GoodsID = this.id;
      create_stock(data).then(() => {
        this.$refs.CreateStockDialog.Cancel();
        this.$refs.EditStockDialog.Cancel();
        this.GetGoodsStockData();
      });
    },
    async SendUpdateSortData(data) {
      console.log(data);
      update_stock_sort(data).then(() => {
        this.GetGoodsStockData();
      });
    },
  },
};
</script>
