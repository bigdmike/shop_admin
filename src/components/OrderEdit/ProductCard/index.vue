<template>
  <v-row>
    <v-col cols="6" md="4">
      <p class="my-0 blue--text">{{ shopcart_item.ProductData.Title }}</p>
      <span class="caption">
        {{ shopcart_item.ProductData.Option1 }}:{{ stock_data.ColorTitle }}
        <br />
        {{ shopcart_item.ProductData.Option2 }}:{{ stock_data.SizeTitle }}</span
      >
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
  name: 'OrderProductCard',
  props: {
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
  },
  computed: {
    stock_data() {
      return this.shopcart_item.ProductData.Stock.filter(
        (item) =>
          item.ColorID == this.shopcart_item.ColorID &&
          item.SizeID == this.shopcart_item.SizeID
      )[0];
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
