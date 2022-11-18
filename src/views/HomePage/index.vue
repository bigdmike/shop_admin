<template src="./template.html"></template>

<script>
import Breadcrumb from '@/components/Breadcrumb/';
import MainImageCard from '@/components/MainImageCard/';
import { get_common_column, updateData } from '@/api/common_column';
export default {
  name: 'HomePageEdit',
  components: {
    Breadcrumb,
    MainImageCard,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '頁面編輯',
          link: '',
        },
        {
          title: '首頁編輯',
          link: '',
        },
      ],
      page_data: null,
    };
  },
  methods: {
    UpdateData() {
      updateData(this.page_data).then((res) => {
        console.log(res);
        this.GetPageData();
      });
    },
    CancelEdit() {
      this.GetPageData();
    },
    GetPageData() {
      get_common_column([
        'home_main_product_bg',
        'home_new_product_bg',
        'home_promote_1_image',
        'home_promote_1_link',
        'home_promote_2_image',
        'home_promote_2_link',
        'home_promote_3_image',
        'home_promote_3_link',
      ]).then((res) => {
        console.log(res);
        this.page_data = {};
        res.home_main_product_bg.type = 'image';
        res.home_main_product_bg.Image1 = null;
        res.home_main_product_bg.PreviewImage = this.$ImageUrl(
          res.home_main_product_bg.Content
        );
        res.home_new_product_bg.type = 'image';
        res.home_new_product_bg.Image1 = null;
        res.home_new_product_bg.PreviewImage = this.$ImageUrl(
          res.home_new_product_bg.Content
        );
        res.home_promote_1_image.type = 'image';
        res.home_promote_1_image.Image1 = null;
        res.home_promote_1_image.PreviewImage = this.$ImageUrl(
          res.home_promote_1_image.Content
        );
        res.home_promote_2_image.type = 'image';
        res.home_promote_2_image.Image1 = null;
        res.home_promote_2_image.PreviewImage = this.$ImageUrl(
          res.home_promote_2_image.Content
        );
        res.home_promote_3_image.type = 'image';
        res.home_promote_3_image.Image1 = null;
        res.home_promote_3_image.PreviewImage = this.$ImageUrl(
          res.home_promote_3_image.Content
        );
        this.page_data = res;
      });
    },
    UpdateImage(val, index, key) {
      this.$set(this.page_data[key], 'PreviewImage', val.preview_url);
      this.$set(this.page_data[key], 'Image1', val.file);
    },
  },
  created() {
    this.GetPageData();
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
