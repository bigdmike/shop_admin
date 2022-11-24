<template src="./template.html"></template>

<script>
import Breadcrumb from '@/components/Breadcrumb/';
import MainImageCard from '@/components/MainImageCard/';
import FroalaEditor from '@/components/FroalaEditor/';
import { get_common_column, updateData } from '@/api/common_column';
export default {
  name: 'HomePageEdit',
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
        'about_section_1_title',
        'about_section_1_sub_title',
        'about_section_1_content',
        'about_section_1_image',
        'about_section_2_title',
        'about_section_2_sub_title',
        'about_section_2_content',
        'about_section_2_image',
        'about_section_3_title',
        'about_section_3_sub_title',
        'about_section_3_content',
        'about_section_3_image',
        'about_section_4_title',
        'about_section_4_sub_title',
        'about_section_4_content',
        'about_section_4_image',
      ]).then((res) => {
        this.page_data = {};
        for (let i = 1; i <= 4; i++) {
          res[`about_section_${i}_image`].type = 'image';
          res[`about_section_${i}_image`].Image1 = null;
          res[`about_section_${i}_image`].PreviewImage = this.$ImageUrl(
            res[`about_section_${i}_image`].Content
          );
        }
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
