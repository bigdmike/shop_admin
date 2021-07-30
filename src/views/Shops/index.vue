<template src="./template.html"></template>

<script>
import FilterDialog from "@/components/Shops/FilterDialog/index"
import DeleteDialog from "@/components/Shops/DeleteDialog/index"
import ListShow from "@/components/Shops/ListShow/index"
import CreateDialog from "@/components/Shops/CreateDialog/"
export default {
  name: "Shops",
  components: {
    FilterDialog,
    DeleteDialog,
    ListShow,
    CreateDialog
  },
  data() {
    return {
      filter_data: {
        status: "all"
      },
      shop_data: null,
      key_word: "",
    }
  },
  methods: {
    OpenCreateDialog() {
      this.$refs.CreateDialog.Open()
    },
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open()
    },
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id)
    },
    async GetShopsData() {
      let result = await this.SendGetData(process.env.VUE_APP_BASE_API + "shop/get_shop_list.php")
      if (result != "error") {
        console.log(JSON.parse(result.data))
        this.shop_data = JSON.parse(result.data)
        this.shop_data == null ? this.shop_data = [] : ""
      }
    },
  },
  created() {
    this.GetShopsData()
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