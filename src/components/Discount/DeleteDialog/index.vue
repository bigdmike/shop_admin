<template src="./template.html"></template>

<script>
export default {
  name: "DeleteCouponDialog",
  data() {
    return {
      id: -1,
      dialog: false,
    };
  },
  methods: {
    Open({ DiscountID }) {
      this.id = DiscountID;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    async DeleteCoupon() {
      this.$emit("delete-discount", this.id);
    },
  },
};
</script>