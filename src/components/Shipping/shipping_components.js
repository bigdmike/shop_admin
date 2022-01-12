import {
    update_shipping,
} from "@/api/shipping";

import EditDialog from "@/components/Shipping/EditDialog/";
export default {
    components: {
        EditDialog,
    },
    methods: {

        OpenEditDialog(item) {
            console.log(item)
            this.$refs.EditDialog.Open(item);
        },
        async SendUpdateData(item) {
            update_shipping(item).then((res) => {
                if (res.code == 200) {
                    this.GetShippingData();
                    this.$refs.EditDialog.Cancel();
                }
            });
        },
    }
}