<template src="./template.html"></template>

<script>
import FroalaEditor from '@/components/FroalaEditor/';
import Breadcrumb from '@/components/Breadcrumb/';
import { get_common_column, updateData } from '@/api/common_column';
export default {
  name: 'PrivacyPage',
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
          title: '隱私權政策',
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
    async GetPageData() {
      get_common_column(['site_privacy']).then((res) => {
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
