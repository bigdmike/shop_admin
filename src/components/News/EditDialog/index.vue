<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card class="grey lighten-3 overflow-hidden">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="Cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>編輯文章</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="CreateQuestion"> 更新 </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row class="pa-8">
        <v-col cols="12" md="8">
          <v-list three-line subheader class="rounded-lg pa-3">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>文章標題</v-list-item-title>
                <v-text-field
                  v-model="title"
                  placeholder="請輸入文章標題"
                  hide-details="auto"
                  outlined
                  dense
                  required
                  :error-messages="errors.title"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>文章內容</v-list-item-title>
                <FroalaEditor v-model="content" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="4">
          <v-list three-line subheader class="rounded-lg pa-3">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>文章分類</v-list-item-title>
                <v-select
                  :items="category_list"
                  placeholder="請選擇文章分類"
                  hide-details="auto"
                  item-text="Title"
                  item-value="NewsCategoryID"
                  dense
                  outlined
                  v-model="category"
                  :error-messages="errors.category"
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>文章封面圖</v-list-item-title>
                <v-file-input
                  :placeholder="file_place_holder"
                  hide-details="auto"
                  dense
                  outlined
                  truncate-length="15"
                  v-model="cover"
                  :error-messages="errors.image"
                  prepend-icon=""
                ></v-file-input>
                <v-img
                  class="mt-5 rounded-lg"
                  :src="image_preview_url"
                  v-if="image_preview_url != ''"
                  contain
                ></v-img>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmpty } from "@/common/validate.js";
import FroalaEditor from "@/components/FroalaEditor/";
export default {
  name: "NewsEditDialog",
  props: {
    category_list: {
      require: true,
      type: Array,
    },
  },
  components: {
    FroalaEditor,
  },
  data() {
    return {
      id: -1,
      seq: -1,
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
  computed: {
    file_place_holder() {
      return this.image_preview_url == ""
        ? "請上傳文章封面圖"
        : this.image_preview_url.split("/")[
            this.image_preview_url.split("/").length - 1
          ];
    },
  },
  methods: {
    Open(item) {
      console.log(item);
      this.id = item.NewsID;
      this.seq = item.Seq;
      this.title = item.Title;
      this.content = item.Content;
      this.category = item.NewsCategoryID;
      this.dialog = true;
      this.cover = null;
      this.image_preview_url = process.env.VUE_APP_BASEURL + item.Image1;
      this.errors = {
        title: "",
        content: "",
        category: "",
        image: "",
      };
    },
    Cancel() {
      this.id = -1;
      this.seq = -1;
      this.title = "";
      this.content = "";
      this.category = -1;
      this.dialog = false;
      this.cover = null;
      this.image_preview_url = "";
      this.errors = {
        title: "",
        content: "",
        category: "",
        image: "",
      };
    },
    CreateQuestion() {
      let error = false;
      this.errors = {
        title: "",
        content: "",
        category: "",
        image: "",
      };
      if (!validEmpty(this.title)) {
        this.errors.title = "請輸入文章標題";
        error = true;
      }
      // if (!validEmpty(this.content)) {
      //   this.errors.content = "請輸入文章內容";
      //   error = true;
      // }
      if (!validEmpty(this.category)) {
        this.errors.category = "請選擇文章分類";
        error = true;
      }
      // if (!validFileEmpty(this.cover)) {
      //   this.errors.image = "請上傳文章封面圖";
      //   error = true;
      // }
      if (!error) {
        this.$emit("update-news", {
          ID: parseInt(this.id),
          Title: this.title,
          Content: this.content,
          CategoryID: parseInt(this.category),
          Image1: this.cover,
          Seq: this.seq,
        });
      }
    },
  },
};
</script>