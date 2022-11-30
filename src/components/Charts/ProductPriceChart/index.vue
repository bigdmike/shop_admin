<template src="./template.html"></template>

<script>
// import VueApexCharts from 'vue-apexcharts';
export default {
  name: 'ProductSellChart',
  components: {
    // VueApexCharts,
  },
  props: {
    product_data: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      MoneyChartOptions: {
        chart: {
          id: 'vuechart-example',
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [
            'South Korea',
            'Canada',
            'United Kingdom',
            'Netherlands',
            'Italy',
            'France',
            'Japan',
            'United States',
            'China',
            'Germany',
          ],
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
      },
      MoneyChartSeries: [
        {
          name: '金額總計',
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        },
      ],
    };
  },
  methods: {
    SetChart() {
      this.MoneyChartOptions.xaxis.categories = [];
      this.MoneyChartSeries[0].data = [];
      this.product_data.forEach((product) => {
        this.MoneyChartOptions.xaxis.categories.push(product.Title);
        this.MoneyChartSeries[0].data.push(product.Price);
      });
    },
    SetSeries() {
      let data = [];
      this.MoneyChartOptions.xaxis.categories.forEach((date, date_index) => {
        data[date_index] = 0;
        this.order_data.forEach((item) => {
          if (item.created_at.substring(5, 10) == date) {
            data[date_index] += parseInt(item.Price);
          }
        });
        if (data[date_index] == 0) {
          this.MoneyChartOptions.xaxis.categories[date_index] = ' ';
        }
      });
      this.MoneyChartSeries[0].data = data;
    },
  },
  created() {
    this.SetChart();
  },
  watch: {
    product_data() {
      this.SetChart();
    },
  },
  computed: {
    total_money() {
      let count = 0;
      this.MoneyChartSeries[0].data.forEach((item) => {
        count += parseInt(item);
      });
      return count;
    },
  },
  filters: {
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>
