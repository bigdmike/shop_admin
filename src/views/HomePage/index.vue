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
        'event_announcement',
        'home_main_product_bg',
        'home_new_product_bg',
        'home_promote_1_image',
        'home_promote_1_link',
        'home_promote_2_image',
        'home_promote_2_link',
        'home_promote_3_image',
        'home_promote_3_link',
      ]).then((res) => {
        this.page_data = {};
        res.home_main_product_bg = this.$SetImageObj(
          res.home_main_product_bg,
          res.home_main_product_bg.Content
        );
        res.home_new_product_bg = this.$SetImageObj(
          res.home_new_product_bg,
          res.home_new_product_bg.Content
        );
        res.home_promote_1_image = this.$SetImageObj(
          res.home_promote_1_image,
          res.home_promote_1_image.Content
        );
        res.home_promote_2_image = this.$SetImageObj(
          res.home_promote_2_image,
          res.home_promote_2_image.Content
        );
        res.home_promote_3_image = this.$SetImageObj(
          res.home_promote_3_image,
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
