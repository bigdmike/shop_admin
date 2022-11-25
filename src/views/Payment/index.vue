<template src="./template.html"></template>

<script>
import { get_payment, update_payment } from '@/api/payment';
import MainList from '@/components/MainList/index';
import EditDialog from '@/components/Payment/EditDialog/';
import Breadcrumb from '@/components/Breadcrumb/';
export default {
  name: 'Payment',
  components: {
    MainList,
    Breadcrumb,
    EditDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '金物流設定',
          link: '',
        },
        {
          title: '付款方式',
          link: '',
        },
      ],
      options: {
        status: [
          {
            title: '已啟用',
            class: 'success',
            condition: 'Y',
          },
          {
            title: '已停用',
            class: '',
            condition: 'N',
          },
        ],
      },
      headers: [
        {
          text: '名稱',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '上架時間', value: 'created_at' },
        { text: '手續費', value: 'ChargeFeeText' },
        { text: '啟用狀態', value: 'Status' },
      ],
      payment_data: [],
    };
  },
  methods: {
    OpenEditDialog(item) {
      this.$refs.EditDialog.Open(item);
    },
    GetData() {
      get_payment().then((res) => {
        res.data.forEach((item, item_index) => {
          res.data[item_index].TableTitle = item.Title;
          if (item.ChargeFee != 0) {
            res.data[item_index].ChargeFeeText = item.ChargeFee + '元';
          } else {
            res.data[item_index].ChargeFeeText = item.ChargePercent + '%';
          }
        });
        this.payment_data = res.data;
      });
    },
    UpdateData(item) {
      update_payment(item).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
  },
  created() {
    this.GetData();
  },
};
</script>
