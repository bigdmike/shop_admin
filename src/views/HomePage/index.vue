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
      updateData(this.page_data).then(() => {
        this.GetPageData();
      });
    },
    CancelEdit() {
      this.GetPageData();
    },
    GetPageData() {
      get_common_column([
        'home_product_1_title',
        'home_product_1_subtitle',
        'home_product_1_link',
        'home_product_1_image',
        'home_product_2_title',
        'home_product_2_subtitle',
        'home_product_2_link',
        'home_product_2_image',
        'home_video',
      ]).then((res) => {
        this.page_data = {};

        res.home_product_1_image = this.$SetImageObj(
          res.home_product_1_image,
          res.home_product_1_image.Content
        );
        res.home_product_2_image = this.$SetImageObj(
          res.home_product_2_image,
          res.home_product_2_image.Content
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
