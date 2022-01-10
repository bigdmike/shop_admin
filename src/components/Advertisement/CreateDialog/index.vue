<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        新增廣告
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="廣告名稱"
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
                v-model="content"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.content"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-file-input
                v-model="cover"
                prepend-icon=""
                label="廣告圖片"
                hide-details="auto"
                dense
                outlined
                :error-messages="errors.cover"
                show-size
              ></v-file-input>
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
import { validEmpty, validFileEmpty } from "@/common/validate.js";
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
      title: "",
      content: "",
      category: "",
      cover: null,
      image_preview_url: "",
      dialog: false,
      errors: {
        title: "",
        content: "",
        category: "",
      },
    };
  },
  watch: {
    cover() {
      //圖片預覽
      if (this.cover != null) {
        this.image_preview_url = URL.createObjectURL(this.cover);
      }
    },
  },
  methods: {
    Open(category_id) {
      this.title = "";
      this.content = "";
      this.category = category_id;
      this.dialog = true;
      this.cover = null;
      this.image_preview_url = "";
      this.errors = {
        title: "",
        content: "",
        image: "",
      };
    },
    Cancel() {
      this.title = "";
      this.content = "";
      this.category = -1;
      this.dialog = false;
      this.cover = null;
      this.image_preview_url = "";
      this.errors = {
        title: "",
        content: "",
        image: "",
      };
    },
    CreateNews() {
      let error = false;
      this.errors = {
        title: "",
        content: "",
        category: "",
        image: "",
      };
      if (!validEmpty(this.title)) {
        this.errors.title = "請輸入廣告名稱";
        error = true;
      }
      if (!validEmpty(this.content)) {
        this.errors.content = "請輸入連結網址";
        error = true;
      }
      if (!validFileEmpty(this.cover)) {
        this.errors.image = "請上傳網告圖片";
        error = true;
      }
      if (!error) {
        this.$emit("create-ad", {
          Title: this.title,
          Content: this.content,
          CategoryID: this.category,
          Image1: this.cover,
          Seq: 0,
        });
      }
    },
  },
};
</script>