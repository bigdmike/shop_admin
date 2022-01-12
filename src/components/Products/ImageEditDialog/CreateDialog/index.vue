<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        新增商品圖
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-file-input
                v-model="image"
                prepend-icon=""
                label="商品圖片"
                hide-details="auto"
                dense
                outlined
                :error-messages="errors.image"
                show-size
              ></v-file-input>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select
                v-model="color_id"
                label="指定規格一"
                :items="GetColorOption()"
                item-text="ColorTitle"
                item-value="ColorID"
                outlined
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select
                v-model="size_id"
                label="指定規格二"
                :items="GetSizeOption()"
                item-text="SizeTitle"
                item-value="SizeID"
                outlined
                dense
                hide-details
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="CreateCarousel"> 新增 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validFileEmpty } from "@/common/validate.js";
export default {
  name: "CarouselCreateDialog",
  props: {
    color: {
      require: true,
      type: Array,
    },
    size: {
      require: true,
      type: Array,
    },
    id: {
      require: true,
    },
  },
  data() {
    return {
      color_id: "",
      size_id: "",
      image: null,
      dialog: false,
      errors: {
        image: "",
      },
    };
  },
  methods: {
    Open() {
      this.color_id = "";
      this.size_id = "";
      this.image = null;
      this.dialog = true;
      this.errors = {
        image: "",
      };
    },
    Cancel() {
      this.color_id = "";
      this.size_id = "";
      this.image = null;
      this.dialog = false;
      this.errors = {
        image: "",
      };
    },
    CreateCarousel() {
      let error = false;
      this.errors = {
        image: "",
      };
      if (!validFileEmpty(this.image)) {
        this.errors.image = "請上傳圖片";
        error = true;
      }
      if (!error) {
        this.$emit("create-image", {
          ColorID: this.color_id,
          SizeID: this.size_id,
          Seq: 0,
          Image: this.image,
        });
      }
    },
    GetColorOption() {
      let data = this.color;
      if (data.filter((item) => item.ColorID == 0).length <= 0) {
        data.splice(0, 0, {
          ColorTitle: "不指定",
          ColorID: 0,
        });
      }
      return data.filter((item) => {
        return (
          item.GoodsID == this.id ||
          item.ColorTitle == "無" ||
          item.ColorID == 0
        );
      });
    },
    GetSizeOption() {
      let data = this.size;

      if (data.filter((item) => item.SizeID == 0).length <= 0) {
        data.splice(0, 0, {
          SizeTitle: "不指定",
          SizeID: 0,
        });
      }
      return data.filter((item) => {
        return (
          item.GoodsID == this.id || item.SizeTitle == "無" || item.SizeID == 0
        );
      });
    },
  },
};
</script>