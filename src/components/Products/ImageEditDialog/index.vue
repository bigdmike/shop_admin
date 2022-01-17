<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <InfoDialog ref="InfoDialog" :color="color" :size="size" />
    <CreateDialog
      :color="color"
      :size="size"
      :id="id"
      v-on:create-image="SendCreateData"
      ref="CreateDialog"
    />
    <DeleteDialog ref="DeleteDialog" v-on:delete-image="SendDeleteData" />

    <v-card class="grey lighten-3 overflow-hidden">
      <v-toolbar dark color="primary">
        <v-toolbar-title>商品圖片設定</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="Cancel"> 關閉 </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-col cols="12" md="12" lg="12" xl="10" class="mx-auto">
        <div class="product_list mx-auto px-10 pt-10">
          <div class="header d-flex justify-end align-center mb-5">
            <div class="d-flex align-center">
              <v-btn @click="OpenCreateDialog" color="primary font-weight-bold"
                >新增圖片</v-btn
              >
            </div>
          </div>
          <draggable
            class="row d-flex align-stretch flex-wrap"
            v-model="images"
            @start="drag = true"
            @end="drag = false"
            @change="SendSortData"
          >
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="item in images"
              :key="item.title"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  class="image_card"
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <v-img :src="ConvertImage(item.Image)" :aspect-ratio="1">
                    <v-card-title
                      :class="{ show: hover }"
                      class="text-h6 white--text fill-height img_card_control"
                    >
                      <div
                        class="
                          d-flex
                          justify-space-between
                          align-center
                          my-auto
                          mx-auto
                        "
                      >
                        <v-btn
                          @click="OpenInfoDialog(item)"
                          :class="{ 'show-btns': hover }"
                          color="rgba(255, 255, 255, 0)"
                          icon
                        >
                          <v-icon
                            :class="{ 'show-btns': hover }"
                            small
                            color="rgba(255, 255, 255, 0)"
                          >
                            mdi-eye
                          </v-icon>
                        </v-btn>
                        <v-btn
                          @click="OpenDeleteDialog(item.GoodsPictureID)"
                          :class="{ 'show-btns': hover }"
                          color="rgba(255, 255, 255, 0)"
                          icon
                        >
                          <v-icon
                            :class="{ 'show-btns': hover }"
                            small
                            color="rgba(255, 255, 255, 0)"
                          >
                            mdi-trash-can-outline
                          </v-icon>
                        </v-btn>
                      </div>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </draggable>
        </div>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
import draggable from "vuedraggable";
import CreateDialog from "./CreateDialog/index.vue";
import DeleteDialog from "./DeleteDialog/index.vue";
import InfoDialog from "./InfoDialog/index.vue";
import {
  getGoodsAndCategory,
  create_picture,
  update_picture_sort,
  delete_picture,
} from "@/api/products_image.js";
import { ImageUrl } from "@/common/filter.js";
export default {
  name: "ProductImageCreateDialog",
  components: {
    CreateDialog,
    DeleteDialog,
    draggable,
    InfoDialog,
  },
  data() {
    return {
      id: -1,
      images: [],
      color: [],
      size: [],
      dialog: false,
    };
  },
  methods: {
    Open(id) {
      this.id = id;
      this.GetImages();
      this.dialog = true;
      this.images = [];
    },
    Cancel() {
      this.dialog = false;
      this.images = [];
    },
    OpenInfoDialog(item) {
      this.$refs.InfoDialog.Open(item);
    },
    OpenCreateDialog() {
      this.$refs.CreateDialog.Open();
    },
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id);
    },
    GetImages() {
      getGoodsAndCategory(this.id).then((res) => {
        console.log(res);
        this.color = res[0].data;
        this.size = res[1].data;
        this.images = res[2].data;
      });
    },
    ConvertImage(image) {
      return ImageUrl(image);
    },
    SendSortData() {
      // GoodsPictureID
      let data = [];
      this.images.forEach((item, item_index) => {
        data.push({
          ID: item.GoodsPictureID,
          Seq: item_index + 1,
        });
      });
      update_picture_sort(data).then(() => {
        this.GetImages();
      });
    },
    SendCreateData(data) {
      data.GoodsID = this.id;
      create_picture(data).then(() => {
        this.$refs.CreateDialog.Cancel();
        this.GetImages();
      });
    },
    SendDeleteData(id) {
      delete_picture(id).then(() => {
        this.$refs.DeleteDialog.Cancel();
        this.GetImages();
      });
    },
  },
};
</script>
<style>
.image_card {
  transition: opacity 0.4s ease-in-out;
  cursor: grab;
}

.img_card_control {
  background-color: rgba(0, 0, 0, 0.541);
  transition: opacity 0.4s ease-in-out;
  opacity: 0;
}
.img_card_control.show {
  opacity: 1;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>