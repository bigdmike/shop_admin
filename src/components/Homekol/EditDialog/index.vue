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
        <v-toolbar-title>更新網紅介紹</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="UpdateKOL"> 更新 </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row class="pa-8">
        <v-col cols="12" md="8">
          <v-list three-line subheader class="rounded-lg pa-3">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>介紹標題</v-list-item-title>
                <v-text-field
                  v-model="title"
                  placeholder="請輸入介紹標題"
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
                <v-list-item-title>介紹副標題</v-list-item-title>
                <v-text-field
                  v-model="sub_title"
                  placeholder="請輸入介紹副標題"
                  hide-details="auto"
                  outlined
                  dense
                  required
                  :error-messages="errors.sub_title"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>介紹內容</v-list-item-title>
                <FroalaEditor v-model="content" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="4">
          <v-list three-line subheader class="rounded-lg pa-3">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>連結網址</v-list-item-title>
                <v-text-field
                  v-model="link"
                  placeholder="請輸入連結網址"
                  hide-details="auto"
                  outlined
                  dense
                  required
                  :error-messages="errors.link"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>網紅介紹圖</v-list-item-title>
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
  name: "KolEditDialog",
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
      sub_title: "",
      content: "",
      link: "",
      cover: null,
      image_preview_url: "",
      dialog: false,
      errors: {
        title: "",
        sub_title: "",
        content: "",
        link: "",
        image: "",
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
        ? "請上傳網紅介紹圖"
        : this.image_preview_url.split("/")[
            this.image_preview_url.split("/").length - 1
          ];
    },
  },
  methods: {
    Open(item) {
      this.title = item.Title;
      this.sub_title = item.SubTitle;
      this.content = item.Description;
      this.link = item.Link;
      this.dialog = true;
      this.cover = null;
      this.image_preview_url = process.env.VUE_APP_BASEURL + item.Image1;
      this.id = item.KolID;
      this.seq = item.Seq;
      this.errors = {
        title: "",
        sub_title: "",
        content: "",
        link: "",
        image: "",
      };
    },
    Cancel() {
      this.title = "";
      this.sub_title = "";
      this.content = "";
      this.link = "";
      this.dialog = false;
      this.cover = null;
      this.image_preview_url = "";
      this.errors = {
        title: "",
        sub_title: "",
        content: "",
        link: "",
        image: "",
      };
    },
    UpdateKOL() {
      let error = false;
      this.errors = {
        title: "",
        sub_title: "",
        content: "",
        link: "",
        image: "",
      };
      if (!validEmpty(this.title)) {
        this.errors.title = "請輸入網紅介紹標題";
        error = true;
      }
      if (!validEmpty(this.sub_title)) {
        this.errors.sub_title = "請輸入網紅介紹副標題";
        error = true;
      }
      if (!validEmpty(this.link)) {
        this.errors.link = "請輸入網紅頁面連結";
        error = true;
      }
      if (!validEmpty(this.content)) {
        this.errors.content = "請輸入介紹內容";
        error = true;
      }
      // if (!validFileEmpty(this.cover)) {
      //   this.errors.image = "請上傳圖片";
      //   error = true;
      // }
      console.log(this.errors);
      if (!error) {
        this.$emit("update-kol", {
          ID: this.id,
          Title: this.title,
          SubTitle: this.sub_title,
          Description: this.content,
          Link: this.link,
          Image1: this.cover,
          Image2: "",
          Seq: this.seq,
        });
      }
    },
  },
};
</script>