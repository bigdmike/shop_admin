<template src="./template.html"></template>

<script>
import draggable from 'vuedraggable';
import { ImageUrl, DataSort } from '@/common/filter.js';
export default {
  name: 'ProductsGridShow',
  props: {
    filter_data: {
      require: true,
      type: Object,
    },
    product_status_data: {
      require: true,
      type: Array,
    },
    product_category_data: {
      require: true,
      type: Array,
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
  components: {
    draggable,
  },
  data() {
    return {
      product_sort_array: [],
      drag: false,
    };
  },
  methods: {
    ConvertImage(image) {
      return ImageUrl(image);
    },
    ChangeSort(moved_log) {
      let tmp_data = JSON.parse(JSON.stringify(this.filter_product_data));
      this.$emit('update-sort', DataSort(moved_log, tmp_data));
    },
    GetCategoryName(item) {
      let text = this.product_category_data.filter(
        (category_item) => category_item.MenuID == item.MenuID
      );
      return text.length > 0 ? text[0].Title : '';
    },
  },
  created() {
    this.product_sort_array = [];
    this.value.forEach((item) => {
      this.product_sort_array.push(item.sort);
    });
  },
  computed: {
    filter_product_data: {
      get() {
        {
          let data = JSON.parse(JSON.stringify(this.value));
          if (this.key_word != '') {
            data = data.filter(
              (item) => item.Title.indexOf(this.key_word) != -1
            );
          }
          if (this.filter_data.status != 'all') {
            data = data.filter(
              (item) => item.Status == this.filter_data.status
            );
          }
          if (this.filter_data.category != 'all') {
            data = data.filter(
              (item) =>
                item.Menu.filter(
                  (menu) => menu.MenuID == this.filter_data.category
                ).length > 0
            );
          }
          return data;
        }
      },
      set(val) {
        let original = JSON.parse(JSON.stringify(val)).sort((a, b) => {
          return a.sort - b.sort;
        });
        let tmp_data = JSON.parse(JSON.stringify(this.value));

        original.forEach((item, item_index) => {
          tmp_data.forEach((data) => {
            data.id == val[item_index].id ? (data.sort = item.sort) : '';
          });
        });
        tmp_data.sort((a, b) => {
          return a.sort - b.sort;
        });
        this.$emit('input', tmp_data);
      },
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

<style>
.opacity-0 {
  opacity: 0;
}
</style>
