import {
    create_categories,
    update_categories,
    delete_categories,
    update_categories_sort,
} from "@/api/question";

import CategoryDeleteDialog from "@/components/Questions/DeleteCategoryDialog/";
import CategoryCreateDialog from "@/components/Questions/CategoryCreateDialog/";
import CategoryEditDialog from "@/components/Questions/CategoryEditDialog/";
export default {
    components: {
        CategoryDeleteDialog,
        CategoryCreateDialog,
        CategoryEditDialog
    },
    methods: {
        OpenCreateCategoryDialog() {
            this.$refs.CategoryCreateDialog.Open();
        },
        OpenEditCategoryDialog(item) {
            this.$refs.CategoryEditDialog.Open(item);
        },
        OpenDeleteCategoryDialog(item) {
            this.$refs.CategoryDeleteDialog.Open(item);
        },
        async SendCreateCategoryData(category_item) {
            create_categories(category_item).then((res) => {
                if (res.code == 200) {
                    this.GetQuestionsData();
                    this.$refs.CategoryCreateDialog.Cancel();
                }
            });
        },
        async SendUpdateCategoryData(category_item) {
            update_categories(category_item).then((res) => {
                if (res.code == 200) {
                    this.GetQuestionsData();
                    this.$refs.CategoryEditDialog.Cancel();
                }
            });
        },
        async SendDeleteCategoryData(id) {
            delete_categories(id).then((res) => {
                if (res.code == 200) {
                    this.GetQuestionsData();
                    this.$refs.CategoryDeleteDialog.Cancel();
                }
            });
        },
        async UpdateQuestionsCategorySort() {
            let data = [];
            this.question_categories.forEach((item, item_index) => {
                data.push({
                    ID: item.QuestionCategoryID,
                    Seq: item_index + 1,
                });
            });
            update_categories_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetQuestionsData();
                }
            });
        },
    }
}