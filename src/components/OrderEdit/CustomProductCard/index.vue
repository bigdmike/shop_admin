<template>
  <v-row>
    <v-col cols="6" md="4">
      <p class="my-0 blue--text">{{ shopcart_item.ProductData.Title }}</p>
      <!-- <span class="caption">
        {{ shopcart_item.Option.ColorTitle }} /
        {{ shopcart_item.Option.SizeTitle }}</span
      > -->
      <span
        v-for="(item, item_index) in stock_data"
        :key="`option_${item_index}`"
        class="caption d-block"
      >
        <span>{{ item.SpecCategoryTitle }}</span
        >：
        {{ item.SpecTitle }}
      </span>
    </v-col>
    <v-col cols="6" md="4" class=" d-flex align-center justify-end">
      <p class="my-0 ">
        NT$ {{ shopcart_item.SellPrice | money_format }} x
        {{ shopcart_item.Amount }}
      </p>
    </v-col>
    <v-col cols="6" md="4" class=" d-flex align-end justify-center flex-column">
      <p
        v-if="shopcart_item.SellPrice != shopcart_item.FinalPrice"
        class="my-0 text-decoration-line-through body-2 grey--text lighten-1--text"
      >
        NT$
        {{ (shopcart_item.SellPrice * shopcart_item.Amount) | money_format }}
      </p>
      <p class="my-0">
        NT$
        {{ (shopcart_item.FinalPrice * shopcart_item.Amount) | money_format }}
      </p>
    </v-col>
    <v-col
      cols="12"
      class="py-0 px-2 d-flex align-center"
      v-if="
        shopcart_item.DiscountID_PercentMenu != 0 ||
          shopcart_item.DiscountID_PercentFull != 0
      "
    >
      <v-chip
        v-if="shopcart_item.DiscountID_PercentMenu != 0"
        class="mr-2"
        small
      >
        {{
          GetProductDiscount(shopcart_item.DiscountID_PercentMenu).Title
        }}</v-chip
      >
      <v-chip
        v-if="shopcart_item.DiscountID_PercentFull != 0"
        class="mr-2"
        small
      >
        {{
          GetProductDiscount(shopcart_item.DiscountID_PercentFull).Title
        }}</v-chip
      >
    </v-col>
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'OrderCustomProductCard',
  props: {
    product_data: {
      type: Array,
    },
    shopcart_item: {
      type: Object,
    },
    discount_list: {
      type: Array,
    },
  },
  methods: {
    GetProductDiscount(id) {
      return this.discount_list.filter(
        (shopcart_item) => shopcart_item.DiscountID == id
      )[0];
    },
    GetCategoryTitle(spec_id) {
      let spec_item = this.shopcart_item.product_data.CustomSpecList.filter(
        (item) => item.CustomSpecID == spec_id
      )[0];
      return spec_item.SpecCategoryTitle;
    },
    GetSpecTitle(spec_id) {
      let spec_item = this.shopcart_item.product_data.CustomSpecList.filter(
        (item) => item.CustomSpecID == spec_id
      )[0];
      return spec_item.SpecTitle;
    },
  },
  computed: {
    stock_data() {
      const id_list = this.shopcart_item.CustomSpecID.split(',');
      return this.shopcart_item.ProductData.CustomSpecList.filter(
        (item) => id_list.indexOf(item.CustomSpecID) != -1
      );
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
