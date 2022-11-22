<template src="./template.html"></template>

<script>
import { get_all_data, update_news_sort, delete_news } from '@/api/news';
import draggable from 'vuedraggable';
import Breadcrumb from '@/components/Breadcrumb/';
import DeleteDialog from '@/components/MainDeleteDialog';
export default {
  name: 'NewsCover',
  components: {
    draggable,
    Breadcrumb,
    DeleteDialog,
  },
  data() {
    return {
      drag: false,
      headers: [
        { text: '', value: '' },
        {
          text: '名稱',
          align: 'start',
          sortable: false,
          value: 'Title',
        },
        { text: '上架時間', value: 'create_time' },
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
    GetNewsData() {
      get_all_data().then((res) => {
        this.news_categories = res[0].data;
        this.news_data = res[1].data;
        this.CheckSort();
      });
    },
    CheckSort() {
      let is_sort = true;
      this.news_data.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? '' : (is_sort = false);
      });
      is_sort ? '' : this.ChangeSort();
    },
    ChangeSort() {
      let data = [];
      this.news_data.forEach((item, item_index) => {
        data.push({
          ID: item.NewsID,
          Seq: item_index + 1,
        });
      });
      update_news_sort(data).then((res) => {
        if (res.code == 200) {
          this.GetNewsData();
        }
      });
    },
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id);
    },
    DeleteData(id) {
      this.$refs.DeleteDialog.Cancel();
      delete_news(id).then(() => {
        this.GetNewsData();
      });
    },
  },
  created() {
    this.GetNewsData();
  },
};
</script>
