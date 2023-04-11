<template src="./template.html"></template>

<script>
import Breadcrumb from '@/components/Breadcrumb/';
import FroalaEditor from '@/components/FroalaEditor/';
import DeleteDialog from '@/components/MainDeleteDialog/index';
import DateTimePicker from '@/components/DateTimePicker/index.vue';

import {
  getGoodsAndCategory,
  update_goods_all,
  create_goods_all,
  delete_goods,
} from '@/api/products';
export default {
  name: 'ProductEdit',
  components: {
    Breadcrumb,
    FroalaEditor,
    DeleteDialog,
    DateTimePicker,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '所有商品',
          link: '/products',
        },
        {
          title: '商品編輯',
          link: '',
        },
      ],
      status_data: [
        {
          label: '可購買',
          value: true,
        },
        {
          label: '已停賣',
          value: false,
        },
      ],
      customize_data: [
        {
          label: '客製化商品',
          value: true,
        },
        {
          label: '一般商品',
          value: false,
        },
      ],
      time_status_data: [
        {
          label: '指定期間內販售',
          value: true,
        },
        {
          label: '不限制販售時間',
          value: false,
        },
      ],
      product_data: null,
      category_data: [],
      event_data: [],
      cover_file: {
        cover_1: null,
        cover_2: null,
        cover_1_preview_url: '',
        cover_2_preview_url: '',
      },
      drag: false,
      tab: '基本資訊',
      edit_type: 'edit',
    };
  },
  methods: {
    async UpdateData() {
      //檢查images options category name
      let error = '';
      if (this.product_data.name == '') {
        error += '- 請輸入商品名稱 <br>';
      }
      if (this.product_data.GoodsTimeSet) {
        if (
          this.product_data.GoodsTimeStart == '' ||
          this.product_data.GoodsTimeStart == null
        ) {
          error += '- 請選擇開始販售時間 <br>';
        }
        if (
          this.product_data.GoodsTimeEnd == '' ||
          this.product_data.GoodsTimeEnd == null
        ) {
          error += '- 請選擇結束販售時間 <br>';
        }
      }
      if (error == '') {
        this.UpdateProductData();
      } else {
        error = '無法儲存商品請修正以下問題：<br>' + error;
        this.$store.commit('SetDialog', {
          title: '發生錯誤',
          content: error,
          status: true,
        });
      }
    },
    CancelEdit() {
      this.$router.push('/products');
    },
    GetProductData() {
      const id = this.$route.params.id != 'new' ? this.$route.params.id : -1;
      getGoodsAndCategory(id).then((res) => {
        // 只過濾出商品分類放入category_data
        this.category_data = res[0].data.filter(
          (item) => item.Content5 != '獨立銷售頁'
        );
        // 只過濾出銷售業資料放入event_data
        this.event_data = res[0].data.filter(
          (item) => item.Content5 == '獨立銷售頁'
        );
        // 取出ID相符的商品資料
        let product_data = res[1].data.filter(
          (item) => item.GoodsID == this.$route.params.id
        );
        // 如果沒有相符的商品或是router id是new，則設定新增模式
        if (product_data.length <= 0 || this.$route.params.id == 'new') {
          this.edit_type = 'create';
          // 初始化新商品資料
          this.product_data = Object.assign(
            {},
            {
              GoodsID: 0,
              Title: '',
              Description: '',
              Memo1: '',
              Memo2: '',
              Memo3: '',
              Image1: '',
              Image2: '',
              Status: true,
              CombineDiscount: false,
              Seq: 0,
              Option1: '商品Option1',
              Option2: '商品Option2',
              DeliveryFrozen: false,
              RecommendMenuID: '',
              GoodsTimeStart: '',
              GoodsTimeEnd: '',
              GoodsTimeSet: false,
              IsCustom: false,
              Menu: [],
              MenuID: [],
              EventID: [],
            }
          );
        }
        // 若有相符商品則為編輯模式
        else {
          this.edit_type = 'edit';
          // 若商品有設定販售時間則將GoodsTimeSet = true
          product_data[0].GoodsTimeSet =
            product_data[0].GoodsTimeStart != null &&
            product_data[0].GoodsTimeEnd != null
              ? true
              : false;
          // 若沒有設定販售時間則將預設null改為空字串
          if (product_data[0].GoodsTimeStart == null) {
            product_data[0].GoodsTimeStart = '';
          }
          if (product_data[0].GoodsTimeEnd == null) {
            product_data[0].GoodsTimeEnd = '';
          }
          // 設定商品關聯銷售頁陣列
          product_data[0].EventID = [];
          this.product_data = product_data[0];
          // 設定商品關聯分類陣列
          this.product_data.MenuID = [];
          // 將商品關聯的分類與銷售頁分類放入陣列
          this.product_data.Menu.forEach((item) => {
            if (item.Content5 == '獨立銷售頁') {
              this.product_data.EventID.push(item.MenuID);
            } else {
              this.product_data.MenuID.push(item.MenuID);
            }
          });

          // 將Y/N字串轉為布林方便編輯
          this.product_data = this.$StrToBool(this.product_data);

          // 將商品圖片資料放入cover_file
          this.cover_file.cover_1_preview_url = this.$ImageUrl(
            this.product_data.Image1
          );
          this.cover_file.cover_2_preview_url = this.$ImageUrl(
            this.product_data.Image2
          );
        }
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
          this.product_data[`Image${index}`] == ''
            ? ''
            : process.env.VUE_APP_BASEURL + this.product_data[`Image${index}`];
      }
    },
    async UpdateProductData() {
      const images = [this.cover_file.cover_1, this.cover_file.cover_2];
      // 如果沒有設定販售期間則將日期設定為null(後端規範)
      if (!this.product_data.GoodsTimeSet) {
        this.product_data.GoodsTimeStart = null;
        this.product_data.GoodsTimeEnd = null;
      }
      // 傳送前將product_data中的布林轉回字串
      if (this.edit_type == 'edit') {
        update_goods_all(this.$BoolToStr(this.product_data), images).then(
          () => {
            this.GetProductData();
          }
        );
      } else {
        create_goods_all(this.$BoolToStr(this.product_data), images).then(
          (res) => {
            if (res[0].code == 200) {
              this.$router.push('/products');
            }
          }
        );
      }
    },
    DeleteData(id) {
      delete_goods(id).then(() => {
        this.$router.push('/products');
      });
    },
  },
  computed: {
    recommend_category() {
      return [{ MenuID: '0', Title: '無' }, ...this.category_data];
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
