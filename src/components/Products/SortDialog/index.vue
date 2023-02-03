<template src="./template.html"></template>
<script>
import { update_goods_sort } from '@/api/products';
export default {
  name: 'ProductFilterDialog',
  props: {
    product_list: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      dialog: false,
      GoodsID: -1,
      Seq: -1,
    };
  },
  methods: {
    Open(product_data) {
      this.dialog = true;
      this.GoodsID = product_data.GoodsID;
      this.Seq = product_data.Seq;
    },
    Close() {
      this.dialog = false;
      this.GoodsID = -1;
      this.Seq = -1;
    },
    async UpdateProductSort(data) {
      let tmp_data = [];
      data.forEach((item, item_index) => {
        tmp_data.push({
          ID: item.GoodsID,
          Seq: item_index + 1,
        });
      });

      update_goods_sort(tmp_data).then(() => {
        this.$emit('get-data-action');
        this.Close();
      });
    },
    UpdateSort() {
      let product_list = JSON.parse(JSON.stringify(this.product_list));
      product_list.forEach((item, item_index) => {
        item.GoodsID == this.GoodsID ? product_list.splice(item_index, 1) : '';
      });

      product_list.splice(this.Seq - 1, 0, {
        GoodsID: this.GoodsID,
        Seq: this.Seq,
      });
      this.UpdateProductSort(product_list);
    },
  },
};
</script>
