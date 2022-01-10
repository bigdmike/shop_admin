<template src="./template.html"></template>

<script>
export default {
  name: "DeleteProductDialog",
  data() {
    return {
      option: null,
      dialog: false,
    };
  },
  methods: {
    Open(item) {
      this.option = item;
      this.dialog = true;
    },
    Cancel() {
      this.option = null;
      this.dialog = false;
    },
  },
};
</script>