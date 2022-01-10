<template src="./template.html"></template>

<script>
export default {
  name: "DeleteKolDialog",
  data() {
    return {
      id: -1,
      dialog: false,
    };
  },
  methods: {
    Open({ KolID }) {
      this.id = KolID;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    async DeleteKOL() {
      this.$emit("delete-kol", this.id);
    },
  },
};
</script>