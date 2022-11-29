<template src="./template.html"></template>

<script>
import FilterDialog from '@/components/Orders/FilterDialog/index';
import ListShow from '@/components/Orders/ListShow/index';
import Breadcrumb from '@/components/Breadcrumb/';
import TCATExcelExport from '@/components/Orders/TCATExcelExport/';
import ExcelExport from '@/components/Orders/ExcelExport/';
import { GetOrderList } from '@/api/order.js';
export default {
  name: 'Products',
  components: {
    FilterDialog,
    ListShow,
    ExcelExport,
    TCATExcelExport,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '訂單管理',
          link: '',
        },
        {
          title: '所有訂單',
          link: '',
        },
      ],
      filter_data: {
        status: 'all',
        member_id: -1,
        data_per_page: 10,
      },
      order_status_data: [
        {
          label: '全部',
          value: 'all',
        },
        {
          label: '尚未付款',
          value: 'W',
        },
        {
          label: '已付款',
          value: 'P',
        },
        {
          label: '理貨中',
          value: 'T',
        },
        {
          label: '已出貨',
          value: 'S',
        },
        {
          label: '已送達',
          value: 'A',
        },
        {
          label: '已完成',
          value: 'F',
        },
        {
          label: '已取消',
          value: 'C',
        },
      ],
      order_data: [],
      product_data: [],
      key_word: '',
      show_type: 'list',
      shipping_list: [],
      payment_list: [],
      select_order: [],
      zip_code_data: null,
    };
  },
  methods: {
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open();
    },
    async GetOrders() {
      GetOrderList(-1, -1, 'all', -1).then((res) => {
        this.payment_list = res[4].data;
        this.product_data = res[3].data;
        this.zip_code_data = res[2].data;
        this.shipping_list = res[1].data;
        res[0].data.List = res[0].data.List.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        this.order_data = res[0].data.List;
      });
    },
    UpdateSelectOrder(val) {
      this.select_order = val;
    },
    TCATExcelExport() {
      if (this.select_order.length > 0) {
        this.$refs.TCATExcelExport.SetExportData();
      } else {
        this.$store.commit('SetDialog', {
          title: '發生錯誤',
          content: '請先選擇要匯出的訂單',
          status: true,
        });
      }
    },
    ExcelExport() {
      if (this.select_order.length > 0) {
        this.$refs.ExcelExport.SetExportData();
      } else {
        this.$store.commit('SetDialog', {
          title: '發生錯誤',
          content: '請先選擇要匯出的訂單',
          status: true,
        });
      }
    },
  },
  created() {
    this.GetOrders();
  },
  computed: {},
};
</script>

<style>
.searchbar .filter_btn {
  height: 40px !important;
  border-radius: 5px 0 0 5px;
  border-right: 0px;
  border-color: #888;
}
.searchbar .searchtext .v-input__control .v-input__slot {
  border-radius: 0px 5px 5px 0px;
}
.searchbar .display_btn {
  height: 40px !important;
}
.opacity-0 {
  opacity: 0;
}
</style>
