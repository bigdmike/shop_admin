<template src="./template.html"></template>

<script>
export default {
  name: "TotalPriceChart",
  components: {
  },
  props: {
    order_data: {
      require: true,
      type: Array
    },
    date_between: {
      require: true,
      type: Array
    }
  },
  data() {
    return {
      product_data: [],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'index',
        },
        {
          text: '商品', value: 'name',
          sortable: false,
        },
        {
          text: '銷售總額', value: 'price',
          align: 'end',
          sortable: false,
        },
      ],
    }
  },
  methods: {

    SetChart() {
      this.order_data.forEach(order => {
        if (order.products != null) {
          order.products.forEach(product => {
            let product_in_array = this.product_data.filter(item => item.name == product.name)
            if (product_in_array.length <= 0) {
              this.product_data.push(
                {
                  name: product.name,
                  price: parseInt(product.price)
                }
              )
            }
            else {
              product_in_array[0].price += parseInt(product.price)
            }
          })
        }

      })
    },
  },
  watch: {
    order_data() {
      this.order_data.length <= 0 ? "" : this.SetChart()
    },
    date_between() {
      this.SetChart()
    }
  },
  created() { },
  computed: {
    total_money() {
      let count = 0
      this.MoneyChartSeries[0].data.forEach(item => {
        count += parseInt(item)
      })
      return count
    }
  },
  filters: {
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
}
</script>