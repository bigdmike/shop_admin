<template src="./template.html"></template>
<script>
export default {
  name: "OrderFilterDialog",
  props: {
    value: {
      require: true,
      type: Object,
    },
    order_status_data: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      dialog: false,
      status: "all",
      payment: "all",
    };
  },
  methods: {
    Open() {
      this.dialog = true;
      this.status = this.value.status;
    },
    ChangeValue() {
      this.$emit("input", { status: this.status });
      this.dialog = false;
    },
  },
};
</script>