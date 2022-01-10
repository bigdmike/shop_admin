import {
    create_mascot,
    update_mascot,
    delete_mascot,
    update_mascot_sort,
    update_mascot_image
} from "@/api/mascot";

import CreateDialog from "@/components/Mascot/CreateDialog/";
import EditDialog from "@/components/Mascot/EditDialog/";
import DeleteDialog from "@/components/Mascot/DeleteDialog/index";
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
            create_mascot(item).then((res) => {
                if (res.code == 200) {
                    update_mascot_image(res.data.MascotID, item).then(() => {
                        this.GetMascotData();
                        this.$refs.CreateDialog.Cancel();
                    })
                }
            });
        },
        async SendUpdateData(item) {
            update_mascot(item).then((res) => {
                if (res.code == 200) {
                    if (item.Image1 != null) {
                        update_mascot_image(item.ID, item).then(() => {
                            this.GetMascotData();
                            this.$refs.EditDialog.Cancel();
                        })
                    } else {
                        this.GetMascotData();
                        this.$refs.EditDialog.Cancel();
                    }
                }
            });
        },
        async SendDeleteData(id) {
            delete_mascot(id).then((res) => {
                if (res.code == 200) {
                    this.GetMascotData();
                    this.$refs.DeleteDialog.Cancel();
                }
            });
        },
        async UpdateMascotSort() {
            let data = [];
            this.mascot_data.forEach((item, item_index) => {
                data.push({
                    ID: item.MascotID,
                    Seq: item_index + 1,
                });
            });
            update_mascot_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetMascotData();
                }
            });
        },
    }
}