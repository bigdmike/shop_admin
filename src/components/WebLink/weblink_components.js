import {
    create_weblink,
    update_weblink,
    delete_weblink,
    update_weblink_sort,
} from "@/api/web_links";

import CreateDialog from "@/components/WebLink/CreateDialog/";
import EditDialog from "@/components/WebLink/EditDialog/";
import DeleteDialog from "@/components/WebLink/DeleteDialog/index";
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
            create_weblink(item).then((res) => {
                if (res.code == 200) {
                    this.GetWebLinkData();
                    this.$refs.CreateDialog.Cancel();
                }
            });
        },
        async SendUpdateData(item) {
            update_weblink(item).then((res) => {
                if (res.code == 200) {
                    this.GetWebLinkData();
                    this.$refs.EditDialog.Cancel();
                }
            });
        },
        async SendDeleteData(id) {
            delete_weblink(id).then((res) => {
                if (res.code == 200) {
                    this.GetWebLinkData();
                    this.$refs.DeleteDialog.Cancel();
                }
            });
        },
        async UpdateWebLinkSort() {
            let data = [];
            this.weblink_data.forEach((item, item_index) => {
                data.push({
                    ID: item.WebLinkID,
                    Seq: item_index + 1,
                });
            });
            update_weblink_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetWebLinkData();
                }
            });
        },
    }
}