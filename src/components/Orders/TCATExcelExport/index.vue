<template>
  <div>
    <DownloadExcel
      class="d-none"
      ref="DownloadBtn"
      :data="export_order_data"
      :fields="columns"
      type="csv"
      name="耀聞水果世界-黑貓訂單匯出.csv"
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
    product_data: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      columns: {
        訂單編號: 'TradeID',
        溫層: 'DeliveryFrozen',
        距離: 'OutlyDelivery',
        規格: 'DeliverySize',
        '收件人-姓名': 'ReceiverName',
        '收件人-電話': 'ReceiverPhone',
        '收件人-手機': 'ReceiverPhone',
        '收件人-地址': 'ReceiverAddress',
        '寄件人-姓名': 'SendName',
        '寄件人-電話': 'SendPhone',
        '寄件人-地址': 'SendAddress',
        希望配達日: 'Empty',
        品類代碼: 'Empty',
        品名: 'ProductName',
        易碎物品: 'FragileItem',
        精密儀器: 'PrecisionInstrument',
        備註: 'AdminMemo',
        '報值(Y|N)': 'PriceCount',
        報值金額: 'Price',
        到付單: 'Empty',
      },
      outly_city_area: ['蘭嶼鄉', '連江縣', '綠島鄉', '澎湖縣', '金門縣'],
      export_order_data: null,
    };
  },
  methods: {
    // Export() {
    //   this.$refs.DownloadBtn.generate();
    // },
    Export() {
      let export_json = [];
      this.export_order_data.forEach((item, item_index) => {
        let tmp_data = {};
        Object.keys(this.columns).forEach((new_key) => {
          tmp_data[new_key] = this.export_order_data[item_index][
            this.columns[new_key]
          ];
        });
        export_json.push(tmp_data);
      });

      const data = XLSX.utils.json_to_sheet(export_json);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, '黑貓訂單');
      XLSX.writeFile(wb, '耀聞水果世界-黑貓訂單匯出.xlsx');
    },
    SetExportData() {
      let order_data = JSON.parse(JSON.stringify(this.order_data));
      order_data.forEach((item, item_index) => {
        //預設規格，包裹尺寸
        order_data[item_index].DeliverySize = '0001';
        //運送距離
        order_data[item_index].OutlyDelivery = this.GetShipDistance(
          item.ReceiverAddressCode
        );
        //溫層
        order_data[item_index].DeliveryFrozen = this.GetDeliveryForzen(
          item.ShippingID
        );
        // 商品名
        order_data[item_index].ProductName = this.GetOrderProducts(
          item.SubTradeList
        );
        //易碎物品
        order_data[item_index].FragileItem = 'N';
        // 精密儀器
        order_data[item_index].PrecisionInstrument = 'N';
        // 報值
        order_data[item_index].PriceCount = 'Y';
        // 寄件人
        order_data[item_index].SendName = '耀聞水果世界';
        order_data[item_index].SendPhone = '04-2382-1555';
        order_data[item_index].SendAddress = '臺中市南屯區公益路二段931號';
        // 空值
        order_data[item_index].Empty = '';
      });
      this.export_order_data = order_data;
      this.$nextTick(() => {
        this.Export();
      });
    },
    GetShipDistance(zip_code) {
      const zip_data = this.zip_code_data.filter(
        (item) => item.ZipCode == zip_code
      )[0];
      if (zip_data.City == '台中市') {
        return '00';
      } else if (
        this.outly_city_area.indexOf(zip_data.City) != -1 ||
        this.outly_city_area.indexOf(zip_data.Area) != -1
      ) {
        return '02';
      } else {
        return '01';
      }
    },
    GetDeliveryForzen(ship_id) {
      const ship_way = this.shipping_list.filter(
        (item) => (item.ShippingID = ship_id)
      )[0];
      return ship_way.DeliveryFrozen == 'N' ? '0001' : '0002';
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
          tmp_product.Option = tmp_product.Info.Stock.filter(
            (option) =>
              option.ColorID == item.ColorID && option.SizeID == item.SizeID
          )[0];
          order_products.push(tmp_product);
        }
      });

      // Option.SizeTitle Option.ColorTitle
      let product_str = '';
      order_products.forEach((item, item_index) => {
        item_index != 0 ? (product_str += ';') : '';
        product_str +=
          item.Info.Title +
          '_' +
          item.Option.ColorTitle +
          '_' +
          item.Option.SizeTitle +
          'x' +
          item.Amount;
      });
      return product_str;
    },
  },
};
</script>
