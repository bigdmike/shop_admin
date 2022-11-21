<template src="./template.html"></template>

<script>
import { get_common_column, updateData } from '@/api/common_column';
import MainImageCard from '@/components/MainImageCard/';
import Breadcrumb from '@/components/Breadcrumb/';
export default {
  name: 'CompanyInfo',
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
          title: '公司資訊',
          link: '',
        },
      ],
      page_data: null,
    };
  },
  methods: {
    async UpdateData() {
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
        'company_facebook',
        'company_instagram',
        'company_image',
        'company_name',
        'company_phone',
        'company_email',
        'company_address',
        'company_time',
      ]).then((res) => {
        res.company_image = this.$SetImageObj(
          res.company_image,
          res.company_image.Content
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
