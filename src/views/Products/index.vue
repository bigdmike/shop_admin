<template src="./template.html"></template>

<script>
import FilterDialog from '@/components/Products/FilterDialog/index';
import DeleteDialog from '@/components/MainDeleteDialog';
import GridShow from '@/components/Products/GridShow/index';
import MainDragList from '@/components/MainDragList/index';
import OptionDialog from '@/components/Products/OptionDialog/index';
import ImageEditDialog from '@/components/Products/ImageEditDialog/index.vue';
import Breadcrumb from '@/components/Breadcrumb/';
import SortDialog from '@/components/Products/SortDialog/index.vue';
import {
  getGoodsAndCategory,
  delete_goods,
  update_goods_sort,
} from '@/api/products';
export default {
  name: 'Products',
  components: {
    FilterDialog,
    DeleteDialog,
    GridShow,
    OptionDialog,
    Breadcrumb,
    ImageEditDialog,
    MainDragList,
    SortDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '商品管理',
          link: '',
        },
      ],
      filter_data: {
        status: 'all',
        category: 'all',
      },
      product_status_data: [
        {
          label: '全部',
          value: 'all',
        },
        {
          label: '已隱藏',
          value: 'N',
        },
        {
          label: '已發布',
          value: 'Y',
        },
      ],
      product_category_data: [],
      product_data: null,
      key_word: '',
      show_type: 'list',
      options: {
        action: [
          {
            title: '排序',
            class: 'blue-grey white--text mr-2',
            action: 'open-sort-action',
          },
          {
            title: '圖片',
            class: 'primary mr-2',
            action: 'image-action',
          },
          {
            title: '庫存',
            class: 'success mr-2',
            action: 'stock-action',
          },
          {
            title: '刪除',
            class: 'error',
            action: 'delete-action',
          },
        ],
        status: [
          {
            title: '已啟用',
            class: 'success',
            condition: 'Y',
          },
          {
            title: '已停用',
            class: '',
            condition: 'N',
          },
        ],
      },
      headers: [
        { text: '商品縮圖', value: 'TableImage' },
        {
          text: '商品名稱',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        {
          text: '商品庫存',
          align: 'start',
          sortable: false,
          value: 'StockCount',
        },
        { text: '上架時間', value: 'created_at' },
        { text: '上架狀態', value: 'Status' },
        { text: '動作', value: 'action' },
      ],
    };
  },
  methods: {
    OpenSortDialog(product) {
      this.$refs.SortDialog.Open(product);
    },
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open();
    },
    OpenDeleteDialog(item) {
      this.$refs.DeleteDialog.Open(item.GoodsID);
    },
    ChangeShowType() {
      this.show_type == 'list'
        ? (this.show_type = 'grid')
        : (this.show_type = 'list');
    },
    OpenStockDialog(id) {
      this.$refs.OptionDialog.Open(id);
    },
    OpenImageDialog(item) {
      this.$refs.ImageEditDialog.Open(item);
    },
    GetProductData() {
      getGoodsAndCategory().then((res) => {
        this.product_category_data = res[0].data;
        res[1].data = res[1].data.filter((item) => item.deleted_at == null);
        res[1].data.forEach((item, item_index) => {
          res[1].data[item_index].TableTitle = item.Title;
          res[1].data[item_index].TableImage = item.Image1;
          let stock_count = 0;
          item.Stock.forEach((stock) => {
            stock_count += parseInt(stock.Stock);
          });
          res[1].data[item_index].StockCount = stock_count;
        });
        this.product_data = res[1].data;
        // StockCount
      });
    },
    CheckSort() {
      let is_sort = true;
      this.product_data.forEach((item, item_index) => {
        item.position == item_index + 1 ? '' : (is_sort = false);
      });
      is_sort ? '' : this.UpdateProductSort();
    },
    async UpdateProductSort(data) {
      let tmp_data = [];
      data.forEach((item, item_index) => {
        tmp_data.push({
          ID: item.GoodsID,
          Seq: item_index + 1,
        });
      });

      update_goods_sort(tmp_data).then(() => {
        this.GetProductData();
      });
      //
    },
    async SendDeleteData(id) {
      delete_goods(id).then(() => {
        this.$refs.DeleteDialog.Cancel();
        this.GetProductData();
      });
    },
  },
  created() {
    this.GetProductData();
  },
  computed: {
    filter_product_data() {
      let product_data = JSON.parse(JSON.stringify(this.product_data));
      if (this.key_word != '') {
        product_data = product_data.filter((item) => {
          return item.Title.indexOf(this.key_word) != -1;
        });
      }
      if (this.filter_data.status != 'all') {
        product_data = product_data.filter((item) => {
          return item.Status == this.filter_data.status;
        });
      }
      if (this.filter_data.category != 'all') {
        product_data = product_data.filter((item) => {
          return (
            item.Menu.filter((menu) => menu.MenuID == this.filter_data.category)
              .length > 0
          );
        });
      }

      return product_data;
    },
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
