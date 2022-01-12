import {
    update_payment,
} from "@/api/payment";

import EditDialog from "@/components/Payment/EditDialog/";
export default {
    components: {
        EditDialog,
    },
    methods: {

        OpenEditDialog(item) {
            this.$refs.EditDialog.Open(item);
        },
        async SendUpdateData(item) {
            update_payment(item).then((res) => {
                if (res.code == 200) {
                    this.GetPaymentData();
                    this.$refs.EditDialog.Cancel();
                }
            });
        },
    }
}