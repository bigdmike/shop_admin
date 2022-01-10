<template src="./template.html"></template>

<script>
export default {
  name: "DeleteNewsDialog",
  data() {
    return {
      id: -1,
      dialog: false,
    };
  },
  methods: {
    Open({ NewsID }) {
      this.id = NewsID;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    async DeleteNews() {
      this.$emit("delete-news", this.id);
    },
  },
};
</script>