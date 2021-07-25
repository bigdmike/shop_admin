<template src="./template.html"></template>

<script>
import FilterDialog from "@/components/Orders/FilterDialog/index"
import ListShow from "@/components/Orders/ListShow/index"
export default {
  name: "Products",
  components: {
    FilterDialog,
    ListShow
  },
  data() {
    return {
      filter_data: {
        status: "all",
        payment: "all"
      },
      order_status_data: [
        {
          label: "全部",
          value: "all"
        },
        {
          label: "尚未付款",
          value: "W"
        },
        {
          label: "已付款",
          value: "P"
        },
        {
          label: "已出貨",
          value: "S"
        }
      ],
      order_payment_data: [
        {
          label: "全部",
          value: "all"
        },
        {
          label: "信用卡",
          value: "Credit"
        },
        {
          label: "ATM",
          value: "ATM"
        },
        {
          label: "超商代碼",
          value: "CVS"
        }
      ],
      order_data: [

      ],
      key_word: "",
      show_type: "list"
    }
  },
  methods: {
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open()
    },
    async GetOrders() {
      let result = await this.SendGetData(process.env.VUE_APP_BASE_API + "orders/get_orders_admin.php")
      if (result != "error") {
        this.order_data = JSON.parse(result.data)
      }
    }
  },
  created() {
    this.GetOrders()
  },
  computed: {
  }
}
</script>

<style >
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