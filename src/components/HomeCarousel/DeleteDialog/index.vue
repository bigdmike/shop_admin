<template src="./template.html"></template>

<script>
export default {
  name: "DeleteProductDialog",
  data() {
    return {
      delete_item: null,
      dialog: false,
    };
  },
  methods: {
    Open(item) {
      this.delete_item = item;
      this.dialog = true;
    },
    Cancel() {
      this.delete_item = null;
      this.dialog = false;
    },
    async DeleteProduct() {
      this.$emit("delete-carousel", this.delete_item);
    },
  },
};
</script>