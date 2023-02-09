<template src="./template.html"></template>

<script>
import {
  getOption,
  create_spec,
  delete_spec,
  update_spec,
  update_spec_sort,
  update_category,
} from '@/api/product_customize';
import MainDragList from '@/components/MainDragList/';
import DeleteDialog from '@/components/MainDeleteDialog/';
import Breadcrumb from '@/components/Breadcrumb/';
import CategoryEditDialog from '@/components/Customize/CategoryEditDialog/index.vue';
export default {
  name: 'CustomizeSpec',
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
          title: '客製化選項類型',
          link: '/customize_category',
        },
        {
          title: '客製化選項類型管理',
          link: '',
        },
      ],
      category_data: null,
      spec_data: null,
      status_list: [
        {
          label: '已啟用',
          value: 'Y',
        },
        {
          label: '已停用',
          value: 'N',
        },
      ],
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
    OpenEditDialog(item) {
      this.$refs.CategoryEditDialog.Open(item, 'edit');
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
      getOption().then((res) => {
        this.category_data = res[0].data.filter(
          (item) => item.SpecCategoryID == this.$route.params.id
        )[0];
        this.category_data.ID = this.category_data.SpecCategoryID;
        res[1] = res[1].data.filter(
          (item) => item.SpecCategoryID == this.$route.params.id
        );
        res[1].forEach((item) => {
          item.TableTitle = item.Title;
        });
        this.spec_data = res[1];
      });
    },
    UpdateCategoryData() {
      update_category(this.category_data).then(() => {
        this.GetData();
        this.$refs.CategoryEditDialog.Cancel();
      });
    },
    CreateData(category_item) {
      category_item.SpecCategoryID = this.$route.params.id;
      create_spec(category_item).then(() => {
        this.GetData();
        this.$refs.CategoryEditDialog.Cancel();
      });
    },
    UpdateData(item) {
      item.SpecCategoryID = this.$route.params.id;
      update_spec(item).then(() => {
        this.GetData();
        this.$refs.CategoryEditDialog.Cancel();
      });
    },
    DeleteData(item) {
      delete_spec(item.CustomSpecID).then((res) => {
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
          ID: item.CustomSpecID,
          Seq: item_index + 2,
        });
      });
      update_spec_sort(data).then((res) => {
        if (res.code == 200) {
          this.GetData();
        }
      });
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
