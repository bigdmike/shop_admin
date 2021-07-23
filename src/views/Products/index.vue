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
        {
          label: "全部商品",
          value: "all"
        },
        {
          label: "GOGORO",
          value: "1"
        },
        {
          label: "AEON",
          value: "2"
        },
        {
          label: "YAMAHA",
          value: "3"
        },
        {
          label: "PGO",
          value: "4"
        }
      ],
      product_data: [
        {
          id: 1,
          name: "GOGORO2",
          category: 1,
          price: "33900",
          status: "Y",
          sort: 1,
          cover: "/img/products/1/1a54172e-6497-49c1-9549-07056213f2bb.jpg",
          image: [
            "/img/products/1/4dbb324d-21a3-4a58-8b36-310d3283d795.jpg",
            "/img/products/1/395eb01b-be65-46c1-9e28-12797f0717a2.jpg"
          ]
        },
        {
          id: 2,
          name: "GOGORO2",
          category: 1,
          price: "20900",
          status: "Y",
          sort: 2,
          cover: "/img/products/1/395eb01b-be65-46c1-9e28-12797f0717a2.jpg",
          image: [
            "/img/products/1/4dbb324d-21a3-4a58-8b36-310d3283d795.jpg",
          ]
        },
        {
          id: 3,
          name: "GOGORO2",
          category: 1,
          price: "44900",
          status: "Y",
          sort: 3,
          cover: "/img/products/2/5e9fa29a-6c90-4dcd-83dd-e1b7e2fcc594.jpg",
          image: [
            "/img/products/1/4dbb324d-21a3-4a58-8b36-310d3283d795.jpg",
          ]
        },
        {
          id: 4,
          name: "GOGORO2",
          category: 1,
          price: "33600",
          status: "N",
          sort: 4,
          cover: "/img/products/2/78eb2070-48ff-44fc-99ee-106262f4845e.jpg",
          image: [
            "/img/products/1/4dbb324d-21a3-4a58-8b36-310d3283d795.jpg",
          ]
        },
        {
          id: 5,
          name: "GOGORO2 S",
          category: 1,
          price: "44900",
          status: "Y",
          sort: 5,
          cover: "/img/products/2/5e9fa29a-6c90-4dcd-83dd-e1b7e2fcc594.jpg",
          image: [
            "/img/products/1/4dbb324d-21a3-4a58-8b36-310d3283d795.jpg",
          ]
        },
        {
          id: 6,
          name: "GOGORO2 ABS",
          category: 1,
          price: "33600",
          status: "N",
          sort: 20,
          cover: "/img/products/2/78eb2070-48ff-44fc-99ee-106262f4845e.jpg",
          image: [
            "/img/products/1/4dbb324d-21a3-4a58-8b36-310d3283d795.jpg",
          ]
        }
      ],
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
    }
  },
  created() {

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