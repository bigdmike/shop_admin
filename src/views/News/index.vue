<template src="./template.html"></template>

<script>
import { get_all_data, update_news_sort, delete_news } from '@/api/news';
import MainDragList from '@/components/MainDragList/index';
import Breadcrumb from '@/components/Breadcrumb/';
import DeleteDialog from '@/components/MainDeleteDialog';
export default {
  name: 'NewsCover',
  components: {
    Breadcrumb,
    DeleteDialog,
    MainDragList,
  },
  data() {
    return {
      drag: false,
      options: {
        action: [
          {
            title: '刪除',
            class: 'error',
            action: 'delete-action',
          },
        ],
      },
      headers: [
        {
          text: '文章標題',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '建立時間', value: 'created_at' },
        { text: '動作', value: 'action' },
      ],
      breadcrumb_data: [
        {
          title: '頁面編輯',
          link: '',
        },
        {
          title: '最新消息',
          link: '',
        },
      ],
      news_categories: [],
      news_data: [],
    };
  },
  methods: {
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id);
    },
    CheckSort() {
      let is_sort = true;
      this.news_data.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? '' : (is_sort = false);
      });
      is_sort ? '' : this.SortData();
    },
    GetData() {
      get_all_data().then((res) => {
        this.news_categories = res[0].data;
        res[1].data.forEach((item, item_index) => {
          res[1].data[item_index].TableTitle = item.Title;
        });
        this.news_data = res[1].data;
        this.CheckSort();
      });
    },
    SortData(data) {
      let tmp_data = [];
      data.forEach((item, item_index) => {
        tmp_data.push({
          ID: item.NewsID,
          Seq: item_index + 1,
        });
      });
      update_news_sort(tmp_data).then((res) => {
        if (res.code == 200) {
          this.GetData();
        }
      });
    },
    DeleteData(id) {
      this.$refs.DeleteDialog.Cancel();
      delete_news(id).then(() => {
        this.GetData();
      });
    },
  },
  created() {
    this.GetData();
  },
};
</script>
