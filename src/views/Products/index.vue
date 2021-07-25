<template src="./template.html"></template>

<script>
import FilterDialog from "@/components/Products/FilterDialog/index"
import GridShow from "@/components/Products/GridShow/index"
import ListShow from "@/components/Products/ListShow/index"
export default {
  name: "Products",
  components: {
    FilterDialog,
    GridShow,
    ListShow
  },
  data() {
    return {
      filter_data: {
        status: "all",
        category: "all"
      },
      product_status_data: [
        {
          label: "全部",
          value: "all"
        },
        {
          label: "未上架",
          value: "N"
        },
        {
          label: "已上架",
          value: "Y"
        }
      ],
      product_category_data: [
      ],
      product_data: null,
      key_word: "",
      show_type: "list"
    }
  },
  methods: {
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open()
    },
    ChangeShowType() {
      console.log(this.show_type)
      this.show_type == 'list' ? this.show_type = "grid" : this.show_type = "list"
      console.log(this.show_type)
    },
    async GetProductData() {
      let result = await this.SendGetData(process.env.VUE_APP_BASE_API + "products/get_product_list.php")
      if (result != "error") {
        console.log(JSON.parse(result.data))
        this.product_data = JSON.parse(result.data).products
        this.product_category_data.push({ category_id: "all", name: "全部" })
        this.product_category_data = this.product_category_data.concat(JSON.parse(result.data).category)
      }
    }
  },
  created() {
    this.GetProductData()
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