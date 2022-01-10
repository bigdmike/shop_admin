<template src="./template.html"></template>

<script>
export default {
  name: "DeleteCategoryDialog",
  data() {
    return {
      id: -1,
      dialog: false,
    };
  },
  methods: {
    Open({ MenuID }) {
      this.id = MenuID;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    async DeleteCategory() {
      this.$emit("delete-menu", this.id);
    },
  },
};
</script>