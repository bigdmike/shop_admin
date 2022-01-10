<template src="./template.html"></template>
<script>
import { get_common_column, update_common_column } from "@/api/common_column";
export default {
  name: "GTMEditDialog",
  data() {
    return {
      dialog: false,
      code: null,
      Require: [(v) => !!v || "選項內容請勿空白"],
      valid: false,
    };
  },
  methods: {
    async Open() {
      get_common_column(["GoogleTagManager"]).then((res) => {
        this.code = res.GoogleTagManager;
        this.dialog = true;
      });
    },
    async UpdateData() {
      update_common_column(this.code).then(() => {
        this.Cancel();
      });
    },
    Cancel() {
      this.dialog = false;
      this.code = null;
    },
  },
};
</script>