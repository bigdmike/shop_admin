<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title
        class="d-flex justify-space-between"
        style="border-bottom: 1px solid rgb(218, 218, 218)"
      >
        修改優惠代碼
        <v-switch v-model="status" label="啟用狀態"></v-switch>
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="優惠名稱"
                v-model="title"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.title"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="優惠代碼"
                v-model="coupon_number"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.coupon_number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="優惠券數量"
                v-model="coupon_count"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.coupon_count"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="折扣金額"
                v-model="coupon_price"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.coupon_price"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="優惠門檻"
                v-model="coupon_threshold"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.coupon_threshold"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="start_date_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="coupon_start_date"
                    label="優惠開始日期"
                    prepend-icon="mdi-calendar"
                    hide-details="auto"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="coupon_start_date"
                  @input="start_date_menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                ref="start_time_menu"
                v-model="start_time_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="coupon_start_time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="coupon_start_time"
                    label="優惠開始時間"
                    prepend-icon=""
                    hide-details="auto"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="start_time_menu"
                  v-model="coupon_start_time"
                  use-seconds
                  full-width
                  @click:second="$refs.start_time_menu.save(coupon_start_time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="end_date_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="coupon_end_date"
                    label="優惠結束時間"
                    prepend-icon="mdi-calendar"
                    hide-details="auto"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="coupon_end_date"
                  @input="end_date_menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6">
              <v-menu
                ref="end_time_menu"
                v-model="end_time_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="coupon_end_time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="coupon_end_time"
                    label="優惠結束時間"
                    prepend-icon=""
                    hide-details="auto"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="end_time_menu"
                  v-model="coupon_end_time"
                  use-seconds
                  full-width
                  @click:second="$refs.end_time_menu.save(coupon_end_time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-checkbox
                v-model="coupon_member_only"
                label="會員限定"
              ></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-checkbox
                v-model="coupon_account_only"
                label="指定帳號使用"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="CreateNews"> 更新 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validFileEmpty } from "@/common/validate.js";
export default {
  name: "NewsCreateDialog",
  props: {
    category_list: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      id: -1,
      title: "",
      status: false,
      start_date_menu: false,
      start_time_menu: false,
      end_date_menu: false,
      end_time_menu: false,
      coupon_number: "",
      coupon_count: "",
      coupon_price: "",
      coupon_threshold: "",
      coupon_start_date: new Date().Format("yyyy-MM-dd"),
      coupon_start_time: "00:00:00",
      coupon_end_date: new Date().Format("yyyy-MM-dd"),
      coupon_end_time: "00:00:00",
      coupon_member_only: false,
      coupon_account_only: false,
      dialog: false,
      errors: {
        title: "",
        coupon_number: "",
        coupon_count: "",
        coupon_price: "",
        coupon_threshold: "",
      },
    };
  },
  methods: {
    Open(item) {
      this.Init();
      this.dialog = true;
      this.id = item.CouponID;
      this.title = item.Title;
      this.status = item.Status == "N" ? false : true;
      this.coupon_number = item.CouponNumber;
      this.coupon_count = item.CouponCount;
      this.coupon_price = item.Money;
      this.coupon_threshold = item.Threshold;
      this.coupon_start_date = item.StartTime.slice(0, 10);
      this.coupon_end_date = item.EndTime.slice(0, 10);
      this.coupon_start_time = item.StartTime.slice(11, 20);
      this.coupon_end_time = item.EndTime.slice(11, 20);
      this.coupon_account_only = item.LimitMember == "N" ? false : true;
      this.coupon_member_only = item.OnlyMember == "N" ? false : true;
    },
    Init() {
      this.id = -1;
      this.title = "";
      this.status = false;
      this.coupon_number = "";
      this.coupon_count = "";
      this.coupon_price = "";
      this.coupon_threshold = "";
      this.coupon_start_date = new Date().Format("yyyy-MM-dd");
      this.coupon_end_date = new Date().Format("yyyy-MM-dd");
      this.coupon_start_time = "00:00:00";
      this.coupon_end_time = "00:00:00";
      this.coupon_member_only = false;
      this.coupon_account_only = false;
      this.start_date_menu = false;
      this.start_time_menu = false;
      this.end_date_menu = false;
      this.end_time_menu = false;
      this.ErrorInit();
    },
    ErrorInit() {
      this.errors = {
        title: "",
        coupon_number: "",
        coupon_count: "",
        coupon_price: "",
        coupon_threshold: "",
      };
    },
    Cancel() {
      this.Init();
      this.dialog = false;
    },
    CreateNews() {
      let error = false;
      this.ErrorInit();
      if (!validFileEmpty(this.title)) {
        this.errors.title = "請輸入優惠名稱";
        error = true;
      }
      if (!validFileEmpty(this.coupon_number)) {
        this.errors.content = "請輸入優惠代碼";
        error = true;
      }
      if (!validFileEmpty(this.coupon_count)) {
        this.errors.content = "請輸入優惠券數量";
        error = true;
      }
      if (!validFileEmpty(this.coupon_price)) {
        this.errors.content = "請輸入折扣金額";
        error = true;
      }
      if (!validFileEmpty(this.coupon_threshold)) {
        this.errors.content = "請輸入使用門檻金額";
        error = true;
      }
      if (!error) {
        this.$emit("update-coupon", {
          ID: this.id,
          CouponNumber: this.coupon_number,
          Status: this.status ? "Y" : "N",
          Title: this.title,
          Money: this.coupon_price,
          LimitMember: this.coupon_account_only ? "Y" : "N",
          OnlyMember: this.coupon_member_only ? "Y" : "N",
          Threshold: this.coupon_threshold,
          StartTime: this.coupon_start_date + " " + this.coupon_start_time,
          EndTime: this.coupon_end_date + " " + this.coupon_end_time,
          CouponCount: this.coupon_count,
        });
      }
    },
  },
};
</script>