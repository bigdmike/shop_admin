<template src="./template.html"></template>

<script>
import {
  get_common_column,
  update_common_column_image,
} from "@/api/common_column";
import Breadcrumb from "@/components/Breadcrumb/";
export default {
  name: "News",
  components: {
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
          title: "最新消息封面",
          link: "",
        },
      ],
      news_cover_pc: {
        Title: "",
        Image1: null,
        image_preview_url: "",
      },
      news_cover_mb: {
        Title: "",
        Image1: null,
        image_preview_url: "",
      },
    };
  },
  methods: {
    async GetPageData() {
      get_common_column(["NewsCoverPc", "NewsCoverMb"]).then((res) => {
        this.news_cover_pc = res.NewsCoverPc;
        this.news_cover_pc.Image1 = null;
        this.news_cover_pc.image_preview_url =
          process.env.VUE_APP_BASEURL + this.news_cover_pc.Content;

        this.news_cover_mb = res.NewsCoverMb;
        this.news_cover_mb.Image1 = null;
        this.news_cover_mb.image_preview_url =
          process.env.VUE_APP_BASEURL + this.news_cover_mb.Content;
      });
    },
    OpenUploadImage(type) {
      this.$refs[`ImageUpload${type}`].click();
    },
    UpdateCoverImage(key, file) {
      console.log(key, file);
      if (key == "Pc") {
        this.news_cover_pc.Image1 = file[0];
        if (file.length > 0) {
          this.news_cover_pc.image_preview_url = URL.createObjectURL(
            this.news_cover_pc.Image1
          );
        }
      } else if (key == "Mb") {
        this.news_cover_mb.Image1 = file[0];
        if (file.length > 0) {
          this.news_cover_mb.image_preview_url = URL.createObjectURL(
            this.news_cover_mb.Image1
          );
          console.log(this.news_cover_mb.image_preview_url);
        }
      }
    },
    async UpdateData() {
      update_common_column_image(
        this.news_cover_pc.Title,
        this.news_cover_pc
      ).then(() => {
        update_common_column_image(
          this.news_cover_mb.Title,
          this.news_cover_mb
        ).then(() => {
          this.GetPageData();
        });
      });
    },
    CancelData() {
      this.GetPageData();
    },
  },
  created() {
    this.GetPageData();
  },
};
</script>
