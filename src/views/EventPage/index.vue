<template src="./template.html"></template>

<script>
import {
  getMenuAndCategory,
  create_menu,
  update_menu,
  delete_menu,
  update_menu_sort,
} from '@/api/product_menu';
import FilterDialog from '@/components/ProductMenu/FilterDialog/index';
import MainDragList from '@/components/MainDragList/';
import DeleteDialog from '@/components/MainDeleteDialog/';
import MenuEditDialog from '@/components/ProductMenu/MenuEditDialog/';
import Breadcrumb from '@/components/Breadcrumb/';
export default {
  name: 'EventPage',
  components: {
    FilterDialog,
    Breadcrumb,
    MainDragList,
    DeleteDialog,
    MenuEditDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '商品管理',
          link: '',
        },
        {
          title: '銷售頁管理',
          link: '',
        },
      ],
      filter_data: {
        status: 'all',
        category: 'all',
      },
      menu_data: null,
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
            title: '啟用',
            class: 'success',
            condition: 'Y',
          },
          {
            title: '停用',
            class: '',
            condition: 'N',
          },
        ],
      },
      headers: [
        {
          text: '頁面標題',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '開始時間', value: 'MenuTimeStart' },
        { text: '結束時間', value: 'MenuTimeEnd' },
        { text: '啟用狀態', value: 'Status' },
        { text: '動作', value: 'action' },
      ],
    };
  },
  methods: {
    OpenCreateDialog() {
      this.$refs.MenuEditDialog.Open(null, 'create');
    },
    OpenEditDialog(item) {
      this.$refs.MenuEditDialog.Open(item, 'edit');
    },
    OpenDeleteDialog(item) {
      this.$refs.DeleteDialog.Open(item);
    },
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open();
    },
    CheckSort() {
      let is_sort = true;
      this.menu_data.forEach((item, item_index) => {
        item.Seq == item_index + 2 ? '' : (is_sort = false);
      });
      is_sort ? '' : this.SortData(this.menu_data);
    },
    GetCategoryName() {
      return this.category_data.filter(
        (item) => item.MenuCategoryID == this.filter_data.category
      )[0].Title;
    },
    //
    GetData() {
      getMenuAndCategory().then((res) => {
        this.category_data = res[0].data;
        this.category_data.splice(0, 0, {
          MenuCategoryID: 'all',
          Title: '全部目錄',
        });
        res[1].data.forEach((item, item_index) => {
          res[1].data[item_index].TableTitle = item.Title;
          if (item.MenuID == 4 || item.MenuID == 5 || item.MenuID == 7) {
            res[1].data[item_index].TitleActionDisable = true;
            res[1].data[item_index]['delete-actionDisable'] = true;
          }
        });
        // 去除獨立銷售頁的分類
        this.menu_data = res[1].data.filter((item) => {
          return item.Content5 == '獨立銷售頁';
        });
        this.CheckSort();
      });
    },
    CreateData(category_item) {
      create_menu(category_item).then(() => {
        this.GetData();
        this.$refs.MenuEditDialog.Cancel();
      });
    },
    UpdateData(category_item) {
      update_menu(category_item).then(() => {
        this.GetData();
        this.$refs.MenuEditDialog.Cancel();
      });
    },
    DeleteData(item) {
      delete_menu(item.MenuID).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.DeleteDialog.Cancel();
        }
      });
    },
    SortData(tmp_data) {
      console.log(tmp_data);
      let data = [];
      tmp_data.forEach((item, item_index) => {
        data.push({
          ID: item.MenuID,
          Seq: item_index + 2,
        });
      });
      update_menu_sort(data).then((res) => {
        if (res.code == 200) {
          this.GetData();
        }
      });
    },
  },
  computed: {
    filter_menu_data() {
      let tmp_menu_data = JSON.parse(JSON.stringify(this.menu_data));
      if (this.filter_data.status != 'all') {
        tmp_menu_data = tmp_menu_data.filter(
          (item) => item.Status == this.filter_data.status
        );
      }
      if (this.filter_data.category != 'all') {
        tmp_menu_data = tmp_menu_data.filter(
          (item) => item.MenuCategoryID == this.filter_data.category
        );
      }
      if (this.key_word != '') {
        tmp_menu_data = tmp_menu_data.filter(
          (item) => item.Title.indexOf(this.key_word) != -1
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
