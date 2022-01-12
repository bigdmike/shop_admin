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
    Open({ QuestionID }) {
      this.id = QuestionID;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    async DeleteProduct() {
      this.$emit("delete-question", this.id);
    },
  },
};
</script>