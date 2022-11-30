<template src="./template.html"></template>

<script>
// import VueApexCharts from 'vue-apexcharts';
export default {
  name: 'TotalPriceChart',
  components: {
    // VueApexCharts,
  },
  props: {
    order_data: {
      require: true,
      type: Array,
    },
    date_between: {
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
        yaxis: [
          {
            title: {
              text: '銷售額',
            },
          },
          {
            opposite: true,
            title: {
              text: '訂單數量',
            },
          },
        ],
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
          },
        },
        dataLabels: {
          enabled: false,
        },
      },
      MoneyChartSeries: [
        {
          name: '金額總計',
          type: 'area',
          data: [],
        },
        {
          name: '訂單量',
          type: 'area',
          data: [],
        },
      ],
    };
  },
  methods: {
    SetChart() {
      var start = this.date_between[0];
      var end = this.date_between[1];
      var startTime = new Date(start);
      var endTime = new Date(end);

      let date_all = [];
      while (endTime.getTime() - startTime.getTime() >= 0) {
        var month =
          (startTime.getMonth() + 1).toString().length == 1
            ? '0' + (startTime.getMonth() + 1).toString()
            : (startTime.getMonth() + 1).toString();
        var day =
          startTime.getDate().toString().length == 1
            ? '0' + startTime.getDate()
            : startTime.getDate();
        date_all.push(month + '-' + day);
        startTime.setDate(startTime.getDate() + 1);
      }
      this.MoneyChartOptions.xaxis.categories = date_all;
      this.SetSeries();
    },
    SetSeries() {
      let data = [];
      let count_data = [];
      this.MoneyChartOptions.xaxis.categories.forEach((date, date_index) => {
        data[date_index] = 0;
        count_data[date_index] = 0;
        this.order_data.forEach((item) => {
          if (item.created_at.substring(5, 10) == date) {
            data[date_index] += parseInt(item.Price);
            count_data[date_index] += 1;
          }
        });
        if (data[date_index] == 0) {
          this.MoneyChartOptions.xaxis.categories[date_index] = ' ';
        }
      });
      this.MoneyChartSeries[0].data = data;
      this.MoneyChartSeries[1].data = count_data;
    },
  },
  watch: {
    order_data() {
      this.order_data.length <= 0 ? '' : this.SetChart();
    },
    date_between() {
      this.SetChart();
    },
  },
  created() {
    this.SetChart();
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
