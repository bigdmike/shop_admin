<template src="./template.html"></template>

<script>
import { get_shipping } from "@/api/shipping";
import ListShow from "@/components/Shipping/ListShow/index";
import Breadcrumb from "@/components/Breadcrumb/";
import shipping_components from "@/components/Shipping/shipping_components.js";
export default {
  name: "Shipping",
  mixins: [shipping_components],
  components: {
    ListShow,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "金物流設定",
          link: "",
        },
        {
          title: "運送方式",
          link: "",
        },
      ],
      shipping_data: [],
    };
  },
  methods: {
    async GetShippingData() {
      get_shipping().then((res) => {
        console.log(res);
        this.shipping_data = res.data;
      });
    },
  },
  created() {
    this.GetShippingData();
  },
};
</script>
