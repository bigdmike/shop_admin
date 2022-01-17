import {
    create_discount,
    update_discount,
    delete_discount,
    update_menu_image
} from "@/api/discount";

import CreateDialog from "@/components/Discount/CreateDialog/";
import EditDialog from "@/components/Discount/EditDialog/";
import DeleteDialog from "@/components/Discount/DeleteDialog/index";
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
            let tmp_data = Object.assign({}, item)
            create_discount(tmp_data).then(() => {
                if (item.Image1 != '' && item.Image1 != null) {
                    update_menu_image(item.ID, item).then(() => {
                        this.GetDiscountData();
                        this.$refs.CreateDialog.Cancel();
                    })
                } else {
                    this.GetDiscountData();
                    this.$refs.CreateDialog.Cancel();
                }
            });
        },
        async SendUpdateData(item) {
            let tmp_data = Object.assign({}, item)
            delete tmp_data.Image1
            update_discount(tmp_data).then(() => {
                if (item.Image1 != '' && item.Image1 != null) {
                    update_menu_image(item.ID, item).then(() => {
                        this.GetDiscountData();
                        this.$refs.EditDialog.Cancel();
                    })
                } else {
                    this.GetDiscountData();
                    this.$refs.EditDialog.Cancel();
                }
            });
        },
        async SendDeleteData(id) {
            delete_discount(id).then((res) => {
                if (res.code == 200) {
                    this.GetDiscountData();
                    this.$refs.DeleteDialog.Cancel();
                }
            });
        },
    }
}