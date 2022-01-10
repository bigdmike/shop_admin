<template src="./template.html"></template>

<script>
export default {
  name: "DeleteMascotDialog",
  data() {
    return {
      id: -1,
      dialog: false,
    };
  },
  methods: {
    Open({ MascotID }) {
      this.id = MascotID;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    async DeleteMascot() {
      this.$emit("delete-mascot", this.id);
    },
  },
};
</script>