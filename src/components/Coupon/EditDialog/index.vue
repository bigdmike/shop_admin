<template>
  <v-dialog v-model="dialog" width="500">
    <v-card v-if="coupon_data != null">
      <v-card-title
        class="d-flex justify-space-between"
        style="border-bottom: 1px solid rgb(218, 218, 218)"
      >
        {{ type_title }}優惠代碼
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                label="優惠名稱"
                v-model="coupon_data.Title"
                hide-details
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="優惠代碼"
                v-model="coupon_data.CouponNumber"
                hide-details
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="優惠券數量"
                v-model="coupon_data.CouponCount"
                hide-details
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="折扣金額"
                v-model="coupon_data.Money"
                hide-details
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="優惠門檻"
                v-model="coupon_data.Threshold"
                hide-details
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
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
                    v-model="coupon_data.StartDate"
                    label="優惠開始日期"
                    prepend-icon=""
                    hide-details="auto"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="coupon_data.StartDate"
                  @input="start_date_menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                ref="start_time_menu"
                v-model="start_time_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="coupon_data.StartTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="coupon_data.StartTime"
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
                  v-model="coupon_data.StartTime"
                  use-seconds
                  full-width
                  @click:second="
                    $refs.start_time_menu.save(coupon_data.StartTime)
                  "
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
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
                    v-model="coupon_data.EndDate"
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
                <v-date-picker
                  v-model="coupon_data.EndDate"
                  @input="end_date_menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="6">
              <v-menu
                ref="end_time_menu"
                v-model="end_time_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="coupon_data.EndTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="coupon_data.EndTime"
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
                  v-model="coupon_data.EndTime"
                  use-seconds
                  full-width
                  @click:second="$refs.end_time_menu.save(coupon_data.EndTime)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="coupon_data.Status"
                :items="status_list"
                item-text="title"
                item-value="value"
                label="啟用狀態"
                hide-details="auto"
                outlined
                dense
              ></v-select>
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

            <v-col cols="12" v-if="coupon_account_only">
              <v-autocomplete
                label="指定帳號"
                :items="member_list"
                item-text="Account"
                item-value="MemberID"
                v-model="coupon_data.MemberID"
                multiple
              ></v-autocomplete>
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
  name: 'CouponEditDialog',
  props: {
    category_list: {
      require: true,
      type: Array,
    },
    member_list: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      // 日期時間 dialog
      start_date_menu: false,
      start_time_menu: false,
      end_date_menu: false,
      end_time_menu: false,
      // checkbox
      coupon_member_only: false,
      coupon_account_only: false,
      coupon_status: false,
      // edit data
      coupon_data: null,
      dialog: false,
      type: 'edit',
      status_list: [
        {
          title: '已啟用',
          value: 'Y',
        },
        {
          title: '已停用',
          value: 'N',
        },
      ],
    };
  },
  methods: {
    // 打開編輯視窗
    Open(item, type) {
      this.type = type;
      // 編輯模式則將傳入的資料設定至data
      if (type == 'edit') {
        let member_list = [];
        item.MemberList.forEach((member) => {
          member_list.push(member.MemberID);
        });
        this.coupon_data = Object.assign({ MemberID: member_list }, item);
        // 更新資料需要將ID帶入CouponID，否則後端會將資料全數更改
        this.coupon_data.ID = this.coupon_data.CouponID;
        // 將時間與日期拆開編輯
        this.coupon_data.StartDate = item.StartTime.slice(0, 10);
        this.coupon_data.StartTime = item.StartTime.slice(11, 20);
        this.coupon_data.EndDate = item.EndTime.slice(0, 10);
        this.coupon_data.EndTime = item.EndTime.slice(11, 20);
        // 字串轉布林
        this.coupon_member_only =
          this.coupon_data.LimitMember == 'Y' ? true : false;
        this.coupon_account_only =
          this.coupon_data.OnlyMember == 'Y' ? true : false;
        // this.coupon_status = this.coupon_data.Status == 'Y' ? true : false;
      }
      // 新增模式則將data資料設為預設值
      else {
        this.Reset();
      }
      // 預設關閉日期時間編輯選單
      this.start_date_menu = false;
      this.start_time_menu = false;
      this.end_date_menu = false;
      this.end_time_menu = false;
      this.dialog = true;
    },
    // 設定資料為預設值
    Reset() {
      this.coupon_data = Object.assign(
        {},
        {
          ID: 0,
          CouponID: 0,
          MemberID: [],
          Title: '',
          Status: 'Y',
          CouponNumber: '',
          CouponCount: 0,
          Threshold: 0,
          StartDate: new Date().Format('yyyy-MM-dd'),
          EndDate: new Date().Format('yyyy-MM-dd'),
          StartTime: '00:00:00',
          EndTime: '00:00:00',
          LimitMember: 'N',
          OnlyMember: 'N',
        }
      );
    },
    // 取消編輯，復原資料狀態並關閉視窗
    Cancel() {
      this.Reset();
      this.dialog = false;
    },
    // 驗證資料填寫狀況
    Validate() {
      let error_msg = '';
      if (this.coupon_data.Title == '') {
        error_msg += '- 請輸入優惠名稱<br/>';
      }
      if (this.coupon_data.CouponNumber == '') {
        error_msg += '- 請輸入優惠代碼<br/>';
      }
      if (this.coupon_data.CouponCount == '') {
        error_msg += '- 請輸入優惠券數量<br/>';
      }
      if (this.coupon_data.Money == '') {
        error_msg += '- 請輸入折扣金額<br/>';
      }
      if (this.coupon_data.Threshold == '') {
        error_msg += '- 請輸入使用門檻金額<br/>';
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
    // 送出資料
    SendData() {
      let tmp_data = Object.assign({}, this.coupon_data);
      // 將日期時間重新合併
      tmp_data.StartTime = tmp_data.StartDate + ' ' + tmp_data.StartTime;
      tmp_data.EndTime = tmp_data.EndDate + ' ' + tmp_data.EndTime;
      // 將金額轉為數字
      tmp_data.Money = parseInt(tmp_data.Money);
      tmp_data.Threshold = parseInt(tmp_data.Threshold);
      // 刪除後端API無使用的欄位
      delete tmp_data.StartDate;
      delete tmp_data.EndDate;

      if (tmp_data.OnlyMember == 'N') {
        tmp_data.MemberID = [];
      }

      if (this.type == 'edit') {
        this.$emit('update-action', tmp_data);
      } else {
        this.$emit('create-action', tmp_data);
      }
    },
  },
  watch: {
    coupon_member_only() {
      this.coupon_data.LimitMember = this.coupon_member_only ? 'Y' : 'N';
    },
    coupon_account_only() {
      this.coupon_data.OnlyMember = this.coupon_account_only ? 'Y' : 'N';
    },
    // coupon_status() {
    //   this.coupon_data.Status = this.coupon_status ? 'Y' : 'N';
    // },
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
