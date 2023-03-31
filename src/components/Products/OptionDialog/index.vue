<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <OptionTitleDialog
      ref="OptionTitleDialog"
      @update-action="UpdateOptionTitle"
    />
    <EditDialog
      ref="EditDialog"
      @update-action="UpdateOptionData"
      @create-action="CreateOptionData"
    />
    <DeleteDialog ref="DeleteDialog" @delete-action="DeleteOptionData" />
    <EditStockDialog
      ref="EditStockDialog"
      :option_1="option_1"
      :option_2="option_2"
      v-on:update-stock="CreateStockData"
    />
    <EditMultipleStockDialog
      ref="EditMultipleStockDialog"
      :option_1="option_1"
      :option_2="option_2"
      @update-stock="CreateMultipleStockData"
    />
    <v-card v-if="product != null" class="grey lighten-3 overflow-hidden">
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
        <v-col cols="12" md="6">
          <div class="d-flex justify-space-between align-center mb-2">
            <h3>{{ product.Option1 }}</h3>
            <div>
              <v-btn
                @click="OpenOptionTitleEdit"
                class="green lighten-1 white--text mr-2 font-weight-bold elevation-0"
                >編輯選項標題</v-btn
              ><v-btn
                @click="OpenCreateOptionDialog('Color')"
                class="light-blue lighten-1 white--text font-weight-bold elevation-0"
                >新增</v-btn
              >
            </div>
          </div>
          <MainList
            v-if="option_1 != null && option_1 != undefined"
            :options="option_table_options"
            :headers="option_table_headers"
            @delete-action="OpenDelete"
            @title-action="OpenEditOptionDialog($event, 'Color')"
            v-model="option_1"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex justify-space-between align-center mb-2">
            <h3>{{ product.Option2 }}</h3>

            <div>
              <v-btn
                @click="OpenOptionTitleEdit"
                class="green lighten-1 white--text mr-2 font-weight-bold elevation-0"
                >編輯選項標題</v-btn
              >
              <v-btn
                @click="OpenCreateOptionDialog('Size')"
                class="light-blue lighten-1 white--text font-weight-bold elevation-0"
                >新增</v-btn
              >
            </div>
          </div>
          <MainList
            v-if="option_2 != null && option_2 != undefined"
            :options="option_table_options"
            :headers="option_table_headers"
            @delete-action="OpenDelete"
            @title-action="OpenEditOptionDialog($event, 'Size')"
            v-model="option_2"
          />
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center mb-2">
            <h3>庫存設定</h3>
            <div class="d-flex align-center">
              <v-select
                class="mr-5"
                v-model="option_1_key"
                :items="color_select_list"
                item-text="ColorTitle"
                item-value="ColorID"
                label="選項一篩選"
                dense
                hide-details=""
                outlined
              ></v-select>
              <v-select
                class="mr-5"
                v-model="option_2_key"
                :items="size_select_list"
                item-text="SizeTitle"
                item-value="SizeID"
                label="選項二篩選"
                dense
                hide-details=""
                outlined
              ></v-select>

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
                @click="OpenEditMultipleStockDialog()"
                class="green mr-2 lighten-1 white--text font-weight-bold elevation-0"
                >大量管理庫存</v-btn
              >
              <v-btn
                @click="OpenCreateStockDialog()"
                class="light-blue lighten-1 white--text font-weight-bold elevation-0"
                >新增庫存</v-btn
              >
            </div>
          </div>

          <MainDragList
            v-if="stocks != null"
            :options="stock_table_options"
            :headers="stock_table_headers"
            :hide_footer="false"
            @sort-action="SortStockData"
            @edit-action="OpenEditStockDialog"
            v-model="filter_stock"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { get_goods, update_goods } from '@/api/products.js';
