<template src="./template.html"></template>

<script>
import { getQuestionAndCategory } from "@/api/question";
import ListShow from "@/components/Questions/ListShow/index";
import CategoryListShow from "@/components/Questions/CategoryListShow/index";
import Breadcrumb from "@/components/Breadcrumb/";
import category_components from "@/components/Questions/category_components.js";
import question_components from "@/components/Questions/question_components.js";
export default {
  name: "Questions",
  mixins: [category_components, question_components],
  components: {
    ListShow,
    CategoryListShow,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "頁面編輯",
          link: "",
        },
        {
          title: "常見問題",
          link: "",
        },
      ],
      question_categories: [],
      questions_data: [],
    };
  },
  methods: {
    async GetQuestionsData() {
      getQuestionAndCategory().then((res) => {
        console.log(res);
        this.question_categories = res[0].data;
        this.questions_data = res[1].data;
        this.CheckSort();
      });
    },
    CheckSort() {
      let is_sort = true;
      this.question_categories.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateQuestionsCategorySort();

      is_sort = true;
      this.questions_data.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateQuestionsSort();
    },
  },
  created() {
    this.GetQuestionsData();
  },
};
</script>
