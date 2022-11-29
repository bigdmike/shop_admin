<template src="./template.html"></template>

<script>
import {
  get_categories,
  update_categories_sort,
  create_categories,
  update_categories,
  delete_categories,
} from '@/api/news';
import Breadcrumb from '@/components/Breadcrumb/';
import EditDialog from '@/components/NewsCategory/CategoryEditDialog/';
import MainDragList from '@/components/MainDragList/index';
import DeleteDialog from '@/components/MainDeleteDialog/';
export default {
  name: 'NewsCategory',
  components: {
    Breadcrumb,
    EditDialog,
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
          text: '分類名稱',
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
          title: '文章分類',
          link: '',
        },
      ],
      news_categories: [],
    };
  },
  methods: {
    CheckSort() {
      let is_sort = true;
      this.news_categories.forEach((item, item_index) => {
        item.Seq == item_index + 2 ? '' : (is_sort = false);
      });
      is_sort ? '' : this.SortData();
    },
    OpenCreateDialog() {
      const tmp_data = {
        NewsCategoryID: 0,
        ID: 0,
        Title: '',
        Seq: 0,
      };
      this.$refs.EditDialog.Open(tmp_data);
    },
    OpenEditDialog(item) {
      this.$refs.EditDialog.Open(item);
    },
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id);
    },
    GetData() {
      get_categories().then((res) => {
        res.data.forEach((item, item_index) => {
          res.data[item_index].TableTitle = item.Title;
          res.data[item_index].ID = item.NewsCategoryID;
        });
        this.news_categories = res.data;
        this.CheckSort();
      });
    },
    CreateData(category_item) {
      create_categories(category_item).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
    UpdateData(category_item) {
      update_categories(category_item).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
    SortData(data) {
      let tmp_data = [];
      data.forEach((item, item_index) => {
        tmp_data.push({
          ID: item.NewsCategoryID,
          Seq: item_index + 2,
        });
      });
      update_categories_sort(tmp_data).then((res) => {
        if (res.code == 200) {
          this.GetData();
        }
      });
    },
    DeleteData(id) {
      delete_categories(id).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.DeleteDialog.Cancel();
        }
      });
    },
  },
  created() {
    this.GetData();
  },
};
</script>
