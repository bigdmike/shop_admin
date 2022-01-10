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
    Open({ MenuCategoryID }) {
      this.id = MenuCategoryID;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    async DeleteCategory() {
      this.$emit("delete-category", this.id);
    },
  },
};
</script>