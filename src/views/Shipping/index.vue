<template src="./template.html"></template>

<script>
import {
  get_shipping,
  update_shipping,
  create_shipping,
  delete_shipping,
} from '@/api/shipping';
import MainList from '@/components/MainList/';
import Breadcrumb from '@/components/Breadcrumb/';
import EditDialog from '@/components/Shipping/EditDialog/';
import DeleteDialog from '@/components/MainDeleteDialog/';
export default {
  name: 'Shipping',
  components: {
    MainList,
    Breadcrumb,
    EditDialog,
    DeleteDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '金物流設定',
          link: '',
        },
        {
          title: '運送方式',
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
        // { text: '上架時間', value: 'created_at' },
        { text: '手續費', value: 'ShippingFee' },
        { text: '啟用狀態', value: 'Status' },
        { text: '操作', value: 'action' },
      ],
      shipping_data: [],
      shipping_type_data: [],
    };
  },
  methods: {
    OpenEditDialog(item) {
      this.$refs.EditDialog.Open(item, 'edit');
    },
    OpenCreateDialog() {
      this.$refs.EditDialog.Open('', 'create');
    },
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id);
    },
    GetData() {
      get_shipping().then((res) => {
        res[0].data.forEach((item, item_index) => {
          res[0].data[item_index].TableTitle = item.Title;
        });
        this.shipping_data = res[0].data;
        let type_list = [];
        Object.keys(res[1].data).forEach((key) => {
          type_list.push({
            title: res[1].data[key],
            value: key,
          });
        });
        this.shipping_type_data = type_list;
      });
    },
    UpdateData(item) {
      update_shipping(item).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
    CreateData(item) {
      create_shipping(item).then((res) => {
        if (res.code == 200) {
          this.GetData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
    DeleteData(item) {
      delete_shipping(item.ShippingID).then((res) => {
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
