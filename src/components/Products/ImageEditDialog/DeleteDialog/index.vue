<template src="./template.html"></template>

<script>
export default {
  name: "DeleteProductDialog",
  data() {
    return {
      id: -1,
      dialog: false,
    };
  },
  methods: {
    Open(id) {
      this.id = id;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    DeleteProduct() {
      this.$emit("delete-image", this.id);
    },
  },
};
</script>