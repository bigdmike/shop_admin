import CreateDialog from "@/components/HomeCarousel/CreateDialog/index.vue";
import EditDialog from "@/components/HomeCarousel/EditDialog/index.vue";
import ImageShow from "@/components/HomeCarousel/ImageShowDialog/index.vue";
import DeleteDialog from "@/components/HomeCarousel/DeleteDialog/index.vue";
import {
    create_carousel,
    get_carousel,
    update_carousel_image,
    update_carousel,
    delete_carousel,
    update_carousel_sort,
} from "@/api/home_carousel.js";
export default {
    components: {
        CreateDialog,
        EditDialog,
        ImageShow,
        DeleteDialog
    },
    methods: {
        async GetCarouselData() {
            get_carousel().then((res) => {
                console.log(res);
                this.carousels = res.data;
                this.CheckSort();
            });
        },
        async CreateCarouselData(item) {
            create_carousel(item).then((res) => {
                if (res.code == 200) {
                    update_carousel_image(res.data.CarouselID, item).then(() => {
                        this.$refs.CreateDialog.Cancel();
                        this.GetCarouselData();
                    });
                }
            });
        },
        async UpdateCarouselData(item) {
            update_carousel(item).then((res) => {
                if (res.code == 200) {
                    if (item.Image1 != null || item.Image2 != null) {
                        update_carousel_image(item.CarouselID, item).then(() => {
                            this.$refs.EditDialog.Cancel();
                            this.GetCarouselData();
                        });
                    } else {
                        this.$refs.EditDialog.Cancel();
                        this.GetCarouselData();
                    }
                }
            });
        },
        async DeleteCarouselData(item) {
            delete_carousel(item).then((res) => {
                if (res.code == 200) {
                    this.$refs.DeleteDialog.Cancel();
                    this.GetCarouselData();
                }
            });
        },
        async UpdateSort() {
            let data = [];
            this.carousels.forEach((carousel, carousel_index) => {
                data.push({
                    ID: parseInt(carousel.CarouselID),
                    Seq: parseInt(carousel_index + 1),
                });
            });
            update_carousel_sort(data).then((res) => {
                if (res.code == 200) {
                    this.GetCarouselData();
                }
            });
        },
        CheckSort() {
            let if_sort = true;
            this.carousels.forEach((item, item_index) => {
                item.Seq == item_index + 1 ? "" : (if_sort = false);
            });
            if_sort == false ? this.UpdateSort() : "";
        },

        OpenImageShow(item) {
            this.$refs.ImageShow.Open(item);
        },
        OpenUpload() {
            this.$refs.CreateDialog.Open();
        },
        OpenEdit(item) {
            this.$refs.EditDialog.Open(item);
        },
        OpenDelete(item) {
            this.$refs.DeleteDialog.Open(item);
        },
    }
}