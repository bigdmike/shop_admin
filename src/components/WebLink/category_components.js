import {
    create_categories,
    update_categories,
    delete_categories,
    update_categories_sort,
} from "@/api/web_links";

import CategoryDeleteDialog from "@/components/WebLink/DeleteCategoryDialog/";
import CategoryCreateDialog from "@/components/WebLink/CategoryCreateDialog/";
import CategoryEditDialog from "@/components/WebLink/CategoryEditDialog/";
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
                    this.GetWebLinkData();
                    this.$refs.CategoryCreateDialog.Cancel();
                }
            });
        },
        async SendUpdateCategoryData(category_item) {
            update_categories(category_item).then((res) => {
                if (res.code == 200) {
                    this.GetWebLinkData();
                    this.$refs.CategoryEditDialog.Cancel();
                }
            });
        },
        async SendDeleteCategoryData(id) {
            delete_categories(id).then((res) => {
                if (res.code == 200) {
                    this.GetWebLinkData();
                    this.$refs.CategoryDeleteDialog.Cancel();
                }
            });
        },
        async UpdateWebLinkCategorySort() {
            let data = [];
            this.weblink_categories.forEach((item, item_index) => {
                data.push({
                    ID: item.WebLinkCategoryID,
                    Seq: item_index + 1,
                });
            });
            update_categories_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetWebLinkData();
                }
            });
        },
    }
}