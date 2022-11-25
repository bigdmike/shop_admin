<template>
  <v-dialog v-model="dialog" width="500">
    <v-card v-if="payment_data != null">
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        更新付款方式
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="支付方式"
                v-model="payment_data.Title"
                hide-details="auto"
                outlined
                readonly
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="手續費類型"
                v-model="charge_fee_type"
                :items="charge_fee_type_list"
                hide-details="auto"
                item-text="label"
                item-value="value"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col
              v-if="charge_fee_type == 'percent'"
              cols="12"
              sm="12"
              md="12"
            >
              <v-text-field
                label="手續費(%)"
                v-model="payment_data.ChargePercent"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col v-else cols="12" sm="12" md="12">
              <v-text-field
                label="手續費(元)"
                v-model="payment_data.ChargeFee"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="啟用狀態"
                v-model="payment_data.Status"
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
        <v-btn color="primary" @click="Validate"> 更新 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'PaymentEditDialog',
  data() {
    return {
      dialog: false,
      charge_fee_type: 'amount',
      payment_data: null,
      charge_fee_type_list: [
        {
          label: '百分比',
          value: 'percent',
        },
        {
          label: '固定金額',
          value: 'amount',
        },
      ],
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
    charge_fee_type() {
      if (this.charge_fee_type == 'amount') {
        this.payment_data.ChargeFeePercent = 0;
      } else {
        this.payment_data.ChargeFee = 0;
      }
    },
  },
  methods: {
    Open(item) {
      this.payment_data = Object.assign({}, item);
      this.payment_data.ID = this.payment_data.PaymentID;
      if (this.payment_data.ChargeFee != 0) {
        this.charge_fee_type = 'amount';
      } else {
        this.charge_fee_type = 'percent';
      }
      this.dialog = true;
    },
    Cancel() {
      this.payment_data = null;
      this.dialog = false;
    },
    Validate() {
      let error_msg = '';
      if (this.payment_data.Title == '') {
        error_msg += '- 請輸入付款方式名稱<br/>';
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
      this.$emit('update-action', this.payment_data);
    },
  },
};
</script>
