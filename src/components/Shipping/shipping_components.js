import {
  update_shipping,
  create_shipping,
  delete_shipping,
} from '@/api/shipping';

import EditDialog from '@/components/Shipping/EditDialog/';
import CreateDialog from '@/components/Shipping/CreateDialog/';
import MainDeleteDialog from '@/components/MainDeleteDialog/';
export default {
  components: {
    EditDialog,
    CreateDialog,
    MainDeleteDialog,
  },
  methods: {
    OpenEditDialog(item) {
      console.log(item);
      this.$refs.EditDialog.Open(item);
    },
    OpenCreateDialog() {
      this.$refs.CreateDialog.Open();
    },
    OpenDeleteDialog(id) {
      this.$refs.DeleteDialog.Open(id);
    },
    SendUpdateData(item) {
      update_shipping(item).then((res) => {
        if (res.code == 200) {
          this.GetShippingData();
          this.$refs.EditDialog.Cancel();
        }
      });
    },
    SendCreateData(item) {
      create_shipping(item).then((res) => {
        if (res.code == 200) {
          this.GetShippingData();
          this.$refs.CreateDialog.Cancel();
        }
      });
    },
    SendDeleteData(item) {
      delete_shipping(item).then((res) => {
        if (res.code == 200) {
          this.GetShippingData();
          this.$refs.DeleteDialog.Cancel();
        }
      });
    },
  },
};
