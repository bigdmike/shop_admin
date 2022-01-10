<template src="./template.html"></template>

<script>
import FroalaEditor from "@/components/FroalaEditor/";
import Breadcrumb from "@/components/Breadcrumb/";
import {
  get_common_column,
  update_common_column,
  update_common_column_image,
} from "@/api/common_column";
export default {
  name: "About",
  components: {
    FroalaEditor,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "頁面編輯",
          link: "",
        },
        {
          title: "關於我們",
          link: "",
        },
      ],
      image_preview_url: "",
      about_cover: null,
      about_content: null,
    };
  },
  methods: {
    async UpdateData() {
      update_common_column(this.about_content).then(() => {
        if (this.about_cover.Image1 != null) {
          update_common_column_image(
            this.about_cover.Title,
            this.about_cover
          ).then(() => {
            this.GetPageData();
          });
        } else {
          this.GetPageData();
        }
      });
    },
    async GetPageData() {
      get_common_column(["AboutCover", "AboutContent"]).then((res) => {
        this.about_cover = res.AboutCover;
        this.about_cover.Image1 = null;
        this.image_preview_url =
          process.env.VUE_APP_BASEURL + this.about_cover.Content;
        this.about_content = res.AboutContent;
      });
    },
    UpdateCoverImage(file) {
      this.about_cover.Image1 = file[0];
      if (file.length > 0) {
        this.image_preview_url = URL.createObjectURL(this.about_cover.Image1);
      }
    },
    CancelEdit() {
      this.GetPageData();
    },
    OpenUploadImage(item) {
      this.edit_item = item;
      this.$refs.ImageUpload.click();
    },
  },
  created() {
    this.GetPageData();
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