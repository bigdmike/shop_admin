<template src="./template.html"></template>

<script>
export default {
  name: 'TotalPriceChart',
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
          id: 'TotalPriceChart',
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
      // 設定開始與結束時間
      var start = this.date_between[0];
      var end = this.date_between[1];
      var startTime = new Date(start);
      var endTime = new Date(end);

      let date_all = [];
      // 取出日期區間中的每一天日期並放入陣列
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
      // x軸資料放入日期
      this.MoneyChartOptions.xaxis.categories = date_all;
      // 設定y軸資料
      this.SetSeries();
    },
    SetSeries() {
      // 金額資料
      let data = [];
      // 訂單數量
      let count_data = [];

      this.MoneyChartOptions.xaxis.categories.forEach((date, date_index) => {
        data[date_index] = 0; //初始化當天金額為零
        count_data[date_index] = 0; //初始化當天訂單數量為零

        // 篩選出當天的訂單並加總金額與訂單數量
        this.order_data.forEach((item) => {
          if (item.created_at.substring(5, 10) == date) {
            data[date_index] += parseInt(item.Price);
            count_data[date_index] += 1;
          }
        });
        // 若當天沒有任何訂單資料則不顯示當天日期
        if (data[date_index] == 0) {
          this.MoneyChartOptions.xaxis.categories[date_index] = ' ';
        }
      });
      // 資料放入圖表中
      this.MoneyChartSeries[0].data = data;
      this.MoneyChartSeries[1].data = count_data;
    },
  },
  watch: {
    // 當訂單資料更新時重新設定圖表
    order_data() {
      this.order_data.length <= 0 ? '' : this.SetChart();
    },
    // 當日期區間更新時重新設定圖表
    date_between() {
      this.SetChart();
    },
  },
  created() {
    this.SetChart();
  },
  computed: {
    // 總金額計算
    total_money() {
      let count = 0;
      this.MoneyChartSeries[0].data.forEach((item) => {
        count += parseInt(item);
      });
      return count;
    },
  },
};
</script>
