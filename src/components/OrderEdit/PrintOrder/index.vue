<template src="./template.html"></template>

<script>
import Vue from "vue"
import Print from 'vue-print-nb'
Vue.use(Print);
export default {
  name: "OrderPrint",
  props: {
    order_data: {
      require: true,
      type: Object
    }
  },
  data() { return {} },
  methods: {
    Print() {
      this.$refs.PrintBtn.click()
    }
  },

  filters: {
    money_format(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
}
</script>

<style lang="scss">
#OrderPrint {
  position: absolute;
  top: -2339px;
  right: -3654px;
}
#PrintArea {
  .header {
    width: 2339px;
    text-align: center;

    img {
      widows: 150px;
      margin: 0 auto;
    }
  }
  @page {
    size: 7in 9.25in;
    margin: 27mm 16mm 27mm 16mm;
  }
}
</style>