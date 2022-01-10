<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        更新輪播圖
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
                v-model="image_pc"
                prepend-icon=""
                label="電腦版圖片"
                :placeholder="file_path.image_pc"
                hide-details="auto"
                dense
                outlined
                :error-messages="errors.image_pc"
                show-size
              ></v-file-input>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-file-input
                v-model="image_mb"
                prepend-icon=""
                label="手機版圖片"
                :placeholder="file_path.image_mb"
                hide-details="auto"
                dense
                outlined
                :error-messages="errors.image_mb"
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
        <v-btn color="primary" @click="UpdateCarousel"> 更新 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { validFileEmpty } from "@/common/validate.js";
export default {
  name: "CarouselEditDialog",
  data() {
    return {
      link: "",
      id: -1,
      image_pc: null,
      image_mb: null,
      seq: 0,
      file_path: {
        image_pc: "",
        image_mb: "",
      },
      dialog: false,
      errors: {
        link: "",
        image_pc: "",
        image_mb: "",
      },
    };
  },
  methods: {
    Open(item) {
      this.link = item.Link;
      this.id = item.CarouselID;
      this.image_pc = null;
      this.image_mb = null;
      this.seq = item.Seq;
      this.file_path = {
        image_pc: item.Image1,
        image_mb: item.Image2,
      };
      this.dialog = true;
      this.errors = {
        link: "",
        image_pc: "",
        image_mb: "",
      };
    },
    Cancel() {
      this.link = "";
      this.id = -1;
      this.image_pc = null;
      this.image_mb = null;
      this.seq = 0;
      this.file_path = {
        image_pc: "",
        image_mb: "",
      };
      this.dialog = false;
      this.errors = {
        link: "",
        image_pc: "",
        image_mb: "",
      };
    },
    UpdateCarousel() {
      this.$emit("update-carousel", {
        CarouselID: this.id,
        Link: this.link,
        Image1: this.image_pc,
        Image2: this.image_mb,
        Seq: 0,
      });
    },
  },
};
</script>