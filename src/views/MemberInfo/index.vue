<template src="./template.html"></template>

<script>
import { get_member } from '@/api/member';
import Breadcrumb from '@/components/Breadcrumb/';
import MainList from '@/components/MainList/';
export default {
  name: 'Members',
  components: {
    Breadcrumb,
    MainList,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '會員管理',
          link: '/members',
        },
        {
          title: '會員資訊',
          link: '',
        },
      ],
      options: {
        status: [
          {
            title: '尚未付款',
            class: '',
            condition: 'W',
          },
          {
            title: '完成付款',
            class: 'blue lighten-1 white--text',
            condition: 'P',
          },
          {
            title: '理貨中',
            class: 'yellow darken-1 white--text',
            condition: 'T',
          },
          {
            title: '已出貨',
            class: 'orange darken-3 white--text',
            condition: 'S',
          },
          {
            title: '已送達',
            class: 'deep-orange darken-3 white--text',
            condition: 'A',
          },
          {
            title: '已完成',
            class: 'green white--text',
            condition: 'F',
          },
          {
            title: '已完成',
            class: 'black white--text',
            condition: 'C',
          },
        ],
      },
      headers: [
        {
          text: '訂單編號',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '建立時間', value: 'created_at' },
        { text: '運送方式', value: 'ShippingID' },
        { text: '訂單狀態', value: 'Status' },
        { text: '總金額', value: 'TotalPrice' },
      ],
      member_data: null,
      trade_data: null,
      shipping_data: null,
    };
  },
  methods: {
    GetData() {
      get_member().then((res) => {
        let trade_data = res[1].data.List;
        let member_data = res[0].data.List.filter(
          (item) => item.MemberID == this.$route.params.id
        );
        if (member_data.length <= 0) {
          this.$router.push('/members');
        } else {
          this.shipping_data = res[2].data;
          this.member_data = member_data[0];
          trade_data.forEach((item, item_index) => {
            trade_data[item_index].TableTitle = '#' + item.TradeID;
            trade_data[item_index].ShippingID = this.GetShippingTitle(
              item.ShippingID
            );
            trade_data[item_index].TotalPrice = (
              trade_data[item_index].Price / 1
            )
              .toFixed(0)
              .replace('.', ',');
            trade_data[item_index].TotalPrice = trade_data[
              item_index
            ].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          });
          this.trade_data = trade_data.filter(
            (item) => item.MemberID == this.member_data.MemberID
          );
        }
      });
    },
    GetShippingTitle(id) {
      const shipping_way = this.shipping_data.filter(
        (item) => item.ShippingID == id
      );
      return shipping_way.length > 0 ? shipping_way[0].Title : '查無配送方式';
    },
  },
  computed: {
    total_price() {
      if (this.trade_data == null) {
        return 0;
      }
      let total_price = 0;
      this.trade_data.forEach((item) => {
        total_price += parseInt(item.Price);
      });
      total_price = (total_price / 1).toFixed(0).replace('.', ',');
      total_price = total_price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return total_price;
    },
  },
  created() {
    this.GetData();
  },
};
</script>
