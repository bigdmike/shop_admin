<template src="./template.html"></template>

<script>
export default {
  name: 'ProductSellChart',
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
          categories: [],
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
          data: [],
        },
      ],
    };
  },
  methods: {
    //設定圖表資料
    SetChart() {
      // 初始化x軸與圖表資料
      this.MoneyChartOptions.xaxis.categories = [];
      this.MoneyChartSeries[0].data = [];
      // 將商品名稱與金額放入圖表
      this.product_data.forEach((product) => {
        this.MoneyChartOptions.xaxis.categories.push(product.Title);
        this.MoneyChartSeries[0].data.push(product.Price);
      });
    },
  },
  created() {
    this.SetChart();
  },
  watch: {
    // 商品資料更新時，重新設定圖表
    product_data() {
      this.SetChart();
    },
  },
};
</script>
