<template src="./template.html"></template>

<script>
export default {
  name: 'OrderListShow',
  props: {
    filter_data: {
      require: true,
      type: Object,
    },
    order_status_data: {
      require: true,
      type: Array,
    },
    order_payment_data: {
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
    shipping_list: {
      require: true,
      type: Array,
    },
    select_order: {
      require: true,
      type: Array,
    },
    payment_list: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      headers: [
        { text: '訂單編號', value: 'TradeID' },
        { text: '訂單日期', value: 'created_at' },
        { text: '客戶姓名', value: 'ReceiverName' },
        { text: '付款方式', value: 'PaymentID' },
        { text: '運送方式', value: 'ShippingID' },
        { text: '訂單狀態', value: 'status' },
        { text: '總金額', value: 'total_price' },
      ],
      status_array: {
        W: {
          label: '尚未付款',
          color: '',
          'text-color': '',
        },
        P: {
          label: '完成付款',
          color: 'blue lighten-1',
          'text-color': 'white',
        },
        T: {
          label: '理貨中',
          color: 'yellow darken-1',
          'text-color': 'white',
        },
        S: {
          label: '已出貨',
          color: 'orange darken-3',
          'text-color': 'white',
        },
        A: {
          label: '已送達',
          color: 'deep-orange darken-3',
          'text-color': 'white',
        },
        F: {
          label: '已完成',
          color: 'green',
          'text-color': 'white',
        },
        C: {
          label: '已取消',
          color: 'black',
          'text-color': 'white',
        },
      },
      selected: [],
    };
  },
  methods: {
    GetShipway(order_data) {
      let ship_way = this.shipping_list.filter(
        (item) => item.ShippingID == order_data.ShippingID
      );
      return ship_way.length > 0 ? ship_way[0] : { Title: '查無配送方式' };
    },
    GetPayment(order_data) {
      let payment = this.payment_list.filter(
        (item) => item.PaymentID == order_data.PaymentID
      );
      return payment.length > 0 ? payment[0] : { Title: '查無付款方式' };
    },
    ExcelExport() {
      this.$refs.ExcelExport.Export();
    },
  },
  watch: {
    selected() {
      this.$emit('select-action', this.selected);
    },
  },
  computed: {
    filter_value: {
      get() {
        {
          let data = JSON.parse(JSON.stringify(this.value));
          if (this.key_word != '') {
            data = data.filter((item) => {
              return (
                item.ReceiverName.indexOf(this.key_word) != -1 ||
                item.ReceiverPhone.indexOf(this.key_word) != -1 ||
                item.ReceiverAddress.indexOf(this.key_word) != -1 ||
                item.ReceiverEmail.indexOf(this.key_word) != -1 ||
                item.TradeID.indexOf(this.key_word) != -1
              );
            });
          }
          if (this.filter_data.status != 'all') {
            data = data.filter(
              (item) => item.Status == this.filter_data.status
            );
          }
          return data;
        }
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
.page__grab-icon {
  cursor: grab;
}
</style>
