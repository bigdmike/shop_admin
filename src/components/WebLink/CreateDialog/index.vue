<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        新增選單連結
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="連結名稱"
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
                label="連結網址"
                v-model="link"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.link"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select
                :items="category_list"
                label="選單群組"
                hide-details="auto"
                item-text="Title"
                item-value="WebLinkCategoryID"
                dense
                outlined
                v-model="category"
                :error-messages="errors.category"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select
                class="mb-8"
                v-model="status"
                :items="status_data"
                hide-details="auto"
                item-text="label"
                item-value="value"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="CreateQuestion"> 新增 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmpty } from "@/common/validate.js";
export default {
  name: "QuestionCreateDialog",
  props: {
    category_list: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      title: "",
      link: "",
      category: "",
      dialog: false,
      status: "N",
      status_data: [
        {
          label: "顯示",
          value: "Y",
        },
        {
          label: "隱藏",
          value: "N",
        },
      ],
      errors: {
        title: "",
        link: "",
        category: "",
      },
    };
  },
  methods: {
    Open() {
      this.title = "";
      this.link = "";
      this.category = -1;
      this.dialog = true;
      this.status = "N";
      this.errors = {
        title: "",
        link: "",
        category: "",
      };
    },
    Cancel() {
      this.title = "";
      this.link = "";
      this.category = -1;
      this.dialog = false;
      this.status = "N";
      this.errors = {
        title: "",
        link: "",
        category: "",
      };
    },
    CreateQuestion() {
      let error = false;
      this.errors = {
        title: "",
        link: "",
        category: "",
      };
      if (!validEmpty(this.title)) {
        this.errors.title = "請輸入連結名稱";
        error = true;
      }
      if (!validEmpty(this.link)) {
        this.errors.link = "請輸入連結網址";
        error = true;
      }
      if (!validEmpty(this.category)) {
        this.errors.category = "請選擇選單群組";
        error = true;
      }
      if (!error) {
        this.$emit("create-weblink", {
          Title: this.title,
          Link: this.link,
          Status: this.status,
          CategoryID: this.category,
          Seq: 0,
        });
      }
    },
  },
};
</script>