<template>
  <v-dialog v-model="dialog" width="500">
    <v-card v-if="delivery_data != null">
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        {{ type_title }}付款方式
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="物流名稱"
                v-model="delivery_data.Title"
                hide-details
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select
                label="物流類型"
                v-model="delivery_data.ShippingType"
                :items="shipping_type_data"
                hide-details
                item-text="title"
                item-value="value"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="查詢連結"
                v-model="delivery_data.QueryLink"
                hide-details
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="積材尺寸限制"
                v-model="delivery_data.DeliverVolumeMax"
                hide-details
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="重量限制"
                v-model="delivery_data.DeliverWeightMax"
                hide-details
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                label="低溫物流"
                v-model="delivery_data.DeliveryFrozen"
                :items="status_list"
                hide-details
                item-text="label"
                item-value="value"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                label="外島物流"
                v-model="delivery_data.StatusOutlying"
                :items="status_list"
                hide-details="auto"
                item-text="label"
                item-value="value"
                outlined
                dense
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="運費"
                v-model="delivery_data.ShippingFee"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col v-if="delivery_data.StatusOutlying == 'Y'" cols="12">
              <v-text-field
                label="運費(外島)"
                v-model="delivery_data.ShippingFeeOutlying"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="啟用狀態"
                v-model="delivery_data.Status"
                :items="status_list"
                hide-details="auto"
                item-text="label"
                item-value="value"
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="Validate"> {{ type_action }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ShippingEditDialog',
  props: {
    shipping_type_data: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      id: -1,
      title: '',
      shipping_type: '',
      status: 'N',
      status_outlying: 'Y',
      shipping_fee: 0,
      shipping_fee_outlying: 0,
      deliver_volume_max: 0,
      deliver_weight_max: 0,
      delivery_frozen: 'N',
      query_link: '',
      delivery_data: null,
      dialog: false,
      type: 'edit',
      status_list: [
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
  methods: {
    Open(item, type) {
      this.type = type;
      if (type == 'edit') {
        this.delivery_data = Object.assign({}, item);
        this.delivery_data.ID = this.delivery_data.ShippingID;
      } else {
        this.Reset();
      }
      this.dialog = true;
    },
    Reset() {
      this.delivery_data = Object.assign(
        {},
        {
          ID: 0,
          ShippingID: 0,
          Title: '',
          ShippingType: '',
          DeliverVolumeMax: 0,
          DeliverWeightMax: 0,
          DeliveryFrozen: 'N',
          StatusOutlying: 'N',
          ShippingFee: 0,
          ShippingFeeOutlying: 0,
          Status: 'Y',
          QueryLink: '',
        }
      );
    },
    Cancel() {
      this.Reset();
      this.dialog = false;
    },
    Validate() {
      let error_msg = '';
      if (this.delivery_data.Title == '') {
        error_msg += '- 請輸入物流名稱<br/>';
      }
      if (this.delivery_data.Status == '') {
        error_msg += '- 請選擇啟用狀態<br/>';
      }
      if (this.delivery_data.ShippingType == '') {
        error_msg += '- 請選擇物流類型<br/>';
      }
      if (this.delivery_data.StatusOutlying == '') {
        error_msg += '- 請選擇外島配送啟用狀態<br/>';
      }
      if (this.delivery_data.DeliveryFrozen == '') {
        error_msg += '- 請選擇是否啟用低溫配送<br/>';
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
      if (this.type == 'edit') {
        this.$emit('update-action', this.delivery_data);
      } else {
        this.$emit('create-action', this.delivery_data);
      }
    },
  },
  computed: {
    type_title() {
      return this.type == 'edit' ? '編輯' : '新增';
    },
    type_action() {
      return this.type == 'edit' ? '更新' : '新增';
    },
  },
};
</script>
