<template src="./template.html"></template>

<script>
import qs from "qs"
import Breadcrumb from "@/components/Breadcrumb/"
import FroalaEditor from "@/components/FroalaEditor/"
import DeleteDialog from "@/components/News/DeleteDialog/index"
export default {
  name: "NewsEdit",
  components: {
    Breadcrumb,
    FroalaEditor,
    DeleteDialog
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "所有文章",
          link: "/news"
        },
        {
          title: "文章編輯",
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
      type_data: [
        "最新消息",
        "重要公告",
        "活動消息"
      ],
      news_data: {
        news_id: 0,
        title: '',
        category: "最新消息",
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
      if (this.news_data.title == "") {
        error += "- 請輸入文章標題 <br>"
      }
      if (this.news_data.category == "") {
        error += "- 請選擇文章分類 <br>"
      }
      if (error == "") {
        this.UpdateNews()
      }
      else {
        error = "無法儲存文章請修正以下問題：<br>" + error
        this.$store.commit("SetDialog", { title: "發生錯誤", content: error, status: true })
      }
    },
    CancelEdit() {
      this.$router.push("/news")
    },
    async GetNewsData() {
      this.news_data = {
        news_id: 0,
        title: '',
        category: "最新消息",
        description: "",
        status: "Y"
      }
    },
    OpenDeleteDialog() {
      this.$refs.DeleteDialog.Open(this.$route.params.id)
    },

    async UpdateNews() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "news/create_news.php", qs.stringify({
        news_data: this.news_data
      }
      ))
      if (result.status == "success") {
        this.$store.commit("SetSnackbar", {
          content: "文章已新增",
          status: true
        })
        this.$router.push("/news")
      }
    }
  },
  created() {
    this.GetNewsData()
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