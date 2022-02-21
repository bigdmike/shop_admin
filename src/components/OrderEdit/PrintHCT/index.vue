<template src="./template.html"></template>

<script>
import Vue from "vue";
import Print from "vue-print-nb";
Vue.use(Print);
export default {
  name: "HCTPrint",
  props: {
    image: {
      require: true,
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    Print() {
      this.$refs.PrintBtn.click();
    },
  },
  mounted() {
    console.log(this.$refs.PrintBtn);
  },
};
</script>

<style lang="scss">
#OrderPrint {
  position: absolute;
  top: -2339px;
  right: -3654px;
}
#HCTPrintArea {
  width: 377.95275591px;
  height: 566.92913386px;
  img {
    width: 377.95275591px;
    display: block;
  }
  @page {
    size: 10cm 15cm;
    // margin: 27mm 16mm 27mm 16mm;
  }
}
</style>