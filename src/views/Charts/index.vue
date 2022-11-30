<template src="./template.html"></template>

<script>
import Breadcrumb from '@/components/Breadcrumb/';
import TotalPriceChart from '@/components/Charts/TotalPriceChart';
import ProductPriceChart from '@/components/Charts/ProductPriceChart';

import { GetOrderAndProduct } from '@/api/order.js';
export default {
  name: 'Charts',
  components: {
    Breadcrumb,
    TotalPriceChart,
    ProductPriceChart,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '頁面編輯',
          link: '',
        },
        {
          title: '分析報表',
          link: '',
        },
      ],
      order_data: [],
      date_between: ['2019-09-10', '2019-09-20'],
      modal: false,
      product_data: null,
      trade_data: null,
      discount_data: null,
      coupon_data: null,
      payment_data: null,
      shipping_data: null,
      zip_code_data: null,
    };
  },
  methods: {
    dateRangeText() {
      return ' ' + this.date_between.join(' ~ ');
    },
    ChangeDate(date) {
      if (new Date(date[0]) > new Date(date[1])) {
        date = date.reverse();
      }
      this.$refs.dialog.save(date);
    },
    GetData() {
      GetOrderAndProduct().then((res) => {
        this.product_data = res[0].data;
        this.trade_data = res[1].data.List;
        this.discount_data = res[2].data;
        this.coupon_data = res[3].data;
        this.payment_data = res[4].data;
        this.shipping_data = res[5].data;
        this.zip_code_data = res[6].data;
      });
    },
  },
  created() {
    let date = new Date().toISOString().substr(0, 7);
    let now_year = parseInt(date.substr(0, 4));
    let now_month = parseInt(date.substr(5, 2));
    this.date_between[0] = new Date(now_year, now_month - 1, 1).Format(
      'yyyy-MM-dd'
    );
    this.date_between[1] = new Date(now_year, now_month, 0).Format(
      'yyyy-MM-dd'
    );
    this.GetData();
  },
  watch: {},
  computed: {
    date_trade_data() {
      if (this.trade_data == null) {
        return [];
      }
      return this.trade_data.filter(
        (item) =>
          item.created_at >= this.date_between[0] &&
          item.created_at <= this.date_between[1]
      );
    },
    date_sell_price() {
      if (this.trade_data == null) {
        return 0;
      }
      let price = 0;
      this.date_trade_data.forEach((item) => {
        price += parseInt(item.Price);
      });
      return price;
    },
    total_sell_price() {
      if (this.trade_data == null) {
        return 0;
      }
      let price = 0;
      this.trade_data.forEach((item) => {
        price += parseInt(item.Price);
      });
      return price;
    },
    date_product_data() {
      if (this.trade_data == null) {
        return [];
      }
      let product_data = [];
      // 訂單
      this.date_trade_data.forEach((trade) => {
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
              Title: this.product_data.filter(
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
      return product_data;
    },
  },
};
</script>
