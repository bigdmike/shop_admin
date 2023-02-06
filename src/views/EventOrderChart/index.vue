<template src="./template.html"></template>

<script>
import MainList from '@/components/MainList/';
import Breadcrumb from '@/components/Breadcrumb/';
import TotalPriceChart from '@/components/Charts/TotalPriceChart';
import ProductPriceChart from '@/components/Charts/ProductPriceChart';
import { GetOrderList } from '@/api/order.js';
export default {
  name: 'Products',
  components: {
    MainList,
    Breadcrumb,
    TotalPriceChart,
    ProductPriceChart
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
        action: [
          
        ],
        status: [
          {
            title: '尚未付款',
            class: '',
            condition: 'Y',
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
            title: '已取消',
            class: 'black white--text',
            condition: 'C',
          }
          ]
      },
      headers: [
        {
          text: '訂單編號',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '訂單日期', value: 'created_at' },
        { text: '客戶姓名', value: 'BuyerName' },
        { text: '付款方式', value: 'Payment' },
        { text: '運送方式', value: 'Shipping' },
        { text: '訂單狀態', value: 'Status' },
        { text: '總金額', value: 'TotalPrice' },
      ],
      order_data: [],
      product_data:[],
      date_between: [],
      key_word: '',
    };
  },
  methods: {
    async GetOrders() {
      GetOrderList(-1, -1, 'all', -1).then((res) => {
        // && item.Status!="C"
        let order_data = res[0].data.List.filter(
          (item) => item.OrderMemo == this.$route.params.id 
        );
        console.log(res)
        order_data = this.SetOrderTable(order_data,res[1].data,res[4].data)
        let start_date = new Date('3000-01-01');
        let end_date = new Date('1900-01-01');
        order_data.forEach((item) => {
          item.TableTitle = '#' + item.TradeID;
          if (new Date(item.created_at) < start_date) {
            start_date = new Date(item.created_at);
          }
          if (new Date(item.created_at) > end_date) {
            end_date = new Date(item.created_at);
          }
        });
        this.date_between.push(start_date);
        this.date_between.push(end_date);
        this.product_data = this.GetOrderProducts(order_data,res[3].data)
        this.order_data = order_data;
      });
    },
    GetOrderProducts(order_data,product_list){
      // 訂單
      let product_data = [];
      order_data.forEach((trade) => {
        // 訂單的商品
        trade.SubTradeList.forEach((item) => {
          let product_exist = -1;
          product_data.forEach((product, product_index) => {
            product.GoodsID == item.GoodsID
              ? (product_exist = product_index)
              : '';
          });

          if (product_exist != -1) {
            product_data[product_exist].Price += parseInt(item.FinalPrice);
            product_data[product_exist].Count += 1;
          } else {
            product_data.push({
              GoodsID: item.GoodsID,
              Title: product_list.filter(
                (product) => product.GoodsID == item.GoodsID
              )[0].Title,
              Price: parseInt(item.FinalPrice),
              Count: 1,
            });
          }
        });
      });
      product_data = product_data.sort((a, b) => {
        return b.Price - a.Price;
      });
      return product_data
    },
    SetOrderTable(order_data,shipping_list,payment_list){
      order_data.forEach(trade=>{
         let val = (trade.Price / 1).toFixed(0).replace('.', ',');
        trade.TotalPrice =
            'NT$ ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          let payment = payment_list.filter(item=>item.PaymentID == trade.PaymentID)
          trade.Payment = payment.length>0?payment[0].Title:"查無付款方式"


          let shipping = shipping_list.filter(item=>item.ShippingID == trade.ShippingID)
          trade.Shipping = shipping.length>0?shipping[0].Title:"查無付款方式"
      })
      return order_data
    },
    OpenMemoOrder(order_data) {
      this.$router.push(`/orders?order_memo=${order_data.TableTitle}`);
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
