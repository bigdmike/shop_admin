<template src="./template.html"></template>

<script>
import MainList from '@/components/MainList/index';
import Breadcrumb from '@/components/Breadcrumb/';

import { getGoodsAndCategory } from '@/api/products';
export default {
  name: 'Products',
  components: {
    MainList,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '客製化商品選項',
          link: '',
        },
      ],
      product_status_data: [
        {
          label: '全部',
          value: 'all',
        },
        {
          label: '已隱藏',
          value: 'N',
        },
        {
          label: '已發布',
          value: 'Y',
        },
      ],
      product_data: null,
      options: {
        action: [],
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
          text: '商品名稱',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '上架時間', value: 'created_at' },
        { text: '上架狀態', value: 'Status' },
      ],
    };
  },
  methods: {
    GetProductData() {
      getGoodsAndCategory().then((res) => {
        res[1].data = res[1].data.filter(
          (item) => item.deleted_at == null && item.IsCustom == 'Y'
        );
        res[1].data.forEach((item, item_index) => {
          res[1].data[item_index].TableTitle = item.Title;
          res[1].data[item_index].TableImage = item.Image1;
          let stock_count = 0;
          item.Stock.forEach((stock) => {
            stock_count += parseInt(stock.Stock);
          });
          res[1].data[item_index].StockCount = stock_count;
        });
        this.product_data = res[1].data;
      });
    },
  },
  created() {
    this.GetProductData();
  },
};
</script>
