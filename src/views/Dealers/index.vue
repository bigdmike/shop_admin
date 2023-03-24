<template src="./template.html"></template>

<script>
import {
  get_all_data,
  update_dealers_sort,
  delete_dealer,
  create_dealer,
  update_dealer,
} from '@/api/dealers';
import MainDragList from '@/components/MainDragList/index';
import Breadcrumb from '@/components/Breadcrumb/';
import DeleteDialog from '@/components/MainDeleteDialog';
import EditDialog from '@/components/Dealers/EditDialog/index.vue';
export default {
  name: 'NewsCover',
  components: {
    Breadcrumb,
    DeleteDialog,
    MainDragList,
    EditDialog,
  },
  data() {
    return {
      drag: false,
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
          text: '經銷名稱',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        {
          text: '地址',
          align: 'start',
          sortable: false,
          value: 'Content1',
        },
        { text: '建立時間', value: 'created_at' },
        { text: '動作', value: 'action' },
      ],
      breadcrumb_data: [
        {
          title: '頁面編輯',
          link: '',
        },
        {
          title: '經銷據點',
          link: '',
        },
      ],
      dealers_data: [],
      zip_code_data: [],
    };
  },
  methods: {
    OpenEdit(item) {
      this.$refs.EditDialog.Open(item, 'edit');
    },
    OpenCreate() {
      this.$refs.EditDialog.Open(null, 'create');
    },
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id);
    },
    CheckSort() {
      let is_sort = true;
      this.dealers_data.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? '' : (is_sort = false);
      });
      is_sort ? '' : this.SortData(this.dealers_data);
    },
    GetData() {
      get_all_data().then((res) => {
        console.log(res);
        this.zip_code_data = res[0].data;
        let dealer = res[1].data;
        dealer.forEach((item, item_index) => {
          dealer[item_index].ID = item.AdvertisementID;
          dealer[item_index].TableTitle = item.Title;
        });
        this.dealers_data = dealer;
        this.CheckSort();
      });
    },
    CreateData(item) {
      create_dealer(item).then((res) => {
        console.log(res);
        this.$refs.EditDialog.Cancel();
        this.GetData();
      });
    },
    UpdateData(item) {
      update_dealer(item).then((res) => {
        console.log(res);
        this.$refs.EditDialog.Cancel();
        this.GetData();
      });
    },
    SortData(data) {
      let tmp_data = [];
      data.forEach((item, item_index) => {
        tmp_data.push({
          ID: item.AdvertisementID,
          Seq: item_index + 1,
        });
      });
      update_dealers_sort(tmp_data).then((res) => {
        if (res.code == 200) {
          this.GetData();
        }
      });
    },
    DeleteData(item) {
      this.$refs.DeleteDialog.Cancel();
      delete_dealer(item.AdvertisementID).then(() => {
        this.GetData();
      });
    },
  },
  created() {
    this.GetData();
  },
};
</script>
