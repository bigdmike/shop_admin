import {
  getMenuAndCategory,
  create_menu,
  update_menu,
  delete_menu,
  update_menu_sort,
} from '@/api/product_menu';

import MenuDeleteDialog from '@/components/ProductMenu/DeleteMenuDialog/';
import MenuCreateDialog from '@/components/ProductMenu/MenuCreateDialog/';
import MenuEditDialog from '@/components/ProductMenu/MenuEditDialog/';
export default {
  components: {
    MenuDeleteDialog,
    MenuCreateDialog,
    MenuEditDialog,
  },
  methods: {
    OpenCreateMenuDialog() {
      this.$refs.MenuCreateDialog.Open();
    },
    OpenEditMenuDialog(item) {
      this.$refs.MenuEditDialog.Open(item);
    },
    OpenDeleteMenuDialog(item) {
      this.$refs.MenuDeleteDialog.Open(item);
    },

    async GetMenuData() {
      getMenuAndCategory().then((res) => {
        console.log(res);
        this.category_data = res[0].data;
        this.category_data.splice(0, 0, {
          MenuCategoryID: 'all',
          Title: '全部目錄',
        });
        this.menu_data = res[1].data;
        this.CheckSort();
      });
    },
    async SendCreateMenuData(category_item) {
      create_menu(category_item).then(() => {
        this.GetMenuData();
        this.$refs.MenuCreateDialog.Cancel();
      });
    },
    async SendUpdateMenuData(category_item) {
      update_menu(category_item).then(() => {
        this.GetMenuData();
        this.$refs.MenuEditDialog.Cancel();
      });
    },
    async SendDeleteMenuData(id) {
      delete_menu(id).then((res) => {
        if (res.code == 200) {
          this.GetMenuData();
          this.$refs.MenuDeleteDialog.Cancel();
        }
      });
    },
    async UpdateMenuSort() {
      let data = [];
      this.menu_data.forEach((item, item_index) => {
        data.push({
          ID: item.MenuID,
          Seq: item_index + 1,
        });
      });
      update_menu_sort(data).then((res) => {
        if (res.code == 200) {
          this.GetMenuData();
        }
      });
    },
  },
};
