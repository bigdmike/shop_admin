<template src="./template.html"></template>

<script>
import draggable from 'vuedraggable';
import Breadcrumb from '@/components/Breadcrumb/';
import EditDialog from '@/components/HomeCarousel/EditDialog/index.vue';
import ImageShow from '@/components/HomeCarousel/ImageShowDialog/index.vue';
import DeleteDialog from '@/components/MainDeleteDialog';
import {
  create_carousel,
  get_carousel,
  update_carousel_image,
  update_carousel,
  delete_carousel,
  update_carousel_sort,
} from '@/api/home_carousel.js';
export default {
  name: 'HomeCarousel',
  components: {
    draggable,
    Breadcrumb,
    EditDialog,
    ImageShow,
    DeleteDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '頁面編輯',
          link: '',
        },
        {
          title: '首頁大圖輪播',
          link: '',
        },
      ],
      carousels: [],
    };
  },
  methods: {
    CheckSort() {
      let if_sort = true;
      this.carousels.forEach((item, item_index) => {
        item.Seq == item_index + 2 ? '' : (if_sort = false);
      });
      if_sort == false ? this.SortData() : '';
    },

    OpenImageShow(item) {
      this.$refs.ImageShow.Open(item);
    },
    OpenUpload() {
      this.$refs.EditDialog.Open(null, 'create');
    },
    OpenEdit(item) {
      this.$refs.EditDialog.Open(item, 'edit');
    },
    OpenDelete(item) {
      this.$refs.DeleteDialog.Open(item);
    },

    GetData() {
      get_carousel().then((res) => {
        this.carousels = res.data;
        this.CheckSort();
      });
    },
    CreateData(item) {
      create_carousel(item).then((res) => {
        if (res.code == 200) {
          update_carousel_image(res.data.CarouselID, item).then(() => {
            this.$refs.EditDialog.Cancel();
            this.GetData();
          });
        }
      });
    },
    UpdateData(item) {
      update_carousel(item).then((res) => {
        if (res.code == 200) {
          if (item.Image1 != null || item.Image2 != null) {
            update_carousel_image(item.CarouselID, item).then(() => {
              this.$refs.EditDialog.Cancel();
              this.GetData();
            });
          } else {
            this.$refs.EditDialog.Cancel();
            this.GetData();
          }
        }
      });
    },
    DeleteData(item) {
      delete_carousel(item).then((res) => {
        if (res.code == 200) {
          this.$refs.DeleteDialog.Cancel();
          this.GetData();
        }
      });
    },
    SortData() {
      let data = [];
      this.carousels.forEach((carousel, carousel_index) => {
        data.push({
          ID: parseInt(carousel.CarouselID),
          Seq: parseInt(carousel_index + 2),
        });
      });
      update_carousel_sort(data).then((res) => {
        if (res.code == 200) {
          this.GetData();
        }
      });
    },
  },
  created() {
    this.GetData();
  },
  filters: {
    image(val) {
      return process.env.VUE_APP_BASEURL + val;
    },
  },
};
</script>
<style>
.image_card {
  transition: opacity 0.4s ease-in-out;
  cursor: grab;
}

.img_card_control {
  background-color: rgba(0, 0, 0, 0.541);
  transition: opacity 0.4s ease-in-out;
  opacity: 0;
}
.img_card_control.show {
  opacity: 1;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
