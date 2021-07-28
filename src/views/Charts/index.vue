<template src="./template.html"></template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: "Charts",
  components: {
    VueApexCharts
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91]
      }],

      pieOptions: {
        series: [44, 55, 13, 33],
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
      },
      pieSeries: [44, 55, 41, 17, 15],
    }
  },
  methods: {}
}
</script>