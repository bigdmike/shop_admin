<template src="./template.html"></template>

<script>
import FroalaEditor from '@/components/FroalaEditor/';
import Breadcrumb from '@/components/Breadcrumb/';
import { get_common_column, updateData } from '@/api/common_column';
export default {
  name: 'TermsOfCustomer',
  components: {
    FroalaEditor,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '頁面編輯',
          link: '',
        },
        {
          title: '會員責任規範條款',
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
    GetPageData() {
      get_common_column(['terms_of_customer']).then((res) => {
        this.page_data = res;
      });
    },
    CancelEdit() {
      this.GetPageData();
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
