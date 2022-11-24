<template>
  <v-dialog v-model="dialog" width="800">
    <v-card v-if="discount_data != null">
      <v-card-title
        class="d-flex justify-space-between"
        style="border-bottom: 1px solid rgb(218, 218, 218)"
      >
        {{ type == 'edit' ? '編輯' : '新增' }}優惠代碼
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="優惠名稱"
                v-model="discount_data.Title"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.title"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="discount_data.DiscountType"
                :items="type_list"
                item-text="title"
                item-value="value"
                label="優惠類型"
                hide-details="auto"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="優惠門檻"
                v-model="discount_data.Threshold"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.discount_threshold"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="12"
              v-if="discount_data.DiscountType == 'P'"
            >
              <v-text-field
                label="打折%數(80 = 8折)"
                v-model="discount_data.DiscountPercent"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.discount_percent"
              ></v-text-field>
            </v-col>

            <v-col cols="6" v-if="discount_data.DiscountType == 'G'">
              <v-text-field
                label="贈品名稱"
                v-model="discount_data.GiveName"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.give_name"
              ></v-text-field>
            </v-col>
            <v-col cols="6" v-if="discount_data.DiscountType == 'G'">
              <v-file-input
                v-model="discount_data.Image1"
                prepend-icon=""
                label="贈品圖片"
                :persistent-placeholder="true"
                hide-details="auto"
                dense
                outlined
                :error-messages="errors.give_image"
                show-size
              ></v-file-input>

              <a :href="discount_data.PreviewImage" target="_blank"
                >查看目前贈品圖片</a
              >
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
                    v-model="discount_data.StartDate"
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
                  v-model="discount_data.StartDate"
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
                :return-value.sync="discount_data.StartTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="discount_data.StartTime"
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
                  v-model="discount_data.StartTime"
                  use-seconds
                  full-width
                  @click:second="
                    $refs.start_time_menu.save(discount_data.StartTime)
                  "
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
                    v-model="discount_data.EndDate"
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
                  v-model="discount_data.EndDate"
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
                :return-value.sync="discount_data.EndTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="discount_data.EndTime"
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
                  v-model="discount_data.EndTime"
                  use-seconds
                  full-width
                  @click:second="
                    $refs.end_time_menu.save(discount_data.EndTime)
                  "
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="discount_data.MenuID"
                :items="category_list"
                item-text="Title"
                item-value="MenuID"
                label="套用商品分類"
                hide-details="auto"
                outlined
                dense
              ></v-select>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="discount_data.Status"
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
                v-model="discount_member_only"
                label="會員限定"
              ></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-checkbox
                v-model="combine_product"
                label="套用於組合商品"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="elevation-0" @click="Cancel"> 取消 </v-btn>
        <v-btn
          color="light-blue lighten-1 white--text font-weight-bold elevation-0"
          @click="Validate"
        >
          {{ type == 'edit' ? '更新' : '新增' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DiscountEditDialog',
  props: {
    category_list: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      // picker dialog
      start_date_menu: false,
      start_time_menu: false,
      end_date_menu: false,
      end_time_menu: false,
      // checkbox
      discount_member_only: false,
      combine_product: false,
      // data
      dialog: false,
      discount_data: null,
      type: 'edit',
      type_list: [
        {
          title: '打折',
          value: 'P',
        },
        {
          title: '贈品',
          value: 'G',
        },
        {
          title: '免運',
          value: 'D',
        },
      ],
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
      errors: {
        title: '',
        active_menu: '',
        discount_percent: '',
        give_name: '',
        give_image: '',
        discount_threshold: '',
      },
    };
  },
  methods: {
    // 圖片上傳問題 路徑顯示
    Open(item, type) {
      this.start_date_menu = false;
      this.start_time_menu = false;
      this.end_date_menu = false;
      this.end_time_menu = false;
      this.type = type;
      if (type == 'edit') {
        this.discount_data = Object.assign({}, item);
        this.discount_data = this.$SetImageObj(
          this.discount_data,
          this.discount_data.Image1
        );
        this.discount_data.ID = this.discount_data.DiscountID;
        this.discount_data.StartDate = item.StartTime.slice(0, 10);
        this.discount_data.StartTime = item.StartTime.slice(11, 20);
        this.discount_data.EndDate = item.EndTime.slice(0, 10);
        this.discount_data.EndTime = item.EndTime.slice(11, 20);
        // 會員限定checkbox
        this.discount_member_only =
          this.discount_data.LimitMember == 'Y' ? true : false;
        // 組合商品checkbox
        this.combine_product = this.discount_data.Combine == 'Y' ? true : false;
      } else {
        this.Reset();
      }
      this.dialog = true;
    },
    Reset() {
      this.discount_data = Object.assign(
        {},
        {
          Title: '',
          Status: 'Y',
          MenuID: '',
          DiscountType: 'P',
          DiscountPercent: 0,
          GiveName: '',
          Image1: null,
          PreviewImage: '',
          Threshold: '',
          StartDate: new Date().Format('yyyy-MM-dd'),
          StartTime: '00:00:00',
          EndDate: new Date().Format('yyyy-MM-dd'),
          EndTime: '00:00:00',
          LimitMember: 'N',
          Combine: 'N',
        }
      );
      this.discount_member_only = false;
      this.combine_product = false;
    },
    Cancel() {
      this.Reset();
      this.dialog = false;
    },
    Validate() {
      console.log('Here');
      let error_msg = '';
      if (this.discount_data.Title == '') {
        error_msg += '- 請輸入優惠名稱<br/>';
      }
      if (this.discount_data.Threshold == '') {
        error_msg += '- 請輸入使用門檻金額<br/>';
      }
      if (
        this.discount_data.DiscountType == 'P' &&
        this.discount_data.DiscountPercent == ''
      ) {
        error_msg += '- 請輸入打折%數<br/>';
      }
      if (
        this.discount_data.DiscountType == 'G' &&
        this.discount_data.GiveName == ''
      ) {
        error_msg += '- 請輸入贈品名稱<br/>';
      }
      if (
        this.discount_data.DiscountType == 'G' &&
        this.discount_data.Image1 == null
      ) {
        error_msg += '- 請上傳贈品圖片<br/>';
      }

      //
      console.log(error_msg);
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
      let tmp_data = Object.assign({}, this.discount_data);
      tmp_data.StartTime = tmp_data.StartDate + ' ' + tmp_data.StartTime;
      tmp_data.EndTime = tmp_data.EndDate + ' ' + tmp_data.EndTime;
      tmp_data.DiscountPercent = parseInt(tmp_data.DiscountPercent);
      tmp_data.Threshold = parseInt(tmp_data.Threshold);
      tmp_data.MenuID = parseInt(tmp_data.MenuID);
      delete tmp_data.StartDate;
      delete tmp_data.EndDate;
      delete tmp_data.PreviewImage;
      this.type == 'edit'
        ? this.$emit('update-action', tmp_data)
        : this.$emit('create-action', tmp_data);
    },
  },
  watch: {
    discount_member_only() {
      this.discount_data.LimitMember = this.discount_member_only ? 'Y' : 'N';
    },
    combine_product() {
      this.discount_data.Combine = this.combine_product ? 'Y' : 'N';
    },
  },
};
</script>
