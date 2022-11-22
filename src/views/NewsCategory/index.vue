<template src="./template.html"></template>

<script>
import {
  get_categories,
  update_categories_sort,
  create_categories,
  update_categories,
  delete_categories,
} from '@/api/news';
import draggable from 'vuedraggable';
import Breadcrumb from '@/components/Breadcrumb/';
import EditDialog from '@/components/NewsCategory/CategoryEditDialog/';
import DeleteDialog from '@/components/MainDeleteDialog/';
export default {
  name: 'NewsCategory',
  components: {
    draggable,
    Breadcrumb,
    EditDialog,
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
        { text: '建立時間', value: 'create_time' },
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
        item.Seq == item_index + 1 ? '' : (is_sort = false);
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
    GetCategoryData() {
      get_categories().then((res) => {
        res.data.forEach((item, item_index) => {
          res.data[item_index].ID = item.NewsCategoryID;
        });
        this.news_categories = res.data;
        this.CheckSort();
      });
    },
    CreateData(category_item) {
      create_categories(category_item).then((res) => {
        if (res.code == 200) {
          this.GetCategoryData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
    UpdateData(category_item) {
      update_categories(category_item).then((res) => {
        if (res.code == 200) {
          this.GetCategoryData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
    SortData() {
      let data = [];
      this.news_categories.forEach((item, item_index) => {
        data.push({
          ID: item.NewsCategoryID,
          Seq: item_index + 1,
        });
      });
      update_categories_sort(data).then((res) => {
        if (res.code == 200) {
          this.GetCategoryData();
        }
      });
    },
    DeleteData(id) {
      delete_categories(id).then((res) => {
        if (res.code == 200) {
          this.GetCategoryData();
          this.$refs.DeleteDialog.Cancel();
        }
      });
    },
  },
  created() {
    this.GetCategoryData();
  },
};
</script>
