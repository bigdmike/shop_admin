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
          title: "問答新增",
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
      question_data: {
        question_id: 0,
        title: "",
        description: "",
        status: "Y"
      },
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
      console.log("close")
      this.$router.push("/news")
    },
    async GetQuestionsData() {
      this.question_data = {
        question_id: 0,
        title: "",
        description: "",
        status: "Y"
      }
    },
    OpenDeleteDialog() {
      this.$refs.DeleteDialog.Open(this.$route.params.id)
    },
    async UpdateQuestions() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "questions/create_questions.php", qs.stringify({
        question_data: this.question_data
      }
      ))
      if (result.status == "success") {
        this.$store.commit("SetSnackbar", {
          content: "問答已新增",
          status: true
        })
        this.$router.push("/questions")
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