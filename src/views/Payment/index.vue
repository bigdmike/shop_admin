<template src="./template.html"></template>

<script>
import { get_payment } from '@/api/payment';
import ListShow from '@/components/Payment/ListShow/index';
import Breadcrumb from '@/components/Breadcrumb/';
import payment_components from '@/components/Payment/payment_components.js';
export default {
  name: 'Payment',
  mixins: [payment_components],
  components: {
    ListShow,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '金物流設定',
          link: '',
        },
        {
          title: '付款方式',
          link: '',
        },
      ],
      payment_data: [],
    };
  },
  methods: {
    async GetPaymentData() {
      get_payment().then((res) => {
        this.payment_data = res.data;
      });
    },
  },
  created() {
    this.GetPaymentData();
  },
};
</script>
