<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        更新商品連結
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
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
                v-model="image"
                prepend-icon=""
                label="圖片"
                :placeholder="file_place_holder"
                hide-details="auto"
                dense
                outlined
                :persistent-placeholder="true"
                :error-messages="errors.image"
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
        <v-btn color="primary" @click="UpdatePromote"> 更新 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { validFileEmpty } from "@/common/validate.js";
export default {
  name: "HomePromoteEditDialog",
  data() {
    return {
      link: "",
      id: "",
      image: null,
      file_path_image: "",
      seq: -1,
      dialog: false,
      errors: {
        link: "",
        image: "",
      },
    };
  },

  computed: {
    file_place_holder() {
      return this.file_path_image == ""
        ? "請上傳圖片"
        : this.file_path_image.split("/")[
            this.file_path_image.split("/").length - 1
          ];
    },
  },
  methods: {
    Open(item) {
      this.link = item.Link;
      this.id = item.PromoteID;
      this.image = null;
      this.file_path_image = item.Image1;
      this.seq = item.Seq;
      this.dialog = true;
      this.errors = {
        link: "",
        image: "",
      };
    },
    Cancel() {
      this.link = "";
      this.id = "";
      this.image = null;
      this.file_path_image = "";
      this.dialog = false;
      this.seq = -1;
      this.errors = {
        link: "",
        image: "",
      };
    },
    UpdatePromote() {
      this.$emit("update-promote", {
        ID: this.id,
        Link: this.link,
        Image1: this.image,
        Image2: "",
        Seq: this.seq,
      });
    },
  },
};
</script>