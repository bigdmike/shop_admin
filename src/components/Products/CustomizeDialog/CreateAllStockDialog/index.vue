<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="primary--text">
        選擇規格
      </v-card-title>

      <v-card-text class="pt-5">
        <v-row>
          <template v-for="(item, item_index) in spec_list">
            <v-col class="d-flex" cols="6" :key="`category_${item_index}`">
              <v-select
                v-model="item.SpecCategoryID"
                hide-details="auto"
                dense
                :items="category_data"
                item-text="Title"
                item-value="SpecCategoryID"
                label="選項分類"
                outlined
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="6" :key="`spec_${item_index}`">
              <v-select
                v-model="item.CustomSpecID"
                hide-details="auto"
                dense
                :items="GetCategory(item.SpecCategoryID)"
                item-text="Title"
                item-value="CustomSpecID"
                label="選項"
                multiple
                outlined
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              class="d-flex justify-end py-0 my-0"
              :key="`action_${item_index}`"
            >
              <a @click="RemoveSpec(item_index)" class="primary--text">移除</a>
            </v-col>
          </template>
          <v-col cols="12">
            <v-btn @click="AddSpec" block outlined primary>新增規格</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="庫存量"
              v-model="stock_data.Stock"
              hide-details="auto"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              label="積材尺寸"
              v-model="stock_data.DeliverVolume"
              hide-details="auto"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="商品重量"
              v-model="stock_data.DeliverWeight"
              hide-details="auto"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              label="建議售價"
              v-model="stock_data.Price"
              hide-details="auto"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="實際售價"
              v-model="stock_data.SellPrice"
              hide-details="auto"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="會員售價"
              v-model="stock_data.MemberSellPrice"
              hide-details="auto"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" class="elevation-0" @click="Validate">
          更新
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CreateAllStockDialog',
  props: {
    product_id: {
      type: String,
    },
    spec_data: {
      type: Array,
    },
    category_data: {
      type: Array,
    },
  },
  data() {
    return {
      spec_list: [],
      results: [],
      result: [],
      dialog: false,
      stock_data: {
        Stock: 20,
        Status: 'Y',
        DeliverVolume: 0,
        DeliverWeight: 0,
        Price: 0,
        SellPrice: 0,
        MemberSellPrice: 0,
      },
    };
  },
  methods: {
    Open() {
      this.dialog = true;
    },
    Cancel() {
      this.spec_list = [];
      this.dialog = false;
    },
    Validate() {
      let error_msg = '';
      if (this.spec_list.length <= 0) {
        error_msg += '- 請選擇規格';
      }
      // 檢查不能有重複的SpecCategoryID
      let same_spec_category = false;
      let empty_spec = false;
      this.spec_list.forEach((item) => {
        item.CustomSpecID.length <= 0 ? (empty_spec = true) : '';
        let same_count = 0;
        this.spec_list.forEach((spec) => {
          spec.SpecCategoryID == item.SpecCategoryID ? (same_count += 1) : '';
        });
        same_count >= 2 ? (same_spec_category = true) : '';
      });
      if (same_spec_category) {
        error_msg += '- 不能有重複的規格類型';
      }
      if (empty_spec) {
        error_msg += '- 規格選項不能留空';
      }
      if (error_msg == '') {
        this.SendData();
      } else {
        error_msg = '無法儲存資料，請修正以下問題：<br>' + error_msg;
        this.$store.commit('SetDialog', {
          title: '發生錯誤',
          content: error_msg,
          status: true,
        });
      }
    },
    doExchange(arr, depth) {
      for (var i = 0; i < arr[depth].length; i++) {
        this.result[depth] = arr[depth][i];
        if (depth != arr.length - 1) {
          this.doExchange(arr, depth + 1);
        } else {
          this.results.push(this.result.join(','));
        }
      }
    },
    test(arr) {
      this.doExchange(arr, 0);
      console.log(this.results.length, this.results);
    },
    AddSpec() {
      this.spec_list.push({
        SpecCategoryID: '',
        CustomSpecID: [],
      });
    },
    RemoveSpec(index) {
      this.spec_list.splice(index, 1);
    },
    GetCategory(id) {
      return id == ''
        ? []
        : this.spec_data.filter((item) => item.SpecCategoryID == id);
    },
    SendData() {
      let spec_array = [];
      this.spec_list.forEach((item) => {
        spec_array.push(item.CustomSpecID);
      });
      this.doExchange(spec_array, 0);
      console.log(this.results.length, this.results);
    },
  },
  mounted() {
    // let garr = [
    //   ['a', 'b', 'c'],
    //   ['1', '2', '3'],
    //   ['x', 'y', 'z'],
    // ];
    // this.test(garr);
  },
};
</script>
