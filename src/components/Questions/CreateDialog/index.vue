<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        新增問答
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="分類標題"
                v-model="title"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.title"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select
                :items="category_list"
                label="問答分類"
                hide-details="auto"
                item-text="Title"
                item-value="QuestionCategoryID"
                dense
                outlined
                v-model="category"
                :error-messages="errors.category"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-textarea
                outlined
                name="問答內容"
                rows="3"
                label="問答內容"
                v-model="content"
                :error-messages="errors.content"
              ></v-textarea>
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
      content: "",
      category: "",
      dialog: false,
      errors: {
        title: "",
        content: "",
        category: "",
      },
    };
  },
  methods: {
    Open() {
      this.title = "";
      this.content = "";
      this.category = -1;
      this.dialog = true;
      this.errors = {
        title: "",
        content: "",
        category: "",
      };
    },
    Cancel() {
      this.title = "";
      this.content = "";
      this.category = -1;
      this.dialog = false;
      this.errors = {
        title: "",
        content: "",
        category: "",
      };
    },
    CreateQuestion() {
      let error = false;
      this.errors = {
        title: "",
        content: "",
        category: "",
      };
      if (!validEmpty(this.title)) {
        this.errors.title = "請輸入問題標題";
        error = true;
      }
      if (!validEmpty(this.content)) {
        this.errors.content = "請輸入問題內容";
        error = true;
      }
      if (!validEmpty(this.category)) {
        this.errors.category = "請選擇問題分類";
        error = true;
      }
      if (!error) {
        this.$emit("create-question", {
          Title: this.title,
          Content: this.content,
          CategoryID: this.category,
          Seq: 0,
        });
      }
    },
  },
};
</script>