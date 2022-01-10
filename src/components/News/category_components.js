import {
    create_categories,
    update_categories,
    delete_categories,
    update_categories_sort,
} from "@/api/news";

import CategoryDeleteDialog from "@/components/News/DeleteCategoryDialog/";
import CategoryCreateDialog from "@/components/News/CategoryCreateDialog/";
import CategoryEditDialog from "@/components/News/CategoryEditDialog/";
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
                    this.GetNewsData();
                    this.$refs.CategoryCreateDialog.Cancel();
                }
            });
        },
        async SendUpdateCategoryData(category_item) {
            update_categories(category_item).then((res) => {
                if (res.code == 200) {
                    this.GetNewsData();
                    this.$refs.CategoryEditDialog.Cancel();
                }
            });
        },
        async SendDeleteCategoryData(id) {
            delete_categories(id).then((res) => {
                if (res.code == 200) {
                    this.GetNewsData();
                    this.$refs.CategoryDeleteDialog.Cancel();
                }
            });
        },
        async UpdateNewsCategorySort() {
            let data = [];
            this.news_categories.forEach((item, item_index) => {
                data.push({
                    ID: item.NewsCategoryID,
                    Seq: item_index + 1,
                });
            });
            update_categories_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetNewsData();
                }
            });
        },
    }
}