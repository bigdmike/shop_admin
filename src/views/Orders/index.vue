<template src="./template.html"></template>

<script>
import FilterDialog from '@/components/Orders/FilterDialog/index';
import ListShow from '@/components/Orders/ListShow/index';
import { GetOrderList } from '@/api/order.js';
export default {
  name: 'Products',
  components: {
    FilterDialog,
    ListShow,
  },
  data() {
    return {
      filter_data: {
        status: 'all',
        member_id: -1,
        data_per_page: 10,
      },
      order_status_data: [
        {
          label: '全部',
          value: 'all',
        },
        {
          label: '尚未付款',
          value: 'W',
        },
        {
          label: '已付款',
          value: 'P',
        },
        {
          label: '理貨中',
          value: 'T',
        },
        {
          label: '已出貨',
          value: 'S',
        },
        {
          label: '已送達',
          value: 'A',
        },
        {
          label: '已完成',
          value: 'F',
        },
        {
          label: '已取消',
          value: 'C',
        },
      ],
      order_data: [],
      key_word: '',
      show_type: 'list',
      shipping_list: [],
    };
  },
  methods: {
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open();
    },
    async GetOrders() {
      GetOrderList(-1, -1, 'all', -1).then((res) => {
        this.shipping_list = res[1].data;
        res[0].data.List = res[0].data.List.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        this.order_data = res[0].data.List;
      });
    },
  },
  created() {
    this.GetOrders();
  },
  computed: {},
};
</script>

<style>
.searchbar .filter_btn {
  height: 40px !important;
  border-radius: 5px 0 0 5px;
  border-right: 0px;
  border-color: #888;
}
.searchbar .searchtext .v-input__control .v-input__slot {
  border-radius: 0px 5px 5px 0px;
}
.searchbar .display_btn {
  height: 40px !important;
}
.opacity-0 {
  opacity: 0;
}
</style>
