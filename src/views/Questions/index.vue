<template src="./template.html"></template>

<script>
import qs from "qs"
import FilterDialog from "@/components/Questions/FilterDialog/index"
import DeleteDialog from "@/components/Questions/DeleteDialog/index"
import ListShow from "@/components/Questions/ListShow/index"
export default {
  name: "Questions",
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
      questions_data: null,
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
    async GetQuestionsData() {
      let result = await this.SendGetData(process.env.VUE_APP_BASE_API + "questions/get_questions_list.php")
      if (result != "error") {
        console.log(JSON.parse(result.data))
        this.questions_data = JSON.parse(result.data)
        this.questions_data == null ? this.questions_data = [] : ""
        this.questions_data.sort((a, b) => {
          return a.position - b.position
        })
        this.CheckSort()
      }
    },
    CheckSort() {
      let is_sort = true
      this.questions_data.forEach((item, item_index) => {
        item.position == item_index + 1 ? "" : is_sort = false
      })
      is_sort ? "" : this.UpdateQuestionsSort()
    },
    async UpdateQuestionsSort() {
      let data = []
      this.questions_data.forEach(item => {
        data.push(
          {
            question_id: item.question_id,
            position: item.position
          }
        )
      })
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "questions/update_questions_position.php", qs.stringify({ questions_data: data }))
      if (result.status != "error") {
        this.GetQuestionsData()
      }
    }
  },
  created() {
    this.GetQuestionsData()
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