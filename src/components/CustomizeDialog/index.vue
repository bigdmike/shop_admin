<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <MainDeleteDialog ref="MainDeleteDialog" @delete-action="CheckDeleteData" />
    <ChangePriceDialog
      ref="ChangePriceDialog"
      :spec_list="spec_list"
      :category_list="category_list"
      @create-action="CreateChangePrice"
      @update-action="UpdateChangePrice"
    />
    <BlackListDialog
      ref="BlackListDialog"
      :spec_list="spec_list"
      :category_list="category_list"
      @create-action="CreateBlackList"
      @update-action="UpdateBlackList"
    />
    <v-card v-if="stock_data != null" class="grey lighten-3 overflow-hidden">
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
        <v-col cols="6">
          <v-card elevation="2" class="pa-8 mb-5 rounded-lg">
            <h3 class="mt-0 mb-2">庫存設定</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  label="啟用狀態"
                  v-model="stock_data.Status"
                  :items="status_data"
                  item-text="label"
                  item-value="value"
                  hide-details
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="stock_data.Stock"
                  label="庫存"
                  dense
                  hide-details
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="stock_data.DeliverWeight"
                  label="重量"
                  dense
                  hide-details
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="stock_data.DeliverVolume"
                  label="積材尺寸"
                  dense
                  hide-details
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn elevation="0" color="primary" @click="CreateStockData">
                  儲存
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="2" class="pa-8 mb-5 rounded-lg">
            <h3 class="mt-0 mb-2">金額設定</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="stock_data.Price"
                  label="原價"
                  dense
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="stock_data.SellPrice"
                  label="售價"
                  dense
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="stock_data.MemberSellPrice"
                  label="會員價"
                  dense
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn elevation="0" color="primary" @click="CreateStockData">
                  儲存
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="pa-8">
        <v-col cols="12" class="d-flex justify-space-between aligns-center">
          <h3 class="mt-0 mb-2">停用組合設定</h3>
          <v-btn
            @click="OpenBlackListDialog(null)"
            elevation="0"
            color="primary"
          >
            新增停用組合
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          md="4"
          lg="3"
          v-for="(item, item_index) in black_list"
          :key="`black_card_${item_index}`"
        >
          <v-card elevation="2" class="pa-5 rounded-lg" variant="outlined">
            <div>
              <div class="mb-5">
                <div class="text-overline mb-1 red--text">
                  停用組合
                </div>
                <div class="text-caption">
                  <span
                    class="d-block"
                    v-for="(tag, tag_index) in item.SpecList"
                    :key="`black_${item_index}_${tag_index}`"
                  >
                    {{ GetCategoryTitle(tag.SpecCategoryID) }}:{{
                      GetSpecTitle(tag.CustomSpecID)
                    }}
                  </span>
                </div>
              </div>
              <div class="d-flex justify-end">
                <v-btn
                  @click="OpenBlackListDialog(item)"
                  elevation="0"
                  small
                  color="primary"
                >
                  編輯
                </v-btn>
                <v-btn @click="OpenDeleteDialog(item)" color="error" small text>
                  刪除
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="pa-8">
        <v-col cols="12" class="d-flex justify-space-between aligns-center">
          <h3 class="mt-0 mb-2">特殊價格設定</h3>
          <v-btn
            @click="OpenChangePriceDialog(null)"
            elevation="0"
            color="primary"
          >
            新增價格組合
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          md="4"
          lg="3"
          v-for="(item, item_index) in change_price_list"
          :key="`change_card_${item_index}`"
        >
          <v-card elevation="2" class="pa-5 rounded-lg" variant="outlined">
            <div>
              <div class="mb-5">
                <div class="text-overline mb-1 primary--text">
                  特殊價格組合
                </div>
                <div class="text-caption">
                  <span
                    class="d-block"
                    v-for="(tag, tag_index) in item.SpecList"
                    :key="`black_${item_index}_${tag_index}`"
                  >
                    {{ GetCategoryTitle(tag.SpecCategoryID) }}:{{
                      GetSpecTitle(tag.CustomSpecID)
                    }}
                  </span>
                </div>
              </div>
              <div class="d-flex justify-space-between aligns-center">
                <p
                  class="body-2 font-weight-bold"
                  :class="
                    parseInt(item.ChangePrice) > 0
                      ? 'success--text'
                      : 'red--text'
                  "
                >
                  {{ parseInt(item.ChangePrice) > 0 ? '+' : '-' }} NT${{
                    Math.abs(item.ChangePrice)
                  }}
                </p>
                <div class="d-flex justify-end">
                  <v-btn
                    @click="OpenChangePriceDialog(item)"
                    elevation="0"
                    small
                    color="primary"
                  >
                    編輯
                  </v-btn>
                  <v-btn
                    @click="OpenDeleteDialog(item)"
                    color="error"
                    small
                    text
                  >
                    刪除
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  create_stock,
  create_black_list,
  update_black_list,
  delete_black_list,
  create_change_price,
  update_change_price,
  delete_change_price,
} from '@/api/product_customize.js';
import { getOptionStock } from '@/api/product_customize.js';
import BlackListDialog from '@/components/CustomizeDialog/BlackListDialog';
import ChangePriceDialog from '@/components/CustomizeDialog/ChangePriceDialog';
import MainDeleteDialog from '@/components/MainDeleteDialog/index.vue';
export default {
  name: 'CustomizeDialog',
  components: {
    BlackListDialog,
    MainDeleteDialog,
    ChangePriceDialog,
  },
  data() {
    return {
      id: 1,
      category_list: null,
      spec_list: null,
      stock_data: null,
      black_list: null,
      change_price_list: null,
      dialog: false,
      stock_filter_list: ['全部顯示', '只顯示啟用', '只顯示停用'],
      stock_filter: '只顯示啟用',
      status_data: [
        {
          label: '已啟用',
          value: 'Y',
        },
        {
          label: '已停用',
          value: 'N',
        },
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
        //  [category, spec, stocks, blacklist, change_price_list];
        this.category_list = res[0].data;

        this.spec_list = res[1].data.filter((item) => {
          const category_exist = this.category_list.filter((category) => {
            return category.SpecCategoryID == item.SpecCategoryID;
          });
          return category_exist.length > 0;
        });
        console.log(res);
        this.stock_data = res[2].data;
        this.black_list = this.GetFullSpecList(res[3].data);
        this.change_price_list = this.GetFullSpecList(res[4].data);
      });
    },
    OpenCreateAllStockDialog() {
      this.$refs.CreateAllStockDialog.Open();
    },
    //
    OpenBlackListDialog(val) {
      let black_list_item = val;
      let type = 'edit';
      if (val == null) {
        type = 'create';
        black_list_item = {
          GoodsID: this.id,
          CustomSpecID: '',
          SpecList: [],
        };
      }
      this.$refs.BlackListDialog.Open(black_list_item, type);
    },
    OpenDeleteDialog(val) {
      this.$refs.MainDeleteDialog.Open(val);
    },
    OpenChangePriceDialog(val) {
      let change_price_item = val;
      let type = 'edit';
      if (val == null) {
        type = 'create';
        change_price_item = {
          GoodsID: this.id,
          CustomSpecID: '',
          SpecList: [],
        };
      }
      this.$refs.ChangePriceDialog.Open(change_price_item, type);
    },
    CheckDeleteData(val) {
      console.log(val);
      if (val.BlacklistID) {
        this.DeleteBlackList(val.BlacklistID);
      } else {
        this.DeleteChangePrice(val.ChangePriceID);
      }
    },

    // api
    CreateStockData() {
      create_stock(this.stock_data).then(() => {
        this.GetStockOptionData();
      });
    },
    CreateBlackList(data) {
      create_black_list(data).then((res) => {
        console.log(res);
        this.GetStockOptionData();
      });
    },
    UpdateBlackList(data) {
      update_black_list(data).then((res) => {
        console.log(res);
        this.GetStockOptionData();
      });
    },
    DeleteBlackList(id) {
      delete_black_list(id).then((res) => {
        console.log(res);
        this.GetStockOptionData();
        this.$refs.MainDeleteDialog.Cancel();
      });
    },
    CreateChangePrice(data) {
      create_change_price(data).then((res) => {
        console.log(res);
        this.GetStockOptionData();
      });
    },
    UpdateChangePrice(data) {
      update_change_price(data).then((res) => {
        console.log(res);
        this.GetStockOptionData();
      });
    },
    DeleteChangePrice(id) {
      delete_change_price(id).then((res) => {
        console.log(res);
        this.GetStockOptionData();
        this.$refs.MainDeleteDialog.Cancel();
      });
    },

    // 資料轉換
    GetFullSpecList(data) {
      let tmp_data = JSON.parse(JSON.stringify(data));
      tmp_data.forEach((tmp_spec) => {
        console.log(tmp_spec.CustomSpecID);
        let list = [];
        tmp_spec.CustomSpecID.split(',').forEach((spec_id) => {
          const spec_item = this.spec_list.filter(
            (spec) => spec.CustomSpecID == spec_id
          )[0];
          list.push({
            SpecCategoryID: spec_item.SpecCategoryID,
            CustomSpecID: spec_item.CustomSpecID,
          });
        });
        tmp_spec.SpecList = list;
      });

      return tmp_data;
    },
    GetSpecTitle(id) {
      return this.spec_list.filter((item) => item.CustomSpecID == id)[0].Title;
    },
    GetCategoryTitle(id) {
      return this.category_list.filter((item) => item.SpecCategoryID == id)[0]
        .Title;
    },
  },
};
</script>
