<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <input
      ref="ImageUpload"
      @change="CreateData($event.target.files)"
      type="file"
      accept=".jpg,.jpeg,.png,.gif,.webp"
      style="display: none;"
      multiple
    />
    <DeleteDialog ref="DeleteDialog" @delete-action="DeleteData" />

    <v-card class="grey lighten-3 overflow-hidden">
      <v-toolbar class="white primary--text elevation-1">
        <v-toolbar-title>
          <p class="ma-0 font-weight-bold">商品圖片設定</p>
          <p class="ma-0 text-caption">{{ title }}</p>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <div class="d-flex align-center">
            <v-btn class="elevation-0" outlined @click="Cancel"> 關閉 </v-btn>
          </div>
        </v-toolbar-items>
      </v-toolbar>

      <v-col cols="12" md="12" lg="12" xl="10" class="mx-auto">
        <div class="product_list mx-auto px-10 pt-10">
          <div class="header d-flex justify-end align-center mb-5">
            <div class="d-flex align-center">
              <v-btn
                @click="OpenCreateDialog"
                class="light-blue lighten-1 white--text font-weight-bold elevation-0"
                >新增圖片</v-btn
              >
            </div>
          </div>
          <draggable
            class="row d-flex align-stretch flex-wrap"
            v-model="images"
            @start="drag = true"
            @end="drag = false"
            @change="SortData"
          >
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="(item, item_index) in images"
              :key="item.title"
            >
              <MainImageCard
                :image_data="item"
                :upload_key="item_index"
                aspect_ratio="1"
                :delete_mode="true"
                @delete-action="OpenDeleteDialog"
                @update-action="UpdateImage"
              />
            </v-col>
          </draggable>
        </div>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
// import draggable from 'vuedraggale';
import DeleteDialog from '@/components/MainDeleteDialog/index.vue';
import MainImageCard from '@/components/MainImageCard/';
import {
  get_picture,
  create_picture,
  update_picture_sort,
  delete_picture,
} from '@/api/products_image.js';
export default {
  name: 'ProductImageCreateDialog',
  components: {
    DeleteDialog,
    MainImageCard,
  },
  data() {
    return {
      id: -1,
      title: '',
      images: [],
      dialog: false,
    };
  },
  methods: {
    Open(item) {
      this.images = [];
      this.id = item.GoodsID;
      this.title = item.Title;
      this.GetData();
      this.dialog = true;
    },
    Cancel() {
      this.dialog = false;
      this.images = [];
      this.title = '';
    },
    OpenCreateDialog() {
      this.$refs.ImageUpload.click();
    },
    OpenDeleteDialog(index, key) {
      this.$refs.DeleteDialog.Open(this.images[key].GoodsPictureID);
    },
    async UpdateImage(val, index, key) {
      let tmp_image_data = Object.assign({}, this.images[key]);
      let new_image_data = {
        GoodsID: this.id,
        ColorID: 0,
        SizeID: 0,
        Seq: tmp_image_data.Seq,
        Image: val.file,
      };
      await delete_picture(tmp_image_data.GoodsPictureID);
      await create_picture(new_image_data);
      this.GetData();
    },
    CheckSort() {
      let is_sort = true;
      this.images.forEach((item, item_index) => {
        item.Seq == item_index + 2 ? '' : (is_sort = false);
      });
      is_sort ? '' : this.SortData();
    },
    GetData() {
      get_picture(this.id).then((res) => {
        res.data.forEach((item, item_index) => {
          res.data[item_index] = this.$SetImageObj(item, item.Image);
        });
        this.$set(this, 'images', res.data);
        this.CheckSort();
      });
    },
    async CreateData(files) {
      files = [...files];
      for (let index in files) {
        let image_data = {
          GoodsID: this.id,
          ColorID: 0,
          SizeID: 0,
          Seq: index,
          Image: files[index],
        };
        await create_picture(image_data);
      }
      this.GetData();
    },
    SortData() {
      let data = [];
      this.images.forEach((item, item_index) => {
        data.push({
          ID: item.GoodsPictureID,
          Seq: item_index + 2,
        });
      });
      update_picture_sort(data).then(() => {
        this.GetData();
      });
    },
    DeleteData(id) {
      delete_picture(id).then(() => {
        this.$refs.DeleteDialog.Cancel();
        this.GetData();
      });
    },
  },
};
</script>
