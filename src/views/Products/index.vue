<template src="./template.html"></template>

<script>
import FilterDialog from "@/components/Products/FilterDialog/index";
import DeleteDialog from "@/components/Products/DeleteDialog/index";
import GridShow from "@/components/Products/GridShow/index";
import ListShow from "@/components/Products/ListShow/index";
import OptionDialog from "@/components/Products/OptionDialog/index";
import ImageEditDialog from "@/components/Products/ImageEditDialog/index.vue";
import {
  getGoodsAndCategory,
  // create_good,
  // update_good,
  delete_goods,
  // update_good_sort,
  // update_good_image,
  update_goods_sort,
} from "@/api/products";
export default {
  name: "Products",
  components: {
    FilterDialog,
    DeleteDialog,
    GridShow,
    ListShow,
    OptionDialog,
    ImageEditDialog,
  },
  data() {
    return {
      filter_data: {
        status: "all",
        category: "all",
      },
      product_status_data: [
        {
          label: "全部",
          value: "all",
        },
        {
          label: "未上架",
          value: "N",
        },
        {
          label: "已上架",
          value: "Y",
        },
      ],
      product_category_data: [],
      product_data: null,
      key_word: "",
      show_type: "list",
    };
  },
  methods: {
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open();
    },
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id);
    },
    ChangeShowType() {
      this.show_type == "list"
        ? (this.show_type = "grid")
        : (this.show_type = "list");
    },
    OpenStockDialog(id) {
      this.$refs.OptionDialog.Open(id);
    },
    OpenImageDialog(id) {
      this.$refs.ImageEditDialog.Open(id);
    },
    async GetProductData() {
      getGoodsAndCategory().then((res) => {
        this.product_category_data = res[0].data;
        res[1].data.forEach((item) => {
          item.Status = item.Status == "Y" ? true : false;
        });
        this.product_data = res[1].data;
      });
    },
    CheckSort() {
      let is_sort = true;
      this.product_data.forEach((item, item_index) => {
        item.position == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateProductSort();
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
  computed: {},
};
</script>

<style >
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