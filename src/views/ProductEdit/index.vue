<template src="./template.html"></template>

<script>
import Breadcrumb from "@/components/Breadcrumb/";
import FroalaEditor from "@/components/FroalaEditor/";
import DeleteDialog from "@/components/Products/DeleteDialog/index";

import { getGoodsAndCategory, update_goods_all } from "@/api/products";
import { StrToBool, BoolToStr, ImageUrl } from "@/common/filter.js";
export default {
  name: "ProductEdit",
  components: {
    Breadcrumb,
    FroalaEditor,
    DeleteDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "所有商品",
          link: "/products",
        },
        {
          title: "商品編輯",
          link: "",
        },
      ],
      status_data: [
        {
          label: "已發布",
          value: "Y",
        },
        {
          label: "隱藏",
          value: "N",
        },
      ],
      product_data: null,
      category_data: [],
      cover_file: {
        cover_1: null,
        cover_2: null,
        cover_1_preview_url: "",
        cover_2_preview_url: "",
      },
      drag: false,
    };
  },
  methods: {
    async UpdateData() {
      //檢查images options category name
      let error = "";
      if (this.product_data.name == "") {
        error += "- 請輸入商品名稱 <br>";
      }
      if (error == "") {
        this.UpdateProductData();
      } else {
        error = "無法儲存商品請修正以下問題：<br>" + error;
        this.$store.commit("SetDialog", {
          title: "發生錯誤",
          content: error,
          status: true,
        });
      }
    },
    CancelEdit() {
      this.$router.push("/products");
    },
    async GetProductData() {
      getGoodsAndCategory(this.$route.params.id).then((res) => {
        this.category_data = res[0].data;
        this.product_data = res[1].data.filter(
          (item) => item.GoodsID == this.$route.params.id
        )[0];
        this.product_data.MenuID = [];
        this.product_data.Menu.forEach((item) => {
          this.product_data.MenuID.push(item.MenuID);
        });

        this.product_data = StrToBool(this.product_data);

        this.cover_file.cover_1_preview_url = ImageUrl(
          this.product_data.Image1
        );
        this.cover_file.cover_2_preview_url = ImageUrl(
          this.product_data.Image2
        );
      });
    },
    OpenDeleteDialog() {
      this.$refs.DeleteDialog.Open(this.$route.params.id);
    },
    OpenUploadImage(id) {
      this.$refs[`ImageUpload${id}`].click();
    },
    async ChangeImageFile(files, index) {
      if (files.length > 0) {
        this.cover_file[`cover_${index}`] = files[0];
        this.cover_file[`cover_${index}_preview_url`] = URL.createObjectURL(
          this.cover_file[`cover_${index}`]
        );
      } else {
        this.cover_file[`cover_${index}`] = null;
        this.cover_file[`cover_${index}_preview_url`] =
          this.product_data[`Image${index}`] == ""
            ? ""
            : process.env.VUE_APP_BASEURL + this.product_data[`Image${index}`];
      }
    },
    async UpdateProductData() {
      const images = [this.cover_file.cover_1, this.cover_file.cover_2];
      console.log(this.product_data);
      update_goods_all(BoolToStr(this.product_data), images).then((res) => {
        console.log(res);
        this.GetProductData();
      });
    },
  },
  created() {
    this.GetProductData();
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