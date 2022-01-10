<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        更新角色館
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="角色名稱"
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
              <v-file-input
                label="圖片"
                v-model="image"
                :persistent-placeholder="true"
                :placeholder="file_place_holder"
                hide-details="auto"
                dense
                outlined
                truncate-length="15"
                :error-messages="errors.image"
                prepend-icon=""
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="UpdateMascot"> 更新 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmpty } from "@/common/validate.js";
export default {
  name: "MascotEditDialog",
  data() {
    return {
      id: -1,
      seq: -1,
      title: "",
      link: "",
      image: null,
      image_preview_url: "",
      dialog: false,
      errors: {
        title: "",
        link: "",
        image: "",
      },
    };
  },

  computed: {
    file_place_holder() {
      return this.image_preview_url == ""
        ? "請上傳圖片"
        : this.image_preview_url.split("/")[
            this.image_preview_url.split("/").length - 1
          ];
    },
  },
  methods: {
    Open(item) {
      console.log(item);
      this.id = item.MascotID;
      this.seq = item.Seq;
      this.title = item.Title;
      this.link = item.Link;
      this.image = null;
      console.log(process.env.VUE_APP_BASEURL + item.Image1);
      this.image_preview_url = process.env.VUE_APP_BASEURL + item.Image1;
      this.dialog = true;
      this.errors = {
        title: "",
        link: "",
        image: "",
      };
    },
    Cancel() {
      this.id = -1;
      this.seq = -1;
      this.title = "";
      this.link = "";
      this.image = null;
      this.dialog = false;
      this.image_preview_url = "";
      this.errors = {
        title: "",
        link: "",
        image: "",
      };
    },
    UpdateMascot() {
      let error = false;
      this.errors = {
        title: "",
        link: "",
        image: "",
      };
      if (!validEmpty(this.title)) {
        this.errors.title = "請輸入角色名爭";
        error = true;
      }
      if (!validEmpty(this.link)) {
        this.errors.link = "請輸入連結網址";
        error = true;
      }
      // if (!validFileEmpty(this.image)) {
      //   this.errors.image = "請上傳圖片";
      //   error = true;
      // }
      if (!error) {
        this.$emit("update-mascot", {
          ID: this.id,
          Title: this.title,
          Link: this.link,
          Image1: this.image,
          Image2: null,
          Seq: this.seq,
        });
      }
    },
  },
};
</script>