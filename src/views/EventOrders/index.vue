<template src="./template.html"></template>

<script>
import MainList from '@/components/MainList/';
import Breadcrumb from '@/components/Breadcrumb/';
import { GetOrderList } from '@/api/order.js';
export default {
  name: 'Products',
  components: {
    MainList,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '訂單管理',
          link: '',
        },
        {
          title: '分潤訂單統計',
          link: '',
        },
      ],
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
      options: {
        action: [],
        status: [],
      },
      headers: [
        {
          text: '分潤標籤',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '訂單數量', value: 'Count' },
        { text: '金額統計', value: 'Price' },
      ],
      order_data: [],
      key_word: '',
    };
  },
  methods: {
    async GetOrders() {
      // OrderMemo,Count,Price
      GetOrderList(-1, -1, 'all', -1).then((res) => {
        let memo_list = [];
        res[0].data.List.forEach((order) => {
          if (order.OrderMemo != '' && order.OrderMemo != null) {
            const memo_index = memo_list.indexOf(order.OrderMemo);
            if (memo_index == -1) {
              memo_list.push({
                TableTitle: order.OrderMemo,
                Count: 1,
                Price: parseInt(order.Price),
              });
            } else {
              memo_list[memo_index].Count += 1;
              memo_list[memo_index].Price += parseInt(order.Price);
            }
          }
        });
        memo_list.forEach((item) => {
          let val = (item.Price / 1).toFixed(0).replace('.', ',');
          item.Price =
            'NT$ ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        });
        this.order_data = memo_list;
      });
    },
  },
  computed: {
    filter_order_data() {
      if (this.key_word != '') {
        return this.order_data.filter((item) => {
          return item.TableTitle.indexOf(this.key_word) != -1;
        });
      }
      return this.order_data;
    },
  },
  created() {
    this.GetOrders();
  },
};
</script>

<style>
.searchbar .filter_btn {
  height: 40px !important;
  border-radius: 5px 0px 0px 5px;
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
