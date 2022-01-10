import {
    create_advertisement,
    update_advertisement,
    delete_advertisement,
    update_advertisement_sort,
    update_advertisement_image
} from "@/api/advertisement";

import CreateDialog from "@/components/Advertisement/CreateDialog/";
import EditDialog from "@/components/Advertisement/EditDialog/";
import DeleteDialog from "@/components/Advertisement/DeleteDialog/index";
export default {
    components: {
        CreateDialog,
        EditDialog,
        DeleteDialog
    },
    methods: {
        OpenCreateDialog(id) {
            this.$refs.CreateDialog.Open(id);
        },
        OpenEditDialog(item) {
            this.$refs.EditDialog.Open(item);
        },
        OpenDeleteDialog(id) {
            this.$refs.DeleteDialog.Open(id);
        },
        async SendCreateData(item) {
            create_advertisement(item).then((res) => {
                console.log(res)
                if (res.code == 200) {
                    update_advertisement_image(res.data.AdvertisementID, item).then(() => {
                        this.GetNewsData();
                        this.$refs.CreateDialog.Cancel();
                    })
                }
            });
        },
        async SendUpdateData(item) {
            update_advertisement(item).then((res) => {
                if (res.code == 200) {
                    if (item.Image1 != null) {
                        update_advertisement_image(item.ID, item).then(() => {
                            this.GetNewsData();
                            this.$refs.EditDialog.Cancel();
                        })
                    } else {
                        this.GetNewsData();
                        this.$refs.EditDialog.Cancel();
                    }
                }
            });
        },
        async SendDeleteData(id) {
            delete_advertisement(id).then((res) => {
                if (res.code == 200) {
                    this.GetNewsData();
                    this.$refs.DeleteDialog.Cancel();
                }
            });
        },
        async UpdateNewsSort(sort_data) {
            let data = []
            sort_data.forEach(item => {
                data.push({
                    ID: item.AdvertisementID,
                    Seq: item.Seq
                })
            });
            update_advertisement_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetNewsData();
                }
            });
        },
    }
}