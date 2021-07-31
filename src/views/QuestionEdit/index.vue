<template src="./template.html"></template>

<script>
import qs from "qs"
import Breadcrumb from "@/components/Breadcrumb/"
import FroalaEditor from "@/components/FroalaEditor/"
import DeleteDialog from "@/components/News/DeleteDialog/index"
export default {
  name: "QuestionEdit",
  components: {
    Breadcrumb,
    FroalaEditor,
    DeleteDialog
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "所有問答",
          link: "/questions"
        },
        {
          title: "問答編輯",
          link: ""
        }
      ],
      status_data: [
        {
          label: "已發布",
          value: "Y"
        },
        {
          label: "隱藏",
          value: "N"
        },
      ],
      question_data: null,
      drag: false
    }
  },
  methods: {
    async UpdateData() {

      //檢查images options category name
      let error = ""
      if (this.question_data.title == "") {
        error += "- 請輸入問答標題 <br>"
      }
      if (this.question_data.description == "") {
        error += "- 請輸入問答內容 <br>"
      }
      if (error == "") {
        this.UpdateQuestions()
      }
      else {
        error = "無法儲存問答請修正以下問題：<br>" + error
        this.$store.commit("SetDialog", { title: "發生錯誤", content: error, status: true })
      }
    },
    CancelEdit() {
      this.$router.push("/news")
    },
    async GetQuestionsData() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "questions/get_questions.php", qs.stringify({ id: this.$route.params.id }))
      if (result != "error") {
        this.question_data = JSON.parse(result.data)
        if (this.question_data.length <= 0) {
          this.$router.push("/questions")
        }
      }
    },
    OpenDeleteDialog() {
      this.$refs.DeleteDialog.Open(this.$route.params.id)
    },

    async UpdateQuestions() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "questions/update_questions.php", qs.stringify({
        question_data: this.question_data
      }
      ))
      if (result.status == "success") {
        this.$store.commit("SetSnackbar", {
          content: "問答已更新",
          status: true
        })
        this.GetQuestionsData()
      }
    }
  },
  created() {
    this.GetQuestionsData()
  }
}
</script>
<style>
.image_card {
  transition: opacity 0.4s ease-in-out;
  cursor: grab;
}

.img_card_control {
  background-color: rgba(0, 0, 0, 0.541);
  transition: opacity 0.4s ease-in-out;
  opacity: 0;
}
.img_card_control.show {
  opacity: 1;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>