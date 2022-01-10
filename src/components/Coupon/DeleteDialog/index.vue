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
    Open({ CouponID }) {
      this.id = CouponID;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    async DeleteCoupon() {
      this.$emit("delete-coupon", this.id);
    },
  },
};
</script>