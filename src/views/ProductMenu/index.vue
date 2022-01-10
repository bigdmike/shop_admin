<template src="./template.html"></template>

<script>
import FilterDialog from "@/components/ProductMenu/FilterDialog/index";
import ListShow from "@/components/ProductMenu/ListShow/index";
import menu_components from "@/components/ProductMenu/menu_components.js";
export default {
  name: "ProductMenu",
  mixins: [menu_components],
  components: {
    FilterDialog,
    ListShow,
  },
  data() {
    return {
      filter_data: {
        status: "all",
        category: "all",
      },
      menu_data: null,
      category_data: null,
      key_word: "",
    };
  },
  methods: {
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open();
    },
    CheckSort() {
      let is_sort = true;
      this.menu_data.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateMenuSort();
    },
    GetCategoryName() {
      return this.category_data.filter(
        (item) => item.MenuCategoryID == this.filter_data.category
      )[0].Title;
    },
  },
  created() {
    this.GetMenuData();
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