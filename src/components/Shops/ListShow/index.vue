<template src="./template.html"></template>

<script>
import EditDialog from "@/components/Shops/EditDialog/"
export default {
  name: "CategoryListShow",
  props: {
    filter_data: {
      require: true,
      type: Object
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
    EditDialog
  },
  data() {
    return {
      headers: [
        {
          text: '經銷名稱',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '地址', value: 'address' },
        { text: '狀態', value: 'status' },
        { text: '動作', value: 'action' },
      ],
      status_array: {
        Y: "已啟用",
        N: "已停用"
      }
    }
  },
  methods: {
    OpenEdit(item) {
      this.$refs.EditDialog.Open(item)
    }
  },
  created() {
  },
  computed: {
    filter_value: {
      get() {
        {
          let data = JSON.parse(JSON.stringify(this.value))
          if (this.key_word != "") {
            data = data.filter(item => item.name.indexOf(this.key_word) != -1 || item.address.indexOf(this.key_word) != -1 || item.phone.indexOf(this.key_word) != -1)
          }
          if (this.filter_data.status != "all") {
            data = data.filter(item => item.status == this.filter_data.status)
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