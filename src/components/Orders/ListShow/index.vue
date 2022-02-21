<template src="./template.html"></template>

<script>
import draggable from "vuedraggable";
export default {
  name: "OrderListShow",
  props: {
    filter_data: {
      require: true,
      type: Object,
    },
    order_status_data: {
      require: true,
      type: Array,
    },
    order_payment_data: {
      require: true,
      type: Array,
    },
    value: {
      require: true,
      type: Array,
    },
    key_word: {
      require: true,
      type: String,
    },
  },
  components: {
    draggable,
  },
  data() {
    return {
      headers: [
        { text: "訂單編號", value: "TradeID" },
        { text: "訂單日期", value: "created_at" },
        { text: "客戶姓名", value: "ReceiverName" },
        { text: "訂單狀態", value: "status" },
        { text: "總金額", value: "total_price" },
      ],
      status_array: {
        W: {
          label: "尚未付款",
          color: "",
          "text-color": "",
        },
        P: {
          label: "完成付款",
          color: "primary",
          "text-color": "white",
        },
        S: {
          label: "已出貨",
          color: "green",
          "text-color": "white",
        },
        C: {
          label: "已取消",
          color: "black",
          "text-color": "white",
        },
      },
    };
  },
  methods: {},
  created() {},
  computed: {
    filter_value: {
      get() {
        {
          let data = JSON.parse(JSON.stringify(this.value));
          if (this.key_word != "") {
            data = data.filter((item) => {
              return (
                item.ReceiverName.indexOf(this.key_word) != -1 ||
                item.ReceiverPhone.indexOf(this.key_word) != -1 ||
                item.ReceiverAddress.indexOf(this.key_word) != -1 ||
                item.ReceiverEmail.indexOf(this.key_word) != -1 ||
                item.TradeID == this.key_word
              );
            });
          }
          if (this.filter_data.status != "all") {
            data = data.filter(
              (item) => item.status == this.filter_data.Status
            );
          }
          return data;
        }
      },
    },
  },
  filters: {
    money_format(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style >
.opacity-0 {
  opacity: 0;
}
.page__grab-icon {
  cursor: grab;
}
</style>