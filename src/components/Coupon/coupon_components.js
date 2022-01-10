import {
    create_coupon,
    update_coupon,
    delete_coupon
} from "@/api/coupon";

import CreateDialog from "@/components/Coupon/CreateDialog/";
import EditDialog from "@/components/Coupon/EditDialog/";
import DeleteDialog from "@/components/Coupon/DeleteDialog/index";
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
            create_coupon(item).then((res) => {
                if (res.code == 200) {
                    this.GetCouponData();
                    this.$refs.CreateDialog.Cancel();
                }
            });
        },
        async SendUpdateData(item) {
            update_coupon(item).then((res) => {
                if (res.code == 200) {
                    this.GetCouponData();
                    this.$refs.EditDialog.Cancel();
                }
            });
        },
        async SendDeleteData(id) {
            delete_coupon(id).then((res) => {
                if (res.code == 200) {
                    this.GetCouponData();
                    this.$refs.DeleteDialog.Cancel();
                }
            });
        },
    }
}