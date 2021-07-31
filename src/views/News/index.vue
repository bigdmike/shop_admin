<template src="./template.html"></template>

<script>
import qs from "qs"
import FilterDialog from "@/components/News/FilterDialog/index"
import DeleteDialog from "@/components/News/DeleteDialog/index"
import ListShow from "@/components/News/ListShow/index"
import Breadcrumb from "@/components/Breadcrumb/"
export default {
  name: "News",
  components: {
    FilterDialog,
    DeleteDialog,
    ListShow,
    Breadcrumb
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "頁面編輯",
          link: ""
        },
        {
          title: "最新消息",
          link: ""
        }
      ],
      filter_data: {
        status: "all"
      },
      news_data: null,
      key_word: "",
    }
  },
  methods: {
    OpenFilterDialog() {
      this.$refs.FilterDialog.Open()
    },
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id)
    },
    async GetNewsData() {
      let result = await this.SendGetData(process.env.VUE_APP_BASE_API + "news/get_news_list.php")
      if (result != "error") {
        this.news_data = JSON.parse(result.data)
        this.news_data == null ? this.news_data = [] : ""
        this.news_data.sort((a, b) => {
          return a.position - b.position
        })
        this.CheckSort()
      }
    },
    CheckSort() {
      let is_sort = true
      this.news_data.forEach((item, item_index) => {
        item.position == item_index + 1 ? "" : is_sort = false
      })
      is_sort ? "" : this.UpdateVideoSort()
    },
    async UpdateVideoSort() {
      let data = []
      this.news_data.forEach(item => {
        data.push(
          {
            news_id: item.news_id,
            position: item.position
          }
        )
      })
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "news/update_news_position.php", qs.stringify({ news_data: data }))
      if (result.status != "error") {
        this.GetNewsData()
      }
    }
  },
  created() {
    this.GetNewsData()
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