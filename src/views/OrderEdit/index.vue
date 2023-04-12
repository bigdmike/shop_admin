<template src="./template.html"></template>

<script>
import Breadcrumb from '@/components/Breadcrumb/';
import FroalaEditor from '@/components/FroalaEditor/';
import CommentDialog from '@/components/OrderEdit/CommentDialog';
import ShipCodeDialog from '@/components/OrderEdit/ShipCodeDialog';
import PrintOrder from '@/components/OrderEdit/PrintOrder';
import PrintHCT from '@/components/OrderEdit/PrintHCT';
import MainDeleteDialog from '@/components/MainDeleteDialog/index';
import ProductCard from '@/components/OrderEdit/ProductCard/index.vue';
import CustomProductCard from '@/components/OrderEdit/CustomProductCard/index.vue';
import {
  GetOrderList,
  UpdateOrderInfo,
  GetHCTOrder,
  GetCVSOrder,
  CancelOrder,
} from '@/api/order.js';
export default {
  name: 'OrderEdit',
  components: {
    Breadcrumb,
    FroalaEditor,
    CommentDialog,
    ShipCodeDialog,
    PrintOrder,
    PrintHCT,
    MainDeleteDialog,
    ProductCard,
    CustomProductCard,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '所有訂單',
          link: '/orders',
        },
        {
          title: '管理訂單',
          link: '',
        },
      ],
      // 訂單狀態顏色
      status_color: {
        W: '',
        P: 'blue lighten-1 white--text',
        T: 'yellow darken-1 white--text',
        S: 'orange darken-3 white--text',
        A: 'deep-orange darken-3 white--text',
        F: 'green white--text',
        C: 'black white--text',
      },
      // 訂單狀態
      status_array: {
        W: {
          label: '尚未付款',
        },
        P: {
          label: '完成付款',
        },
        T: {
          label: '理貨中',
        },
        S: {
          label: '已出貨',
        },
        A: {
          label: '已送達',
        },
        F: {
          label: '已完成',
        },
        C: {
          label: '已取消',
        },
      },
      products: [],
      discount_list: [],
      coupon_list: [],
      payment_list: [],
      shipway_list: [],
      zip_code: [],
      order_data: null,
      HCT_image: '',
    };
  },
  methods: {
    async GetOrders() {
      GetOrderList().then((res) => {
        this.products = res[3].data;
        this.discount_list = res[5].data;
        this.coupon_list = res[6].data;
        this.payment_list = res[4].data;
        this.shipway_list = res[1].data;
        this.zip_code = res[2].data;
        let order_data = res[0].data.List.filter(
          (item) => item.TradeID == this.$route.params.id
        )[0];
        this.order_data = order_data;
      });
    },
    GetOrderProducts() {
      let order_products = [];
      this.order_data.SubTradeList.forEach((item) => {
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
          tmp_product.Info = this.products.filter(
            (product) => product.GoodsID == item.GoodsID
          )[0];
          tmp_product.Amount = 1;
          console.log(tmp_product);
          tmp_product.Option = tmp_product.Info.Stock.filter(
            (option) =>
              option.ColorID == item.ColorID && option.SizeID == item.SizeID
          )[0];
          order_products.push(tmp_product);
        }
      });
      return order_products;
    },
    GetProductDiscount(id) {
      return this.discount_list.filter((item) => item.DiscountID == id)[0];
    },
    GetCoupon(id) {
      return this.coupon_list.filter((item) => item.CouponID == id)[0];
    },
    GetPayment() {
      console.log(this.payment_list, this.order_data.PaymentID);
      return this.payment_list.filter(
        (item) => item.PaymentID == this.order_data.PaymentID
      )[0];
    },
    GetZipCity(id) {
      return this.zip_code.filter((item) => item.ZipCode == id)[0];
    },
    GetShipway() {
      let ship_way = this.shipway_list.filter(
        (item) => item.ShippingID == this.order_data.ShippingID
      );
      return ship_way.length > 0 ? ship_way[0] : { Title: '查無配送方式' };
    },
    GetHCTOrder() {
      GetHCTOrder(this.order_data.TradeID).then((res) => {
        this.HCT_image = this.$HexToAscii(res.data.image);
        this.$refs.PrintHCT.Print();
        this.GetOrders();
      });
    },
    GetCVSOrder() {
      GetCVSOrder(this.order_data.TradeID).then((res) => {
        if (res.code == 200) {
          let form = res.data.split('<form')[1].split('</form>')[0];
          form =
            '<form' +
            res.data.split('<form')[1].split('</form>')[0] +
            '</form>';
          form = form.replace('target="_self"', 'target="_blank"');
          document.querySelector('.form_area').innerHTML = '';
          document.querySelector('.form_area').innerHTML += form;
          document.querySelector('.form_area form').submit();
        }
      });
    },
    OpenCommentDialog() {
      this.$refs.CommentDialog.Open(this.order_data.AdminMemo);
    },
    OpenShipCodeDialog() {
      this.$refs.ShipCodeDialog.Open(this.order_data.ShippingCode);
    },
    Print() {
      this.$refs.PrintOrder.Print();
    },
    GetStatusActive(label) {
      return label == this.status_array[this.order_data.Status].label
        ? 'primary'
        : '';
    },
    UpdateOrdeShipCode(val) {
      this.order_data.ShippingCode = val;
      UpdateOrderInfo(this.order_data).then(() => {
        this.$refs.ShipCodeDialog.Close();
        this.GetOrders();
        this.$store.commit('SetSnackbar', {
          content: '物流編號已更新',
          status: true,
        });
      });
    },
    UpdateOrderInfo(comment = -1, status = -1) {
      if (status != -1) {
        this.order_data.Status = status;
      }
      if (comment != -1) {
        this.order_data.AdminMemo = comment;
      }
      UpdateOrderInfo(this.order_data).then(() => {
        this.$refs.CommentDialog.Close();
        this.GetOrders();
        this.$store.commit('SetSnackbar', {
          content: '商店備註已更新',
          status: true,
        });
      });
    },
    OpenCancelDialog() {
      this.$refs.MainDeleteDialog.Open(this.order_data.TradeID);
    },
    CancelOrder(id) {
      CancelOrder(id).then((res) => {
        console.log(res);
        this.$refs.MainDeleteDialog.Cancel();
        this.GetOrders();
      });
    },
  },
  computed: {
    status_select_list() {
      let tmp_list = Object.assign({}, this.status_array);
      delete tmp_list.C;
      return tmp_list;
    },
    trade_product_data() {
      if (this.order_data == null || this.order_data == 'error') {
        return [];
      } else {
        let tmp_product_list = JSON.parse(
          JSON.stringify(this.order_data.SubTradeList)
        );
        let product_list = [];

        tmp_product_list.forEach((item) => {
          const product_detail = this.products.filter(
            (product) => product.GoodsID == item.GoodsID
          )[0];
          if (product_detail.IsCustom == 'N') {
            // 一般商品
            let match = -1;
            product_list.forEach((product, product_inndex) => {
              if (
                product.GoodsID == item.GoodsID &&
                product.ColorID == item.ColorID &&
                product.SizeID == item.SizeID
              ) {
                match = product_inndex;
              }
            });
            if (match != -1) {
              product_list[match].Amount += 1;
            } else {
              let tmp_product = Object.assign({}, item);
              tmp_product.Amount = 1;
              tmp_product.ProductData = product_detail;
              product_list.push(tmp_product);
            }
          } else {
            let tmp_product = Object.assign({}, item);
            tmp_product.Amount = 1;
            tmp_product.ProductData = product_detail;
            product_list.push(tmp_product);
          }
        });

        return product_list;
      }
    },
    original_product_price() {
      let price = 0;
      this.trade_product_data.forEach((item) => {
        price += parseInt(item.SellPrice);
      });
      return price;
    },
    discount_price() {
      let price = 0;
      this.trade_product_data.forEach((item) => {
        price += parseInt(item.FinalPrice) - parseInt(item.SellPrice);
      });
      return price;
    },
  },
  created() {
    this.GetOrders();
  },
  filters: {
    money_format(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>
