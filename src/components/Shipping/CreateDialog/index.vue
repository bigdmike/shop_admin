<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        新增付款方式
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="物流名稱"
                v-model="title"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select
                label="物流類型"
                v-model="shipping_type"
                :items="shipping_type_data"
                hide-details="auto"
                item-text="title"
                item-value="value"
                outlined
                dense
              ></v-select>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="積材尺寸限制"
                v-model="deliver_volume_max"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="重量限制"
                v-model="deliver_weight_max"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                label="低溫物流"
                v-model="delivery_frozen"
                :items="status_list"
                hide-details="auto"
                item-text="label"
                item-value="value"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                label="外島物流"
                v-model="status_outlying"
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
                v-model="shipping_fee"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col v-if="status_outlying == 'Y'" cols="12">
              <v-text-field
                label="運費(外島)"
                v-model="shipping_fee_outlying"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="啟用狀態"
                v-model="status"
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
        <v-btn color="primary" @click="UpdatePayment"> 更新 </v-btn>
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
      dialog: false,
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
  watch: {
    charge_fee_type(new_val) {
      if (new_val == 'amount') {
        this.charge_fee_percent = 0;
      } else {
        this.charge_fee = 0;
      }
    },
  },
  methods: {
    Open() {
      // this.id = item.ShippingID;
      // this.title = item.Title;
      // this.shipping_type = item.ShippingType;
      // this.deliver_volume_max = item.DeliverVolumeMax;
      // this.deliver_weight_max = item.DeliverWeightMax;
      // this.delivery_frozen = item.DeliveryFrozen;
      // this.shipping_fee = item.ShippingFee;
      // this.shipping_fee_outlying = item.ShippingFeeOutlying;
      // this.status_outlying = item.StatusOutlying;
      // this.status = item.Status;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.title = '';
      this.deliver_volume_max = 0;
      this.deliver_weight_max = 0;
      this.delivery_frozen = 'N';
      this.shipping_fee = 0;
      this.shipping_fee_outlying = 0;
      this.status_outlying = 'N';
      this.status = 'N';
      this.dialog = false;
    },
    UpdatePayment() {
      this.$emit('create-shipping', {
        Title: this.title,
        Status: this.status,
        ShippingType: this.shipping_type,
        StatusOutlying: this.status_outlying,
        ShippingFee: this.shipping_fee,
        ShippingFeeOutlying:
          this.status_outlying == 'Y' ? this.shipping_fee_outlying : 0,
        DeliverVolumeMax: this.deliver_volume_max,
        DeliverWeightMax: this.deliver_weight_max,
        DeliveryFrozen: this.delivery_frozen,
      });
    },
  },
};
</script>
