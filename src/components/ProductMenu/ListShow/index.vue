<template src="./template.html"></template>

<script>
import draggable from "vuedraggable";
export default {
  name: "CategoryListShow",
  props: {
    filter_data: {
      require: true,
      type: Object,
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
          text: "分類名稱",
          align: "start",
          sortable: false,
          value: "Title",
        },
        { text: "所屬目錄", value: "category" },
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
      this.$emit("update-sort");
    },
    GetCategoryName(item) {
      let category = this.product_category_data.filter(
        (category_item) => category_item.MenuCategoryID == item.MenuCategoryID
      );
      return category.length > 0 ? category[0].Title : "";
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
              (item) => item.Title.indexOf(this.key_word) != -1
            );
          }
          if (this.filter_data.category != "all") {
            data = data.filter(
              (item) => item.MenuCategoryID == this.filter_data.category
            );
          }
          if (this.filter_data.status != "all") {
            data = data.filter(
              (item) => item.Status == this.filter_data.status
            );
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