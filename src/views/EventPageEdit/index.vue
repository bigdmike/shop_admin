<template src="./template.html"></template>

<script>
import Breadcrumb from '@/components/Breadcrumb/';
import FroalaEditor from '@/components/FroalaEditor/';
import DateTimePicker from '@/components/DateTimePicker/index.vue';
import MainImageCard from '@/components/MainImageCard/';

import {
  update_menu_image,
  update_menu,
  create_menu,
  get_menu,
} from '@/api/product_menu';
// import { StrToBool, BoolToStr, ImageUrl } from '@/common/filter.js';
export default {
  name: 'EventPageEdit',
  components: {
    Breadcrumb,
    FroalaEditor,
    DateTimePicker,
    MainImageCard,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '所有銷售頁',
          link: '/event_page',
        },
        {
          title: '新增銷售頁',
          link: '',
        },
      ],
      status_data: [
        {
          label: '啟用',
          value: 'Y',
        },
        {
          label: '停用',
          value: 'N',
        },
      ],
      event_page_data: null,
      edit_mode: 'edit',
    };
  },
  methods: {
    UpdateData() {
      //檢查images options category name
      let error = '';
      if (this.event_page_data.Title == '') {
        error += '- 請輸入銷售頁標題 <br>';
      }
      if (this.event_page_data.MenuTimeSet == 'Y') {
        if (
          this.event_page_data.MenuTimeStart == '' ||
          this.event_page_data.MenuTimeStart == null
        ) {
          error += '- 請選擇開始販售時間 <br>';
        }
        if (
          this.event_page_data.MenuTimeEnd == '' ||
          this.event_page_data.MenuTimeEnd == null
        ) {
          error += '- 請選擇結束販售時間 <br>';
        }
      }
      if (error == '') {
        this.UpdateEventPageData();
      } else {
        error = '無法儲存銷售頁請修正以下問題：<br>' + error;
        this.$store.commit('SetDialog', {
          title: '發生錯誤',
          content: error,
          status: true,
        });
      }
    },
    CancelEdit() {
      this.$router.push('/event_page');
    },
    GetEventPageData() {
      if (this.$route.params.id) {
        // 編輯
        this.edit_mode = 'edit';
        get_menu().then((res) => {
          let event_page_data = res.data.filter((item) => {
            return item.MenuID == this.$route.params.id;
          });
          if (event_page_data.length <= 0) {
            this.$router.push('/event_page');
          } else {
            event_page_data = event_page_data[0];
            event_page_data.MenuTimeSet =
              event_page_data.MenuTimeStart != null &&
              event_page_data.MenuTimeEnd != null
                ? 'Y'
                : 'N';
            if (event_page_data.MenuTimeStart == null) {
              event_page_data.MenuTimeStart = '';
            }
            if (event_page_data.MenuTimeEnd == null) {
              event_page_data.MenuTimeEnd = '';
            }
            event_page_data.PreviewImage = this.$ImageUrl(
              event_page_data.Image1
            );
            event_page_data.Image1 = null;
            this.event_page_data = event_page_data;
          }
        });
      } else {
        // 新增
        this.edit_mode = 'create';
        this.event_page_data = Object.assign(
          {},
          {
            CategoryID: 0,
            Title: '',
            Subtitle: '',
            PreviewImage: '',
            Image1: '',
            Seq: 0,
            Status: 'Y',
            Content: '',
            Content2: '',
            Content3: '',
            Content4: '',
            Content5: '',
            Content6: '',
            Content7: '',
            MenuTimeSet: 'N',
            MenuTimeStart: '',
            MenuTimeEnd: '',
          }
        );
      }
    },
    async UpdateEventPageData() {
      // 父選單
      this.event_page_data.CategoryID = 1;
      this.event_page_data.Content5 = '獨立銷售頁';
      // 開始時間 結束時間
      if (this.event_page_data.MenuTimeSet == 'N') {
        this.event_page_data.MenuTimeStart = null;
        this.event_page_data.MenuTimeEnd = null;
      }
      if (this.edit_mode == 'edit') {
        this.event_page_data.ID = this.event_page_data.MenuID;
        update_menu(this.event_page_data).then(() => {
          if (this.event_page_data.Image1 != null) {
            this.UpdateImage();
          } else {
            this.$router.push('/event_page');
            // recacheNews(this.event_page_data.MenuID).then(() => {
            //   this.$router.push('/news');
            // });
          }
        });
      } else {
        create_menu(this.event_page_data).then((res) => {
          this.event_page_data.MenuID = res.data.MenuID;
          this.event_page_data.ID = res.data.MenuID;
          if (this.event_page_data.Image1 != null) {
            this.UpdateImage();
          } else {
            this.$router.push('/event_page');
            // recacheNews(this.event_page_data.MenuID).then(() => {
            //   this.$router.push('/news');
            // });
          }
        });
      }
    },
    ChangeImage(val) {
      this.$set(this.event_page_data, 'PreviewImage', val.preview_url);
      this.$set(this.event_page_data, 'Image1', val.file);
    },
    UpdateImage() {
      update_menu_image(this.event_page_data.ID, this.event_page_data).then(
        () => {
          this.$router.push('/event_page');
          // recacheNews(this.event_page_data.MenuID).then(() => {
          //   this.$router.push('/news');
          // });
        }
      );
    },
  },
  created() {
    this.GetEventPageData();
  },
};
</script>
