<template src="./template.html"></template>

<script>
export default {
  name: 'ProductsGridShow',
  props: {
    filter_data: {
      require: true,
      type: Object,
    },
    value: {
      require: true,
      type: Array,
    },
    key_word: {
      require: true,
      type: String,
    },
  },
  computed: {
    // 過濾搜尋與篩選條件的商品資料
    filter_product_data() {
      let data = JSON.parse(JSON.stringify(this.value));
      if (this.key_word != '') {
        data = data.filter((item) => item.Title.indexOf(this.key_word) != -1);
      }
      if (this.filter_data.status != 'all') {
        data = data.filter((item) => item.Status == this.filter_data.status);
      }
      if (this.filter_data.category != 'all') {
        data = data.filter(
          (item) =>
            item.Menu.filter((menu) => menu.MenuID == this.filter_data.category)
              .length > 0
        );
      }
      return data;
    },
  },
};
</script>
