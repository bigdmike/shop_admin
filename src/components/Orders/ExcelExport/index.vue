<template>
  <div>
    <vue-excel-xlsx
      ref="DownloadBtn"
      :data="order_data"
      :columns="columns"
      :file-name="'filename'"
      :file-type="'xlsx'"
      :sheet-name="'sheetname'"
    >
    </vue-excel-xlsx>
  </div>
</template>

<script>
import VueExcelXlsx from 'vue-excel-xlsx';
import Vue from 'vue';
Vue.use(VueExcelXlsx);
export default {
  name: 'ExcelExport',
  props: {
    order_data: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      columns: [
        {
          label: '訂單編號',
          field: 'TradeID',
        },
        {
          label: '溫層',
          field: '',
        },
        {
          label: '距離',
          field: '',
        },
        {
          label: '規格',
          field: '',
        },
        {
          label: '代收貨款',
          field: '',
        },
        {
          label: '收件人-姓名',
          field: 'ReceiverName',
        },
        {
          label: '收件人-電話',
          field: '',
        },
        {
          label: '收件人-手機',
          field: 'ReceiverPhone',
        },
        {
          label: '收件人-地址',
          field: 'ReceiverAddress',
        },
        {
          label: '寄件人-姓名',
          field: '',
        },
        {
          label: '寄件人-電話',
          field: '',
        },
        {
          label: '寄件人-地址',
          field: '',
        },
        {
          label: '希望配達日',
          field: '',
        },
        {
          label: '品類代碼',
          field: '',
        },
        {
          label: '品名',
          field: 'ProductName',
        },
        {
          label: '易碎物品',
          field: '',
        },
        {
          label: '精密儀器',
          field: '',
        },
        {
          label: '備註',
          field: '',
        },
        {
          label: '報值(YIN)',
          field: '',
        },
        {
          label: '報值金額',
          field: '',
        },
        {
          label: '到付單',
          field: '',
        },
      ],
    };
  },
  methods: {
    Export() {
      console.log(this.$refs.DownloadBtn);
      this.$refs.DownloadBtn.exportExcel();
    },
  },
};
</script>
