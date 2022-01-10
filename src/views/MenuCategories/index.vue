<template src="./template.html"></template>

<script>
import FilterDialog from "@/components/MenuCategories/FilterDialog/index";
import ListShow from "@/components/MenuCategories/ListShow/index";
import category_components from "@/components/MenuCategories/category_components.js";
export default {
  name: "MenuCategories",
  mixins: [category_components],
  components: {
    FilterDialog,
    ListShow,
  },
  data() {
    return {
      filter_data: {
        status: "all",
      },
      menu_categories: null,
      key_word: "",
    };
  },
  methods: {
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open();
    },
    CheckSort() {
      let is_sort = true;
      this.menu_categories.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateCategorySort();
    },
  },
  created() {
    this.GetCategoriesData();
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