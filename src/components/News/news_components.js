import {
    create_news,
    update_news,
    delete_news,
    update_news_sort,
    update_news_image
} from "@/api/news";

import CreateDialog from "@/components/News/CreateDialog/";
import EditDialog from "@/components/News/EditDialog/";
import DeleteDialog from "@/components/News/DeleteDialog/index";
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
            create_news(item).then((res) => {
                if (res.code == 200) {
                    update_news_image(res.data.NewsID, item).then(() => {
                        this.GetNewsData();
                        this.$refs.CreateDialog.Cancel();
                    })
                }
            });
        },
        async SendUpdateData(item) {
            update_news(item).then((res) => {
                if (res.code == 200) {
                    if (item.Image1 != null) {
                        update_news_image(item.ID, item).then(() => {
                            this.GetNewsData();
                            this.$refs.EditDialog.Cancel();
                        })
                    } else {
                        this.GetNewsData();
                        this.$refs.EditDialog.Cancel();
                    }
                }
            });
        },
        async SendDeleteData(id) {
            delete_news(id).then((res) => {
                if (res.code == 200) {
                    this.GetNewsData();
                    this.$refs.DeleteDialog.Cancel();
                }
            });
        },
        async UpdateNewsSort() {
            let data = [];
            this.news_data.forEach((item, item_index) => {
                data.push({
                    ID: item.NewsID,
                    Seq: item_index + 1,
                });
            });
            update_news_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetNewsData();
                }
            });
        },
    }
}