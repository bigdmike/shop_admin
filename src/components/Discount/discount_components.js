import {
    create_discount,
    update_discount,
    delete_discount
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
            create_discount(item).then((res) => {
                if (res.code == 200) {
                    this.GetDiscountData();
                    this.$refs.CreateDialog.Cancel();
                }
            });
        },
        async SendUpdateData(item) {
            update_discount(item).then((res) => {
                if (res.code == 200) {
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