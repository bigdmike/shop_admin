<template src="./template.html"></template>
<script>
import FroalaEditor from '@/components/FroalaEditor/';
import Breadcrumb from '@/components/Breadcrumb/';
import MainImageCard from '@/components/MainImageCard/';
import DeleteDialog from '@/components/MainDeleteDialog';
import { recacheNews } from '@/api/prerender.js';
import {
  get_all_data,
  update_news,
  create_news,
  update_news_image,
  delete_news,
} from '@/api/news';
export default {
  name: 'NewsEdit',
  components: {
    FroalaEditor,
    Breadcrumb,
    MainImageCard,
    DeleteDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '所有文章',
          link: '/news',
        },
        {
          title: '文章編輯',
          link: '',
        },
      ],
      category_data: null,
      news_data: null,
      edit_mode: 'edit',
    };
  },
  methods: {
    GetNewsData() {
      get_all_data().then((res) => {
        this.category_data = res[0].data;
        let tmp_news_data = res[1].data.filter(
          (item) => item.NewsID == this.$route.params.id
        );
        if (tmp_news_data.length <= 0 || this.$route.params.id == 'new') {
          this.edit_mode = 'create';
          this.InitNewsData();
        } else {
          tmp_news_data = tmp_news_data[0];
          tmp_news_data.ID = tmp_news_data.NewsID;
          tmp_news_data.CategoryID = tmp_news_data.NewsCategoryID;
          tmp_news_data = this.$SetImageObj(
            tmp_news_data,
            tmp_news_data.Image1
          );
          this.news_data = tmp_news_data;
        }
      });
    },
    InitNewsData() {
      let tmp_news_data = {
        ID: 0,
        CategoryID: this.category_data[0].NewsCategoryID,
        Title: '',
        Content: '',
        Seq: 0,
      };
      tmp_news_data = this.$SetImageObj(tmp_news_data, '');
      this.news_data = tmp_news_data;
    },
    Validate() {
      let error_msg = '';
      if (this.news_data.Title == '') {
        error_msg += '- 請輸入文章標題 <br>';
      }
      if (this.news_data.Content == '') {
        error_msg += '- 請輸入文章內容 <br>';
      }
      if (this.news_data.NewsCategoryID == '') {
        error_msg += '- 請選擇文章分類 <br>';
      }

      if (error_msg == '') {
        return true;
      } else {
        error_msg = '無法儲存文章請修正以下問題：<br>' + error_msg;
        this.$store.commit('SetDialog', {
          title: '發生錯誤',
          content: error_msg,
          status: true,
        });
        return false;
      }
    },
    UpdateData() {
      let validate = this.Validate();
      if (validate) {
        if (this.edit_mode == 'edit') {
          update_news(this.news_data).then(() => {
            if (this.news_data.Image1 != null) {
              this.UpdateImage();
            } else {
              recacheNews(this.news_data.NewsID).then(() => {
                this.$router.push('/news');
              });
            }
          });
        } else {
          create_news(this.news_data).then((res) => {
            this.news_data.NewsID = res.data.NewsID;
            this.news_data.ID = res.data.NewsID;
            if (this.news_data.Image1 != null) {
              this.UpdateImage();
            } else {
              recacheNews(this.news_data.NewsID).then(() => {
                this.$router.push('/news');
              });
            }
          });
        }
      }
    },
    UpdateImage() {
      update_news_image(this.news_data.ID, this.news_data).then(() => {
        recacheNews(this.news_data.NewsID).then(() => {
          this.$router.push('/news');
        });
      });
    },
    CancelEdit() {
      this.$router.push('/news');
    },
    ChangeImage(val) {
      this.$set(this.news_data, 'PreviewImage', val.preview_url);
      this.$set(this.news_data, 'Image1', val.file);
    },
    OpenDeleteDialog() {
      this.$refs.DeleteDialog.Open(this.news_data.ID);
    },
    DeleteData(id) {
      this.$refs.DeleteDialog.Cancel();
      delete_news(id).then(() => {
        this.$router.push('/news');
      });
    },
  },
  created() {
    this.GetNewsData();
  },
};
</script>
