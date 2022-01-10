<template src="./template.html"></template>

<script>
import Breadcrumb from "@/components/Breadcrumb/";
import FroalaEditor from "@/components/FroalaEditor/";
import DeleteDialog from "@/components/Products/DeleteDialog/index";

import {
  getGoodsAndCategory,
  update_goods,
  update_goods_image,
} from "@/api/products";
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
      // if (this.product_data.category.length <= 0) {
      //   error += "- 請至少選取一個產品分類 <br>";
      // }
      if (error == "") {
        //先傳product 資料表的內容
        //再傳product images 跟 delete_array的images部分
        //最後傳product options 跟 option_types 還有delete_array的options跟option_types
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
        this.product_data.CombineDiscount =
          this.product_data.CombineDiscount == "N" ? false : true;
        this.product_data.DeliveryFrozen =
          this.product_data.DeliveryFrozen == "N" ? false : true;
        this.cover_file.cover_1_preview_url =
          this.product_data.Image1 == ""
            ? ""
            : process.env.VUE_APP_BASEURL + this.product_data.Image1;
        this.cover_file.cover_2_preview_url =
          this.product_data.Image2 == ""
            ? ""
            : process.env.VUE_APP_BASEURL + this.product_data.Image2;
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
      let tmp_data = Object.assign({}, this.product_data);
      tmp_data.CombineDiscount = tmp_data.CombineDiscount == false ? "N" : "Y";
      tmp_data.DeliveryFrozen = tmp_data.DeliveryFrozen == false ? "N" : "Y";

      update_goods(tmp_data).then(() => {
        if (
          this.cover_file.cover_1 != null ||
          this.cover_file.cover_2 != null
        ) {
          tmp_data.Image1 = this.cover_file.cover_1;
          tmp_data.Image2 = this.cover_file.cover_2;
          console.log(tmp_data);
          update_goods_image(tmp_data.GoodsID, tmp_data).then(() => {
            this.GetProductData();
          });
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