<template src="./template.html"></template>

<script>
import draggable from "vuedraggable";
import { update_goods } from "@/api/products";
import { get_stock } from "@/api/stock";
import { get_picture } from "@/api/products_image";
export default {
  name: "ProductListShow",
  props: {
    filter_data: {
      require: true,
      type: Object,
    },
    product_status_data: {
      require: true,
      type: Array,
    },
    product_category_data: {
      require: true,
      type: Array,
    },
    value: {
      require: true,
      type: Array,
    },
    key_word: {
      require: true,
      type: String,
    },
  },
  components: {
    draggable,
  },
  data() {
    return {
      product_sort_array: [],
      drag: false,
      headers: [
        { text: "", value: "" },
        {
          text: "商品名稱",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "產品分類", value: "category" },
        { text: "上架狀態", value: "status" },
        { text: "動作", value: "action" },
      ],
    };
  },
  methods: {
    ChangeSort() {
      this.product_sort_array = [];
      this.value.forEach((item) => {
        this.product_sort_array.push(item.sort);
      });
      this.$emit("input", this.filter_value);
      this.$emit("update-sort", this.filter_value);
    },
    GetCategoryName(item) {
      let text = this.product_category_data.filter(
        (category_item) => category_item.MenuID == item.MenuID
      );
      return text.length > 0 ? text[0].Title : "";
    },
    ChangeStatus(item) {
      console.log(item);
      let stocks = [];
      let images = [];
      let enable = false;
      get_stock(item.GoodsID).then((res) => {
        stocks = res.data;
        get_picture(item.GoodsID).then((res) => {
          images = res.data;
        });
      });
      if (stocks.length > 0 && images.length > 0) {
        enable = true;
      }
      if (item.Status == false) {
        enable = true;
      }
      if (enable) {
        let tmp_data = Object.assign({}, item);
        tmp_data.Status = tmp_data.Status ? "Y" : "N";
        tmp_data.ID = tmp_data.GoodsID;
        update_goods(tmp_data).then(() => {
          this.$emit("re-load");
        });
      } else {
        this.$emit("re-load");
        this.$store.commit("SetDialog", {
          title: "發生錯誤",
          content: "請至少新增一張圖片與一個產品選項後才能啟用商品",
          status: true,
        });
      }
    },
  },
  created() {
    this.product_sort_array = [];
    this.value.forEach((item) => {
      this.product_sort_array.push(item.sort);
    });
  },
  computed: {
    filter_value: {
      get() {
        {
          let data = JSON.parse(JSON.stringify(this.value));
          if (this.key_word != "") {
            data = data.filter(
              (item) => item.name.indexOf(this.key_word) != -1
            );
          }
          if (this.filter_data.status != "all") {
            data = data.filter(
              (item) => item.Status == this.filter_data.status
            );
          }
          if (this.filter_data.category != "all") {
            data = data.filter((item) => {
              return (
                item.Menu.filter(
                  (item) => item.MenuID == this.filter_data.category
                ).length > 0
              );
            });
          }
          return data;
        }
      },
      set(val) {
        let original = JSON.parse(JSON.stringify(val)).sort((a, b) => {
          return a.sort - b.sort;
        });
        let tmp_data = JSON.parse(JSON.stringify(this.value));

        original.forEach((item, item_index) => {
          tmp_data.forEach((data) => {
            data.id == val[item_index].id ? (data.sort = item.sort) : "";
          });
        });
        tmp_data.sort((a, b) => {
          return a.sort - b.sort;
        });
        this.$emit("input", tmp_data);
      },
    },
  },
  filters: {
    money_format(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style >
.opacity-0 {
  opacity: 0;
}
.page__grab-icon {
  cursor: grab;
}
</style>