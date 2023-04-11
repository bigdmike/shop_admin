<template>
  <v-dialog v-model="dialog" width="500">
    <v-card v-if="stock_data != null">
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        編輯大量商品庫存
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                :items="option_1"
                label="請選擇規格一"
                hide-details="auto"
                item-text="ColorTitle"
                item-value="ColorID"
                dense
                outlined
                multiple
                v-model="option_1_list"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                :items="option_2"
                label="請選擇規格二"
                hide-details="auto"
                item-text="SizeTitle"
                item-value="SizeID"
                dense
                multiple
                outlined
                v-model="option_2_list"
              ></v-select>
            </v-col>
            <v-col cols="12">
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
            <v-col cols="12">
              <v-select
                :items="status_array"
                label="啟用狀態"
                hide-details="auto"
                item-text="title"
                item-value="value"
                dense
                outlined
                v-model="stock_data.Status"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="Validate"> 儲存 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'OptionCreateDialog',
  props: {
    option_1: {
      require: true,
      type: Array,
    },
    option_2: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      option_1_list: [],
      option_2_list: [],
      stock_data: null,
      dialog: false,
      status_array: [
        {
          title: '啟用',
          value: 'Y',
        },
        {
          title: '停用',
          value: 'N',
        },
      ],
      edit_type: 'edit',
    };
  },
  methods: {
    Open(item = null) {
      if (item == null) {
        this.stock_data = Object.assign(
          {},
          {
            SizeID: 0,
            ColorID: 0,
            Stock: 0,
            DeliverVolume: 0,
            DeliverWeight: 0,
            Price: 0,
            SellPrice: 0,
            MemberSellPrice: 0,
            Status: 'Y',
            Seq: 1,
          }
        );
      } else {
        this.stock_data = Object.assign({}, item);
        this.option_1_list.push(item.ColorID);
        this.option_2_list.push(item.SizeID);
      }
      this.dialog = true;
    },
    Cancel() {
      this.option_1_list = [];
      this.option_2_list = [];
      this.stock_data = null;
      this.dialog = false;
    },
    Validate() {
      let error_msg = '';

      if (this.option_1_list.length <= 0) {
        error_msg += '- 請選擇規格一';
      }
      if (this.option_2_list.length <= 0) {
        error_msg += '- 請選擇規格二';
      }
      if (this.stock_data.Stock == '') {
        error_msg += '- 請輸入庫存量';
      }
      if (this.stock_data.DeliverVolume == '') {
        error_msg += '- 請輸入積材尺寸';
      }
      if (this.stock_data.DeliverWeight == '') {
        error_msg += '- 請輸入重量';
      }
      if (this.stock_data.Price == '') {
        error_msg += '- 請輸入建議售價';
      }
      if (this.stock_data.SellPrice == '') {
        error_msg += '- 請輸入實際售價';
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
    SendData() {
      // this.$emit('update-stock', this.stock_data);
      const combine_array = this.GenerateCombinations(
        this.option_1_list,
        this.option_2_list
      );
      this.$emit('update-stock', {
        data: this.stock_data,
        options: combine_array,
      });
      console.log(combine_array);
    },
    GenerateCombinations(arr1, arr2) {
      const combinations = [];
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          combinations.push([arr1[i], arr2[j]]);
        }
      }
      return combinations;
    },
  },
  computed: {
    type_title() {
      return this.edit_type == 'edit' ? '編輯' : '新增';
    },
    type_action() {
      return this.edit_type == 'edit' ? '更新' : '新增';
    },
  },
};
</script>
