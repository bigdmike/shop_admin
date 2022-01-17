<template>
  <v-dialog v-model="dialog" width="800">
    <v-card>
      <v-card-title
        class="d-flex justify-space-between"
        style="border-bottom: 1px solid rgb(218, 218, 218)"
      >
        修改優惠代碼
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
            <v-col cols="6">
              <v-select
                v-model="discount_type"
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
                v-model="discount_threshold"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.discount_threshold"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="12" v-if="discount_type == 'P'">
              <v-text-field
                label="打折%數(80 = 8折)"
                v-model="discount_percent"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.discount_percent"
              ></v-text-field>
            </v-col>

            <v-col cols="6" v-if="discount_type == 'G'">
              <v-text-field
                label="贈品名稱"
                v-model="give_name"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.give_name"
              ></v-text-field>
            </v-col>
            <v-col cols="6" v-if="discount_type == 'G'">
              <v-file-input
                v-model="give_image_file"
                prepend-icon=""
                label="贈品圖片"
                :placeholder="
                  give_image.split('/')[give_image.split('/').length - 1]
                "
                :persistent-placeholder="true"
                hide-details="auto"
                dense
                outlined
                :error-messages="errors.give_image"
                show-size
              ></v-file-input>
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
                    v-model="discount_start_date"
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
                  v-model="discount_start_date"
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
                :return-value.sync="discount_start_time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="discount_start_time"
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
                  v-model="discount_start_time"
                  use-seconds
                  full-width
                  @click:second="
                    $refs.start_time_menu.save(discount_start_time)
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
                    v-model="discount_end_date"
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
                  v-model="discount_end_date"
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
                :return-value.sync="discount_end_time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="discount_end_time"
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
                  v-model="discount_end_time"
                  use-seconds
                  full-width
                  @click:second="$refs.end_time_menu.save(discount_end_time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="active_menu"
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
                v-model="status"
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
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="CreateNews"> 新增 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validFileEmpty } from "@/common/validate.js";
export default {
  name: "DiscountCreateDialog",
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
      active_menu: -1,
      discount_percent: 0,
      discount_type: "P",
      give_name: "",
      give_image: "",
      give_image_file: null,
      discount_threshold: "",
      discount_start_date: new Date().Format("yyyy-MM-dd"),
      discount_start_time: "00:00:00",
      discount_end_date: new Date().Format("yyyy-MM-dd"),
      discount_end_time: "00:00:00",
      discount_member_only: false,
      combine_product: false,
      dialog: false,
      type_list: [
        {
          title: "打折",
          value: "P",
        },
        {
          title: "贈品",
          value: "G",
        },
        {
          title: "免運",
          value: "D",
        },
      ],
      status_list: [
        {
          title: "已啟用",
          value: "Y",
        },
        {
          title: "已停用",
          value: "N",
        },
      ],
      errors: {
        title: "",
        active_menu: "",
        discount_percent: "",
        give_name: "",
        give_image: "",
        discount_threshold: "",
      },
    };
  },
  methods: {
    Open() {
      this.Init();
      this.dialog = true;
    },
    Init() {
      this.id = -1;
      this.title = "";
      this.status = false;
      this.start_date_menu = false;
      this.start_time_menu = false;
      this.end_date_menu = false;
      this.end_time_menu = false;
      this.active_menu = -1;
      this.discount_percent = 0;
      this.discount_type = "P";
      this.give_name = "";
      this.give_image = "";
      this.give_image_file = null;
      this.discount_threshold = "";
      this.discount_start_date = new Date().Format("yyyy-MM-dd");
      this.discount_start_time = "00:00:00";
      this.discount_end_date = new Date().Format("yyyy-MM-dd");
      this.discount_end_time = "00:00:00";
      this.discount_member_only = false;
      this.combine_product = false;
      this.ErrorInit();
    },
    ErrorInit() {
      this.errors = {
        title: "",
        active_menu: "",
        discount_percent: "",
        give_name: "",
        give_image: "",
        discount_threshold: "",
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

      if (this.active_menu == -1 || this.active_menu == "") {
        this.errors.title = "請選擇套用的商品分類";
        error = true;
      }
      if (!validFileEmpty(this.discount_threshold)) {
        this.errors.discount_threshold = "請輸入使用門檻金額";
        error = true;
      }
      if (this.discount_type == "P") {
        if (!validFileEmpty(this.discount_percent)) {
          this.errors.discount_percent = "請輸入打折%數";
          error = true;
        }
      }

      if (this.discount_type == "G") {
        if (!validFileEmpty(this.give_name)) {
          this.errors.give_name = "請輸入贈品名稱";
          error = true;
        }
        if (
          !validFileEmpty(this.give_image) &&
          !validFileEmpty(this.give_image_file)
        ) {
          this.errors.give_image = "請上傳贈品圖片";
          error = true;
        }
      }
      if (!error) {
        this.$emit("create-discount", {
          DiscountType: this.discount_type,
          Title: this.title,
          DiscountPercent:
            this.discount_type == "P" ? this.discount_percent : 0,
          GiveName: this.discount_type == "G" ? this.give_name : "",
          Image1: this.discount_type == "G" ? this.give_image_file : "",
          Combine: this.combine_product ? "Y" : "N",
          Threshold: this.discount_threshold,
          LimitMember: this.discount_member_only ? "Y" : "N",
          StartTime: this.discount_start_date + " " + this.discount_start_time,
          EndTime: this.discount_end_date + " " + this.discount_end_time,
          Status: this.status ? "Y" : "N",
          MenuID: this.active_menu,
        });
      }
    },
  },
};
</script>