<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        新增角色館
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
                v-model="image"
                prepend-icon=""
                label="圖片"
                hide-details="auto"
                dense
                outlined
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
        <v-btn color="primary" @click="CreateMascot"> 新增 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmpty, validFileEmpty } from "@/common/validate.js";
export default {
  name: "MascotCreateDialog",
  data() {
    return {
      title: "",
      link: "",
      image: null,
      dialog: false,
      errors: {
        title: "",
        link: "",
        image: "",
      },
    };
  },
  methods: {
    Open() {
      this.title = "";
      this.link = "";
      this.image = null;
      this.dialog = true;
      this.errors = {
        title: "",
        link: "",
        image: "",
      };
    },
    Cancel() {
      this.title = "";
      this.link = "";
      this.image = null;
      this.dialog = false;
      this.errors = {
        title: "",
        link: "",
        image: "",
      };
    },
    CreateMascot() {
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
      if (!validFileEmpty(this.image)) {
        this.errors.image = "請上傳圖片";
        error = true;
      }
      if (!error) {
        this.$emit("create-mascot", {
          Title: this.title,
          Link: this.link,
          Image1: this.image,
          Image2: null,
          Seq: 0,
        });
      }
    },
  },
};
</script>