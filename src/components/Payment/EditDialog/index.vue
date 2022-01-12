<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        更新付款方式
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="支付方式"
                v-model="title"
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
                v-model="charge_fee_percent"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col v-else cols="12" sm="12" md="12">
              <v-text-field
                label="手續費(元)"
                v-model="charge_fee"
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
  name: "PaymentEditDialog",
  data() {
    return {
      id: -1,
      title: "",
      status: "N",
      dialog: false,
      charge_fee: 0,
      charge_fee_percent: 0,
      charge_fee_type: "",
      charge_fee_type_list: [
        {
          label: "百分比",
          value: "percent",
        },
        {
          label: "固定金額",
          value: "amount",
        },
      ],
      status_list: [
        {
          label: "已啟用",
          value: "Y",
        },
        {
          label: "已停用",
          value: "N",
        },
      ],
    };
  },
  watch: {
    charge_fee_type(new_val) {
      if (new_val == "amount") {
        this.charge_fee_percent = 0;
      } else {
        this.charge_fee = 0;
      }
    },
  },
  methods: {
    Open(item) {
      this.id = item.PaymentID;
      this.title = item.Title;
      this.status = item.Status;
      this.charge_fee = item.ChargeFee;
      this.charge_fee_percent = item.ChargePercent;
      if (this.charge_fee != 0) {
        this.charge_fee_type = "amount";
      } else {
        this.charge_fee_type = "percent";
      }
      this.dialog = true;
    },
    Cancel() {
      this.id = 0;
      this.title = "";
      this.charge_fee = 0;
      this.charge_fee_percent = 0;
      this.charge_fee_type = "";
      this.dialog = false;
    },
    UpdatePayment() {
      this.$emit("update-payment", {
        ID: this.id,
        Status: this.status,
        ChargeFee:
          this.charge_fee == "" || this.charge_fee < 0 ? 0 : this.charge_fee,
        ChargePercent:
          this.charge_fee_percent == "" || this.charge_fee_percent < 0
            ? 0
            : this.charge_fee_percent,
        DeliveryFrozen: "Y",
      });
    },
  },
};
</script>