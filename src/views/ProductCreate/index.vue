<template src="./template.html"></template>

<script>
import qs from "qs";
import Breadcrumb from "@/components/Breadcrumb/";
import FroalaEditor from "@/components/FroalaEditor/";
import ImageCard from "@/components/ProductCreate/ImageCard/";
import DeleteDialog from "@/components/Products/DeleteDialog/index";
export default {
  name: "ProductCreate",
  components: {
    Breadcrumb,
    FroalaEditor,
    ImageCard,
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
          label: "尚未開賣",
          value: "W",
        },
        {
          label: "隱藏",
          value: "N",
        },
      ],
      product_data: {
        product_id: 0,
        name: "",
        cover: "",
        thumbnail: "",
        category: [],
        options: [],
        images: [],
        option_combine: [],
        status: "Y",
      },
      category_data: [],
      delete_array: {
        options: [],
        option_types: [],
        images: [],
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
      if (this.product_data.category.length <= 0) {
        error += "- 請至少選取一個產品分類 <br>";
      }
      if (this.product_data.images.length <= 0) {
        error += "- 請至少加入一張圖片 <br>";
      }
      if (this.product_data.options.length <= 0) {
        error += "- 請至少加入一個選項 <br>";
      }
      if (error == "") {
        //先傳product 資料表的內容
        //再傳product images 跟 delete_array的images部分
        //最後傳product options 跟 option_types 還有delete_array的options跟option_types
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
      let result = await this.SendGetData(
        process.env.VUE_APP_BASE_API + "products/get_product_list.php"
      );
      if (result != "error") {
        this.category_data = JSON.parse(result.data).category;
      }
    },
    OpenDeleteDialog() {
      this.$refs.DeleteDialog.Open(this.$route.params.id);
    },
    OpenUploadImage(id) {
      this.$refs[id].click();
    },
    async ChangeImageFile(files) {
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        let result = await this.SendFormData(
          process.env.VUE_APP_BASE_API + "products/upload_product_image.php",
          formData
        );
        if (result != "error") {
          this.product_data.images.push({
            image_id: 0,
            url: JSON.parse(result.data).link,
            title: "",
            alt: "",
            position: this.product_data.images.length - 1,
          });
        }
      }
    },
    UpdateDeleteOptions(array) {
      this.delete_array["options"] = this.delete_array["options"].concat(array);
    },
    UpdateDeleteOptionTypes(array) {
      this.delete_array["option_types"] =
        this.delete_array["option_types"].concat(array);
    },
    UpdateDeleteImages(array) {
      this.delete_array["images"] = this.delete_array["images"].concat(array);
    },
    UpdateOptionCombine(array) {
      this.product_data.option_combine = array;
    },
    async UpdateCoverImage(files, id) {
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        let result = await this.SendFormData(
          process.env.VUE_APP_BASE_API + "products/upload_product_image.php",
          formData
        );
        if (result != "error") {
          this.product_data[id] = JSON.parse(result.data).link;
        }
      }
    },

    async CreateProductData() {
      let data = {
        product_id: 0,
        category: this.product_data.category,
        name: this.product_data.name,
        description: this.product_data.description,
        cover: this.product_data.cover,
        status: this.product_data.status,
      };
      let result = await this.SendPostData(
        process.env.VUE_APP_BASE_API + "products/create_product.php",
        qs.stringify({
          post_data: { product_data: data },
        })
      );
      if (result.status == "success") {
        this.CreateProductImage(result.msg);
      }
    },
    async CreateProductImage(id) {
      let result = await this.SendPostData(
        process.env.VUE_APP_BASE_API + "products/create_product_image.php",
        qs.stringify({
          post_data: {
            product_id: id,
            image_data: this.product_data.images,
          },
        })
      );
      if (result.status == "success") {
        this.CreateProductOption(id);
      }
    },
    async CreateProductOption(id) {
      let tmp_product = JSON.parse(JSON.stringify(this.product_data));
      tmp_product.option_combine.forEach((item) => {
        item.status = item.status == true || item.status == "Y" ? "Y" : "N";
      });
      let result = await this.SendPostData(
        process.env.VUE_APP_BASE_API + "products/create_product_options.php",
        qs.stringify({
          post_data: {
            product_id: id,
            option_type: this.product_data.options,
            option_combine: tmp_product.option_combine,
          },
        })
      );
      if (result.status == "success") {
        this.$store.commit("SetSnackbar", {
          content: "商品已建立",
          status: true,
        });
        this.$router.push("/products");
      }
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