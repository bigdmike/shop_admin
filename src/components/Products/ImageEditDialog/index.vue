<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <CreateDialog
      :color="color"
      :size="size"
      :id="id"
      v-on:create-image="SendCreateData"
      ref="CreateDialog"
    />

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
                  <v-img :src="ConvertImage(item.Image)" :aspect-ratio="5 / 3">
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
                          @click="OpenEdit(item)"
                          :class="{ 'show-btns': hover }"
                          color="rgba(255, 255, 255, 0)"
                          icon
                        >
                          <v-icon
                            :class="{ 'show-btns': hover }"
                            small
                            color="rgba(255, 255, 255, 0)"
                          >
                            mdi-pencil-outline
                          </v-icon>
                        </v-btn>
                        <v-btn
                          @click="OpenImageShow(item)"
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
                          @click="OpenDelete(item)"
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
import { getGoodsAndCategory, create_picture } from "@/api/products_image.js";
import { ImageUrl } from "@/common/filter.js";
export default {
  name: "ProductImageCreateDialog",
  components: {
    CreateDialog,
    draggable,
  },
  props: {
    category_list: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      id: 1,
      title: "",
      content: "",
      category: "",
      cover: null,
      image_preview_url: "",
      images: [],
      color: [],
      size: [],
      dialog: true,
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
    Open() {
      this.title = "";
      this.content = "";
      this.category = -1;
      this.dialog = true;
      this.cover = null;
      this.image_preview_url = "";
      this.images = [];
      this.errors = {
        title: "",
        content: "",
        category: "",
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
        category: "",
        image: "",
      };
    },
    OpenCreateDialog() {
      this.$refs.CreateDialog.Open();
    },
    CreateNews() {
      this.$emit("create-news", {
        Title: this.title,
        Content: this.content,
        CategoryID: this.category,
        Image1: this.cover,
        Seq: 0,
      });
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
    SendCreateData(data) {
      data.GoodsID = this.id;
      create_picture(data).then(() => {
        this.$refs.CreateDialog.Cancel();
        this.GetImages();
      });
    },
  },
  created() {
    this.GetImages();
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