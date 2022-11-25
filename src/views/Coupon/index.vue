<template src="./template.html"></template>

<script>
import {
  get_coupon,
  create_coupon,
  update_coupon,
  delete_coupon,
} from '@/api/coupon.js';
import MainList from '@/components/MainList/index';
import Breadcrumb from '@/components/Breadcrumb/';
import DeleteDialog from '@/components/MainDeleteDialog/';
import EditDialog from '@/components/Coupon/EditDialog';
export default {
  name: 'Coupon',
  components: {
    MainList,
    Breadcrumb,
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
          title: '優惠代碼',
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
      },
      headers: [
        {
          text: '名稱',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        { text: '優惠代碼', value: 'CouponNumber' },
        { text: '剩餘張數', value: 'CouponCount' },
        { text: '開始時間', value: 'StartTime' },
        { text: '結束時間', value: 'EndTime' },
        { text: '動作', value: 'action' },
      ],
      coupon_data: [],
    };
  },
  methods: {
    OpenCreateDialog() {
      this.$refs.EditDialog.Open('', 'create');
    },
    OpenEditDialog(item) {
      this.$refs.EditDialog.Open(item, 'edit');
    },
    OpenDeleteDialog(item) {
      this.$refs.DeleteDialog.Open(item.CouponID);
    },
    GetData() {
      get_coupon().then((res) => {
        res.data.forEach((item, item_index) => {
          res.data[item_index].TableTitle = item.Title;
        });
        this.coupon_data = res.data;
      });
    },

    CreateData(item) {
      create_coupon(item).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
    UpdateData(item) {
      update_coupon(item).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
    DeleteData(id) {
      delete_coupon(id).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.DeleteDialog.Cancel();
        }
      });
    },
  },
  created() {
    this.GetData();
  },
};
</script>