import {
  getOptionStock,
  create_color,
  create_size,
  update_color,
  update_size,
  create_stock,
  update_stock_sort,
} from '@/api/product_option.js';
import MainList from '@/components/MainList/';
import MainDragList from '@/components/MainDragList/index';
import EditDialog from './EditDialog/index.vue';
import EditStockDialog from './EditStockDialog/index.vue';
import DeleteDialog from '@/components/MainDeleteDialog/index.vue';
import OptionTitleDialog from '@/components/Products/OptionDialog/EditOptionTitleDialog/index.vue';
import EditMultipleStockDialog from '@/components/Products/OptionDialog/EditMultipleStockDialog/index.vue';
export default {
  name: 'OptionDialog',
  components: {
    DeleteDialog,
    EditDialog,
    EditStockDialog,
    MainList,
    MainDragList,
    OptionTitleDialog,
    EditMultipleStockDialog,
  },
  data() {
    return {
      id: 1,
      product: null,
      option_1: null,
      option_2: null,
      stocks: null,
      dialog: false,
      option_1_key: 0,
      option_2_key: 0,
      stock_filter_list: ['全部顯示', '只顯示啟用', '只顯示停用'],
      stock_filter: '只顯示啟用',
      option_table_options: {
        action: [
          {
            title: '刪除',
            class: 'error',
            action: 'delete-action',
          },
        ],
        status: [
          {
            title: '已啟用',
            class: 'success',
            condition: 'Y',
          },
          {
            title: '已停用',
            class: '',
            condition: 'N',
          },
        ],
      },
      option_table_headers: [
        {
          text: '規格名稱',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '上架時間', value: 'created_at' },
        { text: '操作', value: 'action' },
      ],
      stock_table_options: {
        action: [
          {
            title: '編輯',
            class: 'success',
            action: 'edit-action',
          },
        ],
        status: [
          {
            title: '已啟用',
            class: 'success',
            condition: 'Y',
          },
          {
            title: '已停用',
            class: '',
            condition: 'N',
          },
        ],
      },
      stock_table_headers: [
        {
          text: '規格一',
          value: 'ColorTitle',
        },
        {
          text: '規格二',
          value: 'SizeTitle',
        },
        { text: '庫存量', value: 'Stock' },
        { text: '建議售價', value: 'Price' },
        { text: '實際售價', value: 'SellPrice' },
        { text: '啟用狀態', value: 'Status' },
        { text: '動作', value: 'action' },
      ],
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
      let tmp_stock = JSON.parse(JSON.stringify(this.stocks));
      if (this.stock_filter == '只顯示啟用') {
        tmp_stock = tmp_stock.filter((item) => item.Status == 'Y');
      } else {
        tmp_stock = tmp_stock.filter((item) => item.Status == 'N');
      }
      if (this.option_1_key != 0) {
        tmp_stock = tmp_stock.filter(
          (item) => item.ColorID == this.option_1_key
        );
      }
      if (this.option_2_key != 0) {
        tmp_stock = tmp_stock.filter(
          (item) => item.SizeID == this.option_2_key
        );
      }
      return tmp_stock;
    },
    color_select_list() {
      if (this.option_1 == null) {
        return [{ ColorID: 0, ColorTitle: '全部' }];
      }
      return [{ ColorID: 0, ColorTitle: '全部' }, ...this.option_1];
    },
    size_select_list() {
      if (this.option_2 == null) {
        return [{ SizeID: 0, SizeTitle: '全部' }];
      }
      return [{ SizeID: 0, SizeTitle: '全部' }, ...this.option_2];
    },
  },
  methods: {
    // main dialog
    Open(id) {
      this.id = id;
      this.GetGoodsStockData();
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    GetGoodsStockData() {
      get_goods().then((res) => {
        this.product = res.data.filter((item) => item.GoodsID == this.id)[0];
        this.stock_table_headers[0].text = this.product.Option1;
        this.stock_table_headers[1].text = this.product.Option2;
        getOptionStock(this.product.GoodsID).then((res) => {
          console.log(res);
          this.option_1 = this.SortOption(res[0].data, 'ColorTitle');
          this.option_2 = this.SortOption(res[1].data, 'SizeTitle');
          this.stocks = res[2].data;
        });
      });
    },
    // options
    OpenCreateOptionDialog(option_type) {
      this.$refs.EditDialog.Open(0, this.id, option_type, '', 'create');
    },
    OpenEditOptionDialog(option, option_type) {
      console.log(option, option_type);
      this.$refs.EditDialog.Open(
        option[`${option_type}ID`],
        this.id,
        option_type,
        option[`${option_type}Title`],
        'edit'
      );
    },
    OpenOptionTitleEdit() {
      this.$refs.OptionTitleDialog.Open(this.product);
    },
    OpenDelete(item) {
      this.$refs.DeleteDialog.Open(item);
    },
    SortOption(data, title) {
      data = data.filter(
        (item) => item.GoodsID == this.product.GoodsID || item.GoodsID == 0
      );
      data = data.filter((item) => item.Status == 'Y' && item.SizeTitle != 'F');
      data.forEach((item, item_index) => {
        data[item_index].TableTitle = item[title];
        if (data[item_index].TableTitle == '無') {
          data[item_index].TitleActionDisable = true;
          data[item_index].ActionDisable = true;
        }
      });

      let first_option = data.filter((item) => item[title] == '無')[0];
      data.splice(data.indexOf(first_option), 1);
      data.splice(0, 0, first_option);
      return data;
    },
    CreateOptionData(data) {
      if (data.ColorTitle) {
        create_color(data).then(() => {
          this.$refs.EditDialog.Cancel();
          this.GetGoodsStockData();
        });
      } else {
        create_size(data).then(() => {
          this.$refs.EditDialog.Cancel();
          this.GetGoodsStockData();
        });
      }
    },
    UpdateOptionData(data) {
      if (data.ColorTitle) {
        update_color(data).then(() => {
          this.$refs.EditDialog.Cancel();
          this.GetGoodsStockData();
        });
      } else {
        update_size(data).then(() => {
          this.$refs.EditDialog.Cancel();
          this.GetGoodsStockData();
        });
      }
    },
    async DeleteOptionData(data) {
      // 停用相關庫存
      if (data.ColorTitle) {
        data.ID = data.ColorID;
        for (let item of this.stocks) {
          if (item.ColorID == data.ColorID) {
            item.Status = 'N';
            await this.CreateStockData(item);
          }
        }
      } else {
        data.ID = data.SizeID;
        for (let item of this.stocks) {
          if (item.SizeID == data.SizeID) {
            item.Status = 'N';
            await this.CreateStockData(item);
          }
        }
      }

      // 停用該選項
      data.Status = 'N';
      this.UpdateOptionData(data);
      this.$refs.DeleteDialog.Cancel();
    },
    // stocks
    OpenCreateStockDialog() {
      this.$refs.EditStockDialog.Open(null, 'create');
    },
    OpenEditStockDialog(item) {
      this.$refs.EditStockDialog.Open(item, 'edit');
    },
    OpenEditMultipleStockDialog() {
      this.$refs.EditMultipleStockDialog.Open();
    },
    CreateStockData(data) {
      data.GoodsID = this.id;
      create_stock(data).then(() => {
        this.$refs.EditStockDialog.Cancel();
        this.GetGoodsStockData();
      });
    },
    async CreateMultipleStockData({ data, options }) {
      for (let option_item of options) {
        let tmp_data = Object.assign({}, data);
        tmp_data.GoodsID = this.id;
        tmp_data.ColorID = option_item[0];
        tmp_data.SizeID = option_item[1];
        let result = await create_stock(tmp_data);
        console.log(result);
        await setTimeout(() => {}, 1000);
      }
      this.$refs.EditMultipleStockDialog.Cancel();
    },
    UpdateOptionTitle({ Option1, Option2 }) {
      this.product.Option1 = Option1;
      this.product.Option2 = Option2;
      this.product.ID = this.product.GoodsID;
      update_goods(this.product).then((res) => {
        console.log(res);
        this.GetGoodsStockData();
        this.$refs.OptionTitleDialog.Cancel();
      });
    },
    SortStockData(data) {
      console.log(data);
      let tmp_data = JSON.parse(JSON.stringify(data));
      tmp_data.forEach((item, item_index) => {
        tmp_data[item_index].Seq = item_index + 2;
      });
      update_stock_sort(tmp_data).then(() => {
        this.GetGoodsStockData();
      });
    },
  },
};
</script>
