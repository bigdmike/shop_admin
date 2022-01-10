import {
    get_categories,
    create_categories,
    update_categories,
    delete_categories,
    update_categories_sort,
} from "@/api/menu_categroies";

import CategoryDeleteDialog from "@/components/MenuCategories/DeleteCategoryDialog/";
import CategoryCreateDialog from "@/components/MenuCategories/CategoryCreateDialog/";
import CategoryEditDialog from "@/components/MenuCategories/CategoryEditDialog/";
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

        async GetCategoriesData() {
            get_categories().then(res => {
                if (res.code == 200) {
                    this.menu_categories = res.data
                    this.CheckSort()
                }
            })
        },
        async SendCreateCategoryData(category_item) {
            create_categories(category_item).then((res) => {
                if (res.code == 200) {
                    this.GetCategoriesData();
                    this.$refs.CategoryCreateDialog.Cancel();
                }
            });
        },
        async SendUpdateCategoryData(category_item) {
            update_categories(category_item).then((res) => {
                if (res.code == 200) {
                    this.GetCategoriesData();
                    this.$refs.CategoryEditDialog.Cancel();
                }
            });
        },
        async SendDeleteCategoryData(id) {
            delete_categories(id).then((res) => {
                if (res.code == 200) {
                    this.GetCategoriesData();
                    this.$refs.CategoryDeleteDialog.Cancel();
                }
            });
        },
        async UpdateCategorySort() {
            let data = [];
            this.menu_categories.forEach((item, item_index) => {
                data.push({
                    ID: item.MenuCategoryID,
                    Seq: item_index + 1,
                });
            });
            update_categories_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetCategoriesData();
                }
            });
        },
    }
}