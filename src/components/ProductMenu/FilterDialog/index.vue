<template src="./template.html"></template>
<script>
export default {
  name: "CategoryFilterDialog",
  props: {
    value: {
      require: true,
      type: Object,
    },
    category_data: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      dialog: false,
      status: "all",
      category: "all",
      status_array: [
        {
          label: "全部",
          value: "all",
        },
        {
          label: "已啟用",
          value: "Y",
        },
        {
          label: "已停用",
          value: "N",
        },
      ],
    };
  },
  methods: {
    Open() {
      this.dialog = true;
      this.status = this.value.status;
    },
    ChangeValue() {
      this.$emit("input", { status: this.status, category: this.category });
      this.dialog = false;
    },
  },
};
</script>