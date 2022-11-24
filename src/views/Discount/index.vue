<template src="./template.html"></template>

<script>
import {
  getMenuAndDiscount,
  delete_discount,
  create_discount,
  update_discount,
  update_menu_image,
} from '@/api/discount.js';
import MainList from '@/components/MainList/index';
import DeleteDialog from '@/components/MainDeleteDialog/index';
import EditDialog from '@/components/Discount/EditDialog/';
import Breadcrumb from '@/components/Breadcrumb/';
// import discount_components from '@/components/Discount/discount_components.js';
export default {
  name: 'Discount',
  // mixins: [discount_components],
  components: {
    Breadcrumb,
    MainList,
    DeleteDialog,
    EditDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '促銷優惠',
          link: '',
        },
        {
          title: '折扣與贈品',
          link: '',
        },
      ],
      options: {
        action: [
          {
            title: '刪除',
            class: 'error',
            action: 'delete-action',
          },
        ],
        status: [
          {
            title: '已啟用',
            class: 'success',
            condition: 'Y',
          },
          {
            title: '已停用',
            class: '',
            condition: 'N',
          },
        ],
      },
      headers: [
        {
          text: '名稱',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '優惠類型', value: 'DiscountTypeName' },
        { text: '啟用狀態', value: 'Status' },
        { text: '開始時間', value: 'StartTime' },
        { text: '結束時間', value: 'EndTime' },
        { text: '動作', value: 'action' },
      ],
      discount_data: [],
      category_data: [],
      discount_type_list: {
        P: '打折',
        G: '贈品',
        D: '免運',
      },
    };
  },
  methods: {
    OpenEditDialog(item) {
      this.$refs.EditDialog.Open(item, 'edit');
    },
    OpenCreateDialog() {
      this.$refs.EditDialog.Open('', 'create');
    },
    OpenDeleteDialog(item) {
      this.$refs.DeleteDialog.Open(item.DiscountID);
    },
    GetData() {
      getMenuAndDiscount().then((res) => {
        res[0].data = this.ResetData(res[0].data);
        this.discount_data = res[0].data;
        this.category_data = res[1].data;
      });
    },
    ResetData(res_data) {
      let data = JSON.parse(JSON.stringify(res_data));
      data.forEach((item, item_index) => {
        data[item_index].DiscountTypeName = this.discount_type_list[
          item.DiscountType
        ];
        data[item_index].TableTitle = item.Title;
      });
      return data;
    },
    DeleteData(id) {
      delete_discount(id).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.DeleteDialog.Cancel();
        }
      });
    },
    CreateData(item) {
      let tmp_data = Object.assign({}, item);
      tmp_data.Image1 = '';
      create_discount(tmp_data).then((res) => {
        if (item.Image1 != null) {
          update_menu_image(res.data.DiscountID, item).then(() => {
            this.GetData();
            this.$refs.EditDialog.Cancel();
          });
        } else {
          this.GetData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
    UpdateData(item) {
      let tmp_data = Object.assign({}, item);
      delete tmp_data.Image1;
      update_discount(tmp_data).then(() => {
        if (item.Image1 != null) {
          update_menu_image(item.ID, item).then(() => {
            this.GetData();
            this.$refs.EditDialog.Cancel();
          });
        } else {
          this.GetData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
  },
  created() {
    this.GetData();
  },
};
</script>
