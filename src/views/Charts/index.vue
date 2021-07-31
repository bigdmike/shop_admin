<template src="./template.html"></template>

<script>
import VueApexCharts from 'vue-apexcharts'
import Breadcrumb from "@/components/Breadcrumb/"
import TotalPriceChart from "@/components/Charts/TotalPriceChart"
import OrderCountChart from "@/components/Charts/OrderCountChart"
import TotalPriceAccumulationChart from "@/components/Charts/TotalPriceAccumulationChart"
import OrderAccumulationChart from "@/components/Charts/OrderAccumulationChart"
import ProductPriceChart from "@/components/Charts/ProductPriceChart"
import ProductCountChart from "@/components/Charts/ProductCountChart"
export default {
  name: "Charts",
  components: {
    VueApexCharts,
    Breadcrumb,
    TotalPriceChart,
    OrderCountChart,
    TotalPriceAccumulationChart,
    OrderAccumulationChart,
    ProductPriceChart,
    ProductCountChart
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "頁面編輯",
          link: ""
        },
        {
          title: "分析報表",
          link: ""
        }
      ],
      order_data: [],
      date_between: ['2019-09-10', '2019-09-20'],
      modal: false,
    }
  },
  methods: {
    dateRangeText() {
      return " " + this.date_between.join(' ~ ')
    },
    ChangeDate(date) {
      if (new Date(date[0]) > new Date(date[1])) {
        date = date.reverse()
      }
      this.$refs.dialog.save(date)
    },
    async GetOrders() {
      let result = await this.SendGetData(process.env.VUE_APP_BASE_API + "orders/get_orders_admin.php")
      if (result != "error") {
        this.order_data = JSON.parse(result.data)
        let product_data = []
        JSON.parse(result.data).forEach(order => {
          if (order.products != null) {
            order.products.forEach(product => {
              let product_in_array = product_data.filter(item => item.name == product.name)
              if (product_in_array.length <= 0) {
                product_data.push(
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
      }
    },

  },
  created() {
    let date = new Date().toISOString().substr(0, 7)
    let now_year = parseInt(date.substr(0, 4))
    let now_month = parseInt(date.substr(5, 2))
    this.date_between[0] = new Date(now_year, now_month - 1, 1).Format("yyyy-MM-dd")
    this.date_between[1] = new Date(now_year, now_month, 0).Format("yyyy-MM-dd")
    this.GetOrders()
  },
  watch: {
    date_between() {
      //SetChart
      this.$refs.TotalPriceChart.SetChart()
      this.$refs.OrderCountChart.SetChart()
      this.$refs.TotalPriceAccumulationChart.SetChart()
      this.$refs.OrderAccumulationChart.SetChart()
      this.$refs.ProductPriceChart.SetChart()
      this.$refs.ProductCountChart.SetChart()
    }
  },
  computed: {
    date_orders() {
      return this.order_data.filter(item => {
        if (item.create_time >= this.date_between[0] && item.create_time <= this.date_between[1]) {
          return item
        }
      })
    },
  },
  filters: {
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
}
</script>