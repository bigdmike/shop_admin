<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="500">
    <v-card>
      <v-card-title
        style="border-bottom: 1px solid rgb(218, 218, 218)"
        class="bg-primary"
      >
        新增文章分類
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <p>分類標題</p>
              <v-text-field
                v-model="title"
                placeholder="請輸入分類標題"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <p>封面圖片</p>
              <MainImageCard
                :image_data="cover_image"
                upload_key="cover_image"
                @update-action="UpdateImage"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="CreateData"> 新增 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmpty } from '@/common/validate.js';
import MainImageCard from '@/components/MainImageCard/';
export default {
  name: 'MenuDialog',
  props: {
    category_list: {
      require: true,
      type: Array,
    },
  },
  components: {
    MainImageCard,
  },
  data() {
    return {
      title: '',
      content: '',
      category: 1,
      cover_image: null,
      dialog: false,
      errors: {
        title: '',
        content: '',
        category: '',
      },
    };
  },
  methods: {
    Open() {
      this.title = '';
      this.content = '';
      this.category = 1;
      this.dialog = true;
      this.cover_image = this.$SetImageObj(this.cover_image, '');
      this.errors = {
        title: '',
        content: '',
        category: '',
        image: '',
      };
    },
    Cancel() {
      this.title = '';
      this.content = '';
      this.category = 1;
      this.dialog = false;
      this.cover = null;
      this.image_preview_url = '';
      this.errors = {
        title: '',
        content: '',
        category: '',
        image: '',
      };
    },
    UpdateImage(val) {
      this.$set(this.cover_image, 'PreviewImage', val.preview_url);
      this.$set(this.cover_image, 'Image1', val.file);
    },
    CreateData() {
      let error = false;
      this.errors = {
        title: '',
        content: '',
        category: '',
        image: '',
      };
      if (!validEmpty(this.title)) {
        this.errors.title = '請輸入分類名稱';
        error = true;
      }
      if (!error) {
        this.$emit('create-menu', {
          Title: this.title,
          Content: this.content,
          CategoryID: 1,
          Status: 'Y',
          Image1: this.cover_image.file,
          Seq: 0,
        });
      }
    },
  },
};
</script>
