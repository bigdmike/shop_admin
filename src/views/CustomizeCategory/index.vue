<template src="./template.html"></template>

<script>
import {
  get_category,
  create_category,
  delete_category,
  update_category_sort,
} from '@/api/product_customize';
import MainDragList from '@/components/MainDragList/';
import DeleteDialog from '@/components/MainDeleteDialog/';
import Breadcrumb from '@/components/Breadcrumb/';
import CategoryEditDialog from '@/components/Customize/CategoryEditDialog/index.vue';
export default {
  name: 'CustomizeCategory',
  components: {
    Breadcrumb,
    MainDragList,
    DeleteDialog,
    CategoryEditDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '客製化選項類型管理',
          link: '/customize_product',
        },
      ],
      filter_data: {
        status: 'all',
        category: 'all',
      },
      category_data: null,
      key_word: '',
      options: {
        action: [
          {
            title: '刪除',
            class: 'error',
            action: 'delete-action',
          },
        ],
        status: [
          {
            title: '顯示',
            class: 'success',
            condition: 'Y',
          },
          {
            title: '隱藏',
            class: '',
            condition: 'N',
          },
        ],
      },
      headers: [
        {
          text: '選項類型',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '上架時間', value: 'created_at' },
        { text: '顯示狀態', value: 'Status' },
        { text: '動作', value: 'action' },
      ],
    };
  },
  methods: {
    OpenCreateDialog() {
      this.$refs.CategoryEditDialog.Open(null, 'create');
    },
    OpenDeleteDialog(item) {
      this.$refs.DeleteDialog.Open(item);
    },
    CheckSort() {
      let is_sort = true;
      this.menu_data.forEach((item, item_index) => {
        item.Seq == item_index + 2 ? '' : (is_sort = false);
      });
      is_sort ? '' : this.SortData(this.menu_data);
    },
    GetData() {
      get_category(this.$route.params.id).then((res) => {
        res.data.forEach((item) => {
          item.TableTitle = item.Title;
        });
        this.category_data = res.data;
        this.breadcrumb_data.push({
          title: this.$route.params.name,
          link: '',
        });
        this.breadcrumb_data.push({
          title: '選項分類',
          link: `/customize_category/${this.$route.params.id}/${this.$route.params.name}`,
        });
      });
    },
    CreateData(category_item) {
      console.log(category_item);
      create_category(category_item).then(() => {
        this.GetData();
        this.$refs.CategoryEditDialog.Cancel();
      });
    },
    DeleteData(item) {
      delete_category(item.SpecCategoryID).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.DeleteDialog.Cancel();
        }
      });
    },
    SortData(tmp_data) {
      let data = [];
      tmp_data.forEach((item, item_index) => {
        data.push({
          ID: item.SpecCategoryID,
          Seq: item_index + 2,
        });
      });
      update_category_sort(data).then((res) => {
        if (res.code == 200) {
          this.GetData();
        }
      });
    },
  },
  computed: {
    filter_menu_data() {
      let tmp_menu_data = JSON.parse(JSON.stringify(this.category_data));
      if (this.filter_data.status != 'all') {
        tmp_menu_data = tmp_menu_data.filter(
          (item) => item.Status == this.filter_data.status
        );
      }
      return tmp_menu_data;
    },
  },
  created() {
    this.GetData();
  },
};
</script>

<style>
.searchbar .filter_btn {
  height: 40px !important;
  border-radius: 5px 0 0 5px;
  border-right: 0px;
  border-color: #888;
}
.searchbar .searchtext .v-input__control .v-input__slot {
  border-radius: 0px 5px 5px 0px;
}
.searchbar .display_btn {
  height: 40px !important;
}
.opacity-0 {
  opacity: 0;
}
</style>
