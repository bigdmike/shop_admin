<template src="./template.html"></template>

<script>
import qs from "qs"
import FilterDialog from "@/components/Categories/FilterDialog/index"
import EditDialog from "@/components/Categories/EditDialog/index"
import CreateDialog from "@/components/Categories/CreateDialog/index"
import DeleteDialog from "@/components/Categories/DeleteDialog/index"
import ListShow from "@/components/Categories/ListShow/index"
export default {
  name: "Categories",
  components: {
    FilterDialog,
    DeleteDialog,
    ListShow,
    EditDialog,
    CreateDialog
  },
  data() {
    return {
      filter_data: {
        status: "all"
      },
      product_category_data: [
      ],
      product_data: null,
      key_word: "",
    }
  },
  methods: {
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open()
    },
    OpenCreateDialog() {
      this.$refs.CreateDialog.Open()
    },
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id)
    },
    OpenEditDialog(item) {
      this.$refs.EditDialog.Open(item)
    },
    async GetProductData() {
      let result = await this.SendGetData(process.env.VUE_APP_BASE_API + "products/get_product_list.php")
      if (result != "error") {
        console.log(JSON.parse(result.data))
        this.product_data = JSON.parse(result.data).products
        this.product_data == null ? this.product_data = [] : ""
        this.product_category_data = JSON.parse(result.data).category
        this.product_category_data.sort((a, b) => {
          return a.position - b.position
        })
        this.CheckSort()
      }
    },
    CheckSort() {
      let is_sort = true
      this.product_category_data.forEach((item, item_index) => {
        item.position == item_index + 1 ? "" : is_sort = false
      })
      is_sort ? "" : this.UpdateCategorySort()
    },
    async UpdateCategorySort() {
      let data = []
      this.product_category_data.forEach(item => {
        data.push(
          {
            category_id: item.category_id,
            position: item.position
          }
        )
      })
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "products/update_category_position.php", qs.stringify({ post_data: data }))
      if (result.status != "error") {
        this.GetProductData()
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