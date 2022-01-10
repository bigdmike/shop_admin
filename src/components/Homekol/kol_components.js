import {
    create_kol,
    update_kol,
    delete_kol,
    update_kol_sort,
    update_kol_image
} from "@/api/kol";

import CreateDialog from "@/components/Homekol/CreateDialog/";
import EditDialog from "@/components/Homekol/EditDialog/";
import DeleteDialog from "@/components/Homekol/DeleteDialog/index";
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
            create_kol(item).then((res) => {
                if (res.code == 200) {
                    update_kol_image(res.data.KolID, item).then(() => {
                        this.GetKOLData();
                        this.$refs.CreateDialog.Cancel();
                    })
                }
            });
        },
        async SendUpdateData(item) {
            update_kol(item).then((res) => {
                if (res.code == 200) {
                    if (item.Image1 != null) {
                        update_kol_image(item.ID, item).then(() => {
                            this.GetKOLData();
                            this.$refs.EditDialog.Cancel();
                        })
                    } else {
                        this.GetKOLData();
                        this.$refs.EditDialog.Cancel();
                    }
                }
            });
        },
        async SendDeleteData(id) {
            delete_kol(id).then((res) => {
                if (res.code == 200) {
                    this.GetKOLData();
                    this.$refs.DeleteDialog.Cancel();
                }
            });
        },
        async UpdateKOLSort() {
            let data = [];
            this.kol_data.forEach((item, item_index) => {
                data.push({
                    ID: item.KolID,
                    Seq: item_index + 1,
                });
            });
            update_kol_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetKOLData();
                }
            });
        },
    }
}