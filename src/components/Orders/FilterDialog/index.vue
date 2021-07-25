<template src="./template.html"></template>
<script>
export default {
  name: "OrderFilterDialog",
  props: {
    value: {
      require: true,
      type: Object
    },
    order_status_data: {
      require: true,
      type: Array
    },
    order_payment_data: {
      require: true,
      type: Array
    }
  },
  data() {
    return {
      dialog: false,
      status: "all",
      payment: "all"
    }
  },
  methods: {
    Open() {
      this.dialog = true
      this.status = this.value.status
      this.payment = this.value.payment
    },
    ChangeValue() {
      this.$emit("input", { status: this.status, payment: this.payment })
      this.dialog = false
    }
  }
}
</script>