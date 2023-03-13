<template>
  <div>
    <DownloadExcel
      class="d-none"
      ref="DownloadBtn"
      :data="export_order_data"
      :fields="columns"
      type="csv"
      name="耀聞水果世界-訂單匯出.csv"
    ></DownloadExcel>
  </div>
</template>

<script>
import DownloadExcel from 'vue-json-excel';
import * as XLSX from 'xlsx/xlsx.mjs';

export default {
  name: 'ExcelExport',
  components: {
    DownloadExcel,
  },
  props: {
    order_data: {
      require: true,
      type: Array,
    },
    shipping_list: {
      require: true,
      type: Array,
    },
    zip_code_data: {
      require: true,
      type: Array,
    },
    payment_list: {
      require: true,
      type: Array,
    },
    product_data: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      columns: {
        排序: 'Index',
        訂單編號: 'TradeID',
        顧客姓名: 'ReceiverName',
        顧客電話: 'ReceiverPhone',
        顧客Email手機: 'ReceiverEmail',
        顧客地址: 'ReceiverAddress',
        訂單狀態: 'Status',
        付款方式: 'PaymentInfo',
        付款狀態: 'PaymentStatus',
        出貨貨運: 'ShippingInfo',
        查貨號碼: 'ShippingCode',
        訂單金額: 'Price',
        金流手續費: 'PaymentSubtotalFee',
        物流運費: 'ShippingFee',
        品名: 'ProductName',
        客戶備註: 'ReceiverMemo',
        商店備註: 'AdminMemo',
      },
      export_order_data: null,
      status_list: {
        W: '等待回應',
        P: '已付款',
        T: '理貨中',
        S: '已出貨',
        A: '已到貨',
        F: '訂單完成',
        C: '已取消',
      },
    };
  },
  methods: {
    Export() {
      let export_json = [];
      this.export_order_data.forEach((item, item_index) => {
        item.ProductName.forEach((product, product_index) => {
          let tmp_data = {};
          if (product_index == 0) {
            Object.keys(this.columns).forEach((new_key) => {
              if (new_key != '品名') {
                tmp_data[new_key] = this.export_order_data[item_index][
                  this.columns[new_key]
                ];
              } else {
                tmp_data[new_key] = this.export_order_data[
                  item_index
                ].ProductName[0];
              }
            });
          } else {
            Object.keys(this.columns).forEach((new_key) => {
              if (new_key != '品名') {
                tmp_data[new_key] = '';
              } else {
                tmp_data[new_key] = this.export_order_data[
                  item_index
                ].ProductName[product_index];
              }
            });
          }

          export_json.push(tmp_data);
        });
      });

      const data = XLSX.utils.json_to_sheet(export_json);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, '訂單資料');
      XLSX.writeFile(wb, '耀聞水果世界訂單匯出.xlsx');
    },
    SetExportData() {
      let order_data = JSON.parse(JSON.stringify(this.order_data));
      order_data.forEach((item, item_index) => {
        // 排序編號
        order_data[item_index].Index = item_index;
        // 地址
        order_data[item_index].ReceiverAddress = this.GetFullAddress(
          order_data[item_index].ReceiverAddress,
          order_data[item_index].ReceiverAddressCode
        );
        // 訂單狀態
        order_data[item_index].Status = this.status_list[
          order_data[item_index].Status
        ];
        // 運送方式
        order_data[item_index].ShippingInfo = this.GetShippingInfo(
          order_data[item_index].ShippingID
        );
        // 付款方式
        order_data[item_index].PaymentInfo = this.GetPaymentInfo(
          order_data[item_index].PaymentID
        );
        // 付款狀態
        order_data[item_index].PaymentStatus =
          order_data[item_index].PaymentTime == null
            ? '尚未付款'
            : order_data[item_index].PaymentTime + '已付款';
        // 商品名
        order_data[item_index].ProductName = this.GetOrderProducts(
          item.SubTradeList
        );
        // order_data[item_index].ProductName = item.SubTradeList;
      });

      this.export_order_data = order_data;
      this.$nextTick(() => {
        this.Export();
      });
    },
    GetFullAddress(address, zip_code) {
      const zip_data = this.zip_code_data.filter(
        (item) => item.ZipCode == zip_code
      )[0];
      return zip_code + zip_data.City + zip_data.Area + address;
    },
    GetShippingInfo(ship_id) {
      return this.shipping_list.filter((item) => item.ShippingID == ship_id)[0]
        .Title;
    },
    GetPaymentInfo(payment_id) {
      return this.payment_list.filter((item) => item.PaymentID == payment_id)[0]
        .Title;
    },
    GetOrderProducts(trade_product_list) {
      let order_products = [];
      trade_product_list.forEach((item) => {
        let exist_product = -1;
        order_products.forEach((product, product_index) => {
          if (
            product.GoodsID == item.GoodsID &&
            item.ColorID == product.ColorID &&
            product.SizeID == item.SizeID
          ) {
            exist_product = product_index;
          }
        });

        if (exist_product != -1) {
          order_products[exist_product].Amount += 1;
        } else {
          let tmp_product = Object.assign({}, item);
          tmp_product.Info = this.product_data.filter(
            (product) => product.GoodsID == item.GoodsID
          )[0];
          tmp_product.Amount = 1;
          if (tmp_product.Info.IsCustom == 'N') {
            tmp_product.Option = tmp_product.Info.Stock.filter(
              (option) =>
                option.ColorID == item.ColorID && option.SizeID == item.SizeID
            )[0];
          } else {
            tmp_product.Option = tmp_product.CustomSpecID.split(',');
          }
          order_products.push(tmp_product);
        }
      });

      // Option.SizeTitle Option.ColorTitle
      let product_list = [];
      order_products.forEach((item) => {
        let product_str = '';
        // item_index != 0 ? (product_str += ';') : '';
        if (item.Info.IsCustom == 'N') {
          product_str =
            item.Info.Title +
            ' - ' +
            '選項一：' +
            item.Option.ColorTitle +
            '/' +
            '選項二：' +
            item.Option.SizeTitle +
            '，NT$' +
            item.FinalPrice +
            ' x ' +
            item.Amount;
        } else {
          console.log(item.Info);
          const spec_list = item.Info.CustomSpecList.filter((spec) => {
            return item.Option.indexOf(spec.CustomSpecID) != -1;
          });
          product_str = item.Info.Title + ' - ';

          spec_list.forEach((spec) => {
            product_str += spec.SpecCategoryTitle + ':' + spec.SpecTitle + '/';
          });

          product_str += '，NT$' + item.FinalPrice + ' x ' + item.Amount;
        }

        product_list.push(product_str);
      });
      return product_list;
    },
  },
};
</script>
