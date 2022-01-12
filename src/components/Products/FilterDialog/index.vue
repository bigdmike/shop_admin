<template src="./template.html"></template>
<script>
export default {
  name: "ProductFilterDialog",
  props: {
    value: {
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
  },
  data() {
    return {
      dialog: false,
      status: "all",
      category: "all",
    };
  },
  methods: {
    Open() {
      this.dialog = true;
      this.status = this.value.status;
      this.category = this.value.category;
    },
    GetCategory() {
      let tmp_data = this.product_category_data;
      if (tmp_data.filter((item) => item.MenuID == "all").length <= 0) {
        tmp_data.splice(0, 0, {
          MenuID: "all",
          Title: "全部",
        });
      }
      return tmp_data;
    },
    ChangeValue() {
      this.$emit("input", { status: this.status, category: this.category });
      this.dialog = false;
    },
  },
};
</script>