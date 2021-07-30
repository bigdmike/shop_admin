<template src="./template.html"></template>

<script>
import qs from "qs"
import FilterDialog from "@/components/Videos/FilterDialog/index"
import DeleteDialog from "@/components/Videos/DeleteDialog/index"
import ListShow from "@/components/Videos/ListShow/index"
export default {
  name: "Videos",
  components: {
    FilterDialog,
    DeleteDialog,
    ListShow,
  },
  data() {
    return {
      filter_data: {
        status: "all"
      },
      video_data: null,
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
    async GetVideoData() {
      let result = await this.SendGetData(process.env.VUE_APP_BASE_API + "videos/get_video_list.php")
      if (result != "error") {
        console.log(JSON.parse(result.data))
        this.video_data = JSON.parse(result.data)
        this.video_data == null ? this.video_data = [] : ""
        this.video_data.sort((a, b) => {
          return a.position - b.position
        })
        this.CheckSort()
      }
    },
    CheckSort() {
      let is_sort = true
      this.video_data.forEach((item, item_index) => {
        item.position == item_index + 1 ? "" : is_sort = false
      })
      is_sort ? "" : this.UpdateVideoSort()
    },
    async UpdateVideoSort() {
      let data = []
      this.video_data.forEach(item => {
        data.push(
          {
            video_id: item.video_id,
            position: item.position
          }
        )
      })
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "videos/update_video_position.php", qs.stringify({ video_data: data }))
      if (result.status != "error") {
        this.GetVideoData()
      }
    }
  },
  created() {
    this.GetVideoData()
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