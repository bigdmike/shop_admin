<template src="./template.html"></template>

<script>
import { get_discount } from "@/api/discount.js";
import ListShow from "@/components/Discount/ListShow/index";
import Breadcrumb from "@/components/Breadcrumb/";
import discount_components from "@/components/Discount/discount_components.js";
export default {
  name: "Discount",
  mixins: [discount_components],
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
          title: "打折/贈品",
          link: "",
        },
      ],
      discount_data: [],
    };
  },
  methods: {
    async GetDiscountData() {
      get_discount().then((res) => {
        this.discount_data = res.data;
        console.log(res.data);
      });
    },
  },
  created() {
    this.GetDiscountData();
  },
};
</script>
