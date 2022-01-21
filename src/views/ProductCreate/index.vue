<template src="./template.html"></template>

<script>
import Breadcrumb from "@/components/Breadcrumb/";
import FroalaEditor from "@/components/FroalaEditor/";
import DeleteDialog from "@/components/Products/DeleteDialog/index";

import { getGoodsAndCategory, create_goods_all } from "@/api/products";
import { BoolToStr } from "@/common/filter.js";
export default {
  name: "ProductCreate",
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
          title: "新增商品",
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
        this.CreateProductData();
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
      getGoodsAndCategory().then((res) => {
        this.category_data = res[0].data;
        this.product_data = {};
        this.product_data.Image1 = "";
        this.product_data.Image2 = "";
        this.product_data.Seq = 0;
        this.product_data.Tittle = "";
        this.product_data.Description = "";
        this.product_data.Memo1 = "";
        this.product_data.Memo2 = "";
        this.product_data.Memo3 = "";
        this.product_data.Option1 = "商品Option1";
        this.product_data.Option2 = "商品Option2";
        this.product_data.Status = false;
        this.product_data.CombineDiscount = false;
        this.product_data.DeliveryFrozen = false;
        this.product_data.RecommendMenuID = 0;
        this.product_data.Menu = [];
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
    async CreateProductData() {
      console.log(this.product_data);
      const images = [this.cover_file.cover_1, this.cover_file.cover_2];
      create_goods_all(BoolToStr(this.product_data), images).then((res) => {
        console.log(res);
        if (res[0].code == 200) {
          this.$router.push("/products");
        }
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