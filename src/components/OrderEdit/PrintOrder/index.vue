<template src="./template.html"></template>

<script>
import Vue from 'vue';
import Print from 'vue-print-nb';
Vue.use(Print);
export default {
  name: 'OrderPrint',
  props: {
    order_data: {
      require: true,
      type: Object,
    },
    zip_code: {
      require: true,
      type: Array,
    },
    products: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    Print() {
      this.$refs.PrintBtn.click();
    },
    GetZipCity(id) {
      return this.zip_code.filter((item) => item.ZipCode == id)[0];
    },
    GetStock(shopcart_item) {
      if (shopcart_item.ProductData.IsCustom == 'Y') {
        const id_list = shopcart_item.CustomSpecID.split(',');
        console.log(
          shopcart_item.ProductData.CustomSpecList.filter(
            (item) => id_list.indexOf(item.CustomSpecID) != -1
          )
        );
        return shopcart_item.ProductData.CustomSpecList.filter(
          (item) => id_list.indexOf(item.CustomSpecID) != -1
        );
      } else {
        console.log(
          shopcart_item.ProductData.IsCustom,
          shopcart_item.ProductData.Stock,
          shopcart_item.ColorID,
          shopcart_item.SizeID
        );
        return shopcart_item.ProductData.Stock.filter((item) => {
          return (
            item.ColorID == shopcart_item.ColorID &&
            item.SizeID == shopcart_item.SizeID
          );
        })[0];
      }
    },
  },
  filters: {
    money_format(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
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
