<template src="./template.html"></template>

<script>
import qs from "qs"
import Breadcrumb from "@/components/Breadcrumb/"
import FroalaEditor from "@/components/FroalaEditor/"
import CommentDialog from "@/components/OrderEdit/CommentDialog"
import PrintOrder from "@/components/OrderEdit/PrintOrder"
export default {
  name: "OrderEdit",
  components: {
    Breadcrumb,
    FroalaEditor,
    CommentDialog,
    PrintOrder
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "所有訂單",
          link: "/orders"
        },
        {
          title: "管理訂單",
          link: ""
        }
      ],
      status_array: {
        W: {
          label: "尚未付款",
          color: "",
          "text-color": ""
        },
        P: {
          label: "完成付款",
          color: "primary",
          "text-color": "white"
        },
        S: {
          label: "已出貨",
          color: "green",
          "text-color": "white"
        },
        N: {
          label: "已取消",
          color: "black",
          "text-color": "white"
        }
      },
      order_data: null,
    }
  },
  methods: {
    async GetOrders() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "orders/get_order_admin.php", qs.stringify({ order_id: this.$route.params.id }))
      if (result != "error") {
        this.order_data = JSON.parse(result.data)
      }
    },
    OpenCommentDialog() {
      this.$refs.CommentDialog.Open(this.order_data.order_comment)
    },
    Print() {
      this.$refs.PrintOrder.Print()
    },
    GetStatusActive(label) {
      return label == this.status_array[this.order_data.status].label ? "primary" : ""
    },
    async UpdateStatus(index) {
      if (index != this.order_data.status) {
        let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "orders/update_order_status.php", qs.stringify({ order_id: this.$route.params.id, status: index }))
        if (result != "error") {
          this.GetOrders()
        }
      }
    },
    async Refund() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "orders/refund_order.php", qs.stringify({ order_data: { type: 'zero_card', id: this.$route.params.id } }))
      if (result != "error") {
        this.$store.commit("SetDialog", { title: "已成功申請退款", content: "提醒您，零卡分期退款需要幾個工作天確認後才會將額度退還給消費者，有任何疑問請與零卡分期客服聯絡。", status: true })
        this.GetOrders()
      }
    }
  },
  computed: {},
  created() {
    this.GetOrders()
  },
  filters: {
    money_format(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
}
</script>
<style>
.image_card {
  transition: opacity 0.4s ease-in-out;
  cursor: grab;
}

.img_card_control {
  background-color: rgba(0, 0, 0, 0.541);
  transition: opacity 0.4s ease-in-out;
  opacity: 0;
}
.img_card_control.show {
  opacity: 1;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>