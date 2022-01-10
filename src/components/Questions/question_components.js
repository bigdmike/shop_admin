import {
    create_question,
    update_question,
    delete_question,
    update_question_sort,
} from "@/api/question";

import CreateDialog from "@/components/Questions/CreateDialog/";
import EditDialog from "@/components/Questions/EditDialog/";
import DeleteDialog from "@/components/Questions/DeleteDialog/index";
export default {
    components: {
        CreateDialog,
        EditDialog,
        DeleteDialog
    },
    methods: {
        OpenCreateDialog() {
            this.$refs.CreateDialog.Open();
        },
        OpenEditDialog(item) {
            this.$refs.EditDialog.Open(item);
        },
        OpenDeleteDialog(id) {
            this.$refs.DeleteDialog.Open(id);
        },
        async SendCreateData(item) {
            create_question(item).then((res) => {
                if (res.code == 200) {
                    this.GetQuestionsData();
                    this.$refs.CreateDialog.Cancel();
                }
            });
        },
        async SendUpdateData(item) {
            update_question(item).then((res) => {
                if (res.code == 200) {
                    this.GetQuestionsData();
                    this.$refs.EditDialog.Cancel();
                }
            });
        },
        async SendDeleteData(id) {
            delete_question(id).then((res) => {
                if (res.code == 200) {
                    this.GetQuestionsData();
                    this.$refs.DeleteDialog.Cancel();
                }
            });
        },
        async UpdateQuestionsSort() {
            let data = [];
            this.questions_data.forEach((item, item_index) => {
                data.push({
                    ID: item.QuestionID,
                    Seq: item_index + 1,
                });
            });
            update_question_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetQuestionsData();
                }
            });
        },
    }
}