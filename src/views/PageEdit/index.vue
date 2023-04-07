<template src="./template.html"></template>

<script>
import Breadcrumb from '@/components/Breadcrumb/';
import MainImageCard from '@/components/MainImageCard/';
import FroalaEditor from '@/components/FroalaEditor/';
import { get_common_column, updateData } from '@/api/common_column';
import { SetEditData } from '@/common/page_edit';
export default {
  name: 'PageEdit',
  components: {
    Breadcrumb,
    MainImageCard,
    FroalaEditor,
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
      edit_block_data: null,
    };
  },
  methods: {
    GetBlockCards(title) {
      return this.edit_block_data.edit_block.filter(
        (item) => item.block_title == title
      );
    },
    GetAspectRatio(val) {
      return eval(val);
    },
    UpdateData() {
      updateData(this.page_data).then(() => {
        this.GetPageData();
      });
    },
    CancelEdit() {
      this.GetPageData();
    },
    async GetPageData() {
      this.edit_block_data = await import(
        `@/assets/data/${this.$route.params.id}.json`
      );

      get_common_column(this.edit_block_data.column_keys).then((res) => {
        this.breadcrumb_data[1].title = this.edit_block_data.page_title;
        this.page_data = SetEditData(res, this.edit_block_data.edit_block);
      });
    },
    UpdateImage(key, val) {
      this.$set(this.page_data[key], 'PreviewImage', val.preview_url);
      this.$set(this.page_data[key], 'Image1', val.file);
    },
  },
  watch: {
    $route() {
      this.page_data = null;
      this.edit_block_data = null;
      this.GetPageData();
    },
  },
  created() {
    this.GetPageData();
  },
};
</script>
