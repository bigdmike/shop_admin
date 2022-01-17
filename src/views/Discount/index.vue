<template src="./template.html"></template>

<script>
import { getMenuAndDiscount } from "@/api/discount.js";
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
      category_data: [],
    };
  },
  methods: {
    async GetDiscountData() {
      getMenuAndDiscount().then((res) => {
        this.discount_data = res[0].data;
        this.category_data = res[1].data;
        console.log(res);
      });
    },
  },
  created() {
    this.GetDiscountData();
  },
};
</script>
