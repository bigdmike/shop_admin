<template src="./template.html"></template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "OrderListShow",
  props: {
    filter_data: {
      require: true,
      type: Object
    },
    order_status_data: {
      require: true,
      type: Array
    },
    order_payment_data: {
      require: true,
      type: Array
    },
    value: {
      require: true,
      type: Array
    },
    key_word: {
      require: true,
      type: String
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      order_sort_array: [],
      drag: false,
      headers: [
        { text: '訂單編號', value: 'order_id' },
        { text: '訂單日期', value: 'create_time' },
        { text: '客戶姓名', value: 'name' },
        { text: '訂單狀態', value: 'status' },
        { text: '總金額', value: 'total_price' },
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
        }
      }
    }
  },
  methods: {
    ChangeSort() {
      this.order_sort_array = []
      this.value.forEach(item => {
        this.order_sort_array.push(item.sort)
      })
      this.$emit("input", this.filter_value)
    },
  },
  created() {
    this.order_sort_array = []
    this.value.forEach(item => {
      this.order_sort_array.push(item.sort)
    })
  },
  computed: {
    filter_value: {
      get() {
        {
          let data = JSON.parse(JSON.stringify(this.value))
          if (this.key_word != "") {
            data = data.filter(item => {
              return item.name.indexOf(this.key_word) != -1 || item.phone.indexOf(this.key_word) != -1 || item.address.indexOf(this.key_word) != -1 || item.email.indexOf(this.key_word) != -1 || item.order_id == this.key_word
            })
          }
          if (this.filter_data.status != "all") {
            data = data.filter(item => item.status == this.filter_data.status)
          }
          if (this.filter_data.payment != "all") {
            data = data.filter(item => item.payment == this.filter_data.payment)
          }
          return data
        }
      },
      set(val) {
        let original = JSON.parse(JSON.stringify(val)).sort((a, b) => {
          return a.sort - b.sort
        })
        let tmp_data = JSON.parse(JSON.stringify(this.value))

        original.forEach((item, item_index) => {
          tmp_data.forEach(data => {
            data.id == val[item_index].id ? data.sort = item.sort : ""
          })
        })
        tmp_data.sort((a, b) => {
          return a.sort - b.sort
        })
        this.$emit("input", tmp_data)

      }
    }
  },
  filters: {
    money_format(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }

}
</script>

<style >
.opacity-0 {
  opacity: 0;
}
.page__grab-icon {
  cursor: grab;
}
</style>