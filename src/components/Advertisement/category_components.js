import {
    create_categories,
    update_categories,
    delete_categories,
    update_categories_sort,
} from "@/api/advertisement";

import CategoryDeleteDialog from "@/components/Advertisement/DeleteCategoryDialog/";
import CategoryCreateDialog from "@/components/Advertisement/CategoryCreateDialog/";
import CategoryEditDialog from "@/components/Advertisement/CategoryEditDialog/";
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
            this.ad_categories.forEach((item, item_index) => {
                data.push({
                    ID: parseInt(item.AdvertisementCategoryID),
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