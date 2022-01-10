<template src="./template.html"></template>

<script>
import { get_coupon } from "@/api/coupon.js";
import ListShow from "@/components/Coupon/ListShow/index";
import Breadcrumb from "@/components/Breadcrumb/";
import coupon_components from "@/components/Coupon/coupon_components.js";
export default {
  name: "Coupon",
  mixins: [coupon_components],
  components: {
    ListShow,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "促銷優惠",
          link: "",
        },
        {
          title: "優惠代碼",
          link: "",
        },
      ],
      coupon_data: [],
    };
  },
  methods: {
    async GetCouponData() {
      get_coupon().then((res) => {
        this.coupon_data = res.data;
        console.log(res.data);
      });
    },
  },
  created() {
    this.GetCouponData();
  },
};
</script>
