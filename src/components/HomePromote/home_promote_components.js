import EditDialog from "@/components/HomePromote/EditDialog/index.vue";
import ImageShow from "@/components/HomePromote/ImageShowDialog/index.vue";
import {
    get_promote,
    update_promote_image,
    update_promote,
    update_promote_sort
} from "@/api/home_promote.js";
export default {
    components: {
        EditDialog,
        ImageShow
    },
    methods: {
        async GetPromoteData() {
            get_promote().then((res) => {
                this.promote_data = res.data
                console.log(res.data)
                this.CheckSort()
            });
        },
        async UpdatePromoteData(item) {
            update_promote(item).then((res) => {
                if (res.code == 200) {
                    if (item.Image1 != null) {
                        update_promote_image(item).then(() => {
                            this.$refs.EditDialog.Cancel();
                            this.GetPromoteData();
                        });
                    } else {
                        this.$refs.EditDialog.Cancel();
                        this.GetPromoteData();
                    }
                }
            });
        },
        async UpdatePromoteSort() {
            let sort_data = []
            this.promote_data.forEach((item, item_index) => {
                sort_data.push({
                    ID: item.PromoteID,
                    Seq: item_index + 1
                })
            })
            update_promote_sort(sort_data).then(() => {
                this.GetPromoteData()
            })
        },
        CheckSort() {
            let ifsort = true
            this.promote_data.forEach((item, item_index) => {
                item.Seq != item_index + 1 ? ifsort = false : ""
            });
            !ifsort ? this.UpdatePromoteSort() : ""
        },
        OpenImageShow(item) {
            this.$refs.ImageShow.Open(item);
        },
        OpenEdit(item) {
            this.$refs.EditDialog.Open(item);
        },
    }
}