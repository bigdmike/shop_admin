<template src="./template.html"></template>
<script>
import FroalaEditor from '@/components/FroalaEditor/';
import Breadcrumb from '@/components/Breadcrumb/';
import MainImageCard from '@/components/MainImageCard/';
import { get_common_column, updateData } from '@/api/common_column.js';
export default {
  name: 'SeoEdit',
  components: {
    FroalaEditor,
    Breadcrumb,
    MainImageCard,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: 'SEO編輯列表',
          link: '/seo_list',
        },
        {
          title: '頁面SEO編輯',
          link: '',
        },
      ],
      page_list: {
        home: '首頁',
        about: '關於我們',
        newslist: '最新消息列表',
        productlist: '商品列表',
      },
      page_data: null,
    };
  },
  methods: {
    GetData() {
      get_common_column([
        `meta_title_${this.$route.params.id}`,
        `meta_content_${this.$route.params.id}`,
        `meta_image_${this.$route.params.id}`,
      ]).then((res) => {
        console.log(res);
        res[`meta_image_${this.$route.params.id}`] = this.$SetImageObj(
          res[`meta_image_${this.$route.params.id}`],
          res[`meta_image_${this.$route.params.id}`].Content
        );

        this.page_data = res;
      });
    },
    UpdateData() {
      updateData(this.page_data).then((res) => {
        console.log(res);
        this.$router.push('/seo_list');
      });
    },
    CancelEdit() {
      this.$router.push('/seo_list');
    },
    UpdateImage(val, index, key) {
      this.$set(this.page_data[key], 'PreviewImage', val.preview_url);
      this.$set(this.page_data[key], 'Image1', val.file);
    },
  },
  created() {
    this.GetData();
  },
};
</script>
