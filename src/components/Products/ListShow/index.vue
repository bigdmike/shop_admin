<template src="./template.html"></template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "ProductListShow",
  props: {
    filter_data: {
      require: true,
      type: Object
    },
    product_status_data: {
      require: true,
      type: Array
    },
    product_category_data: {
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
      product_sort_array: [],
      drag: false,
      headers: [
        { text: '', value: '' },
        {
          text: '商品名稱',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '產品分類', value: 'category' },
        { text: '上架狀態', value: 'status' },
        { text: '價錢', value: 'price' },
      ],
    }
  },
  methods: {
    ChangeSort() {
      this.product_sort_array = []
      this.value.forEach(item => {
        this.product_sort_array.push(item.sort)
      })
      this.$emit("input", this.filter_value)
    },
  },
  created() {
    this.product_sort_array = []
    this.value.forEach(item => {
      this.product_sort_array.push(item.sort)
    })
  },
  computed: {
    filter_value: {
      get() {
        {
          let data = JSON.parse(JSON.stringify(this.value))
          if (this.key_word != "") {
            data = data.filter(item => item.name.indexOf(this.key_word) != -1)
          }
          if (this.filter_data.status != "all") {
            data = data.filter(item => item.status == this.filter_data.status)
          }
          if (this.filter_data.category != "all") {
            data = data.filter(item => item.category == this.filter_data.category)
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