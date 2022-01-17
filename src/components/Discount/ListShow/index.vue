<template src="./template.html"></template>

<script>
import draggable from "vuedraggable";
export default {
  name: "CategoryListShow",
  props: {
    value: {
      require: true,
      type: Array,
    },
  },
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      headers: [
        {
          text: "名稱",
          align: "start",
          sortable: false,
          value: "Title",
        },
        { text: "優惠類型", value: "DiscountType" },
        { text: "啟用狀態", value: "Status" },
        { text: "開始時間", value: "StartTime" },
        { text: "結束時間", value: "EndTime" },
        { text: "動作", value: "action" },
      ],
    };
  },
  methods: {
    ChangeSort(moved_log) {
      let tmp_data = JSON.parse(JSON.stringify(this.value));
      let old_item = tmp_data[moved_log.oldIndex];
      tmp_data[moved_log.oldIndex] = tmp_data[moved_log.newIndex];
      tmp_data[moved_log.newIndex] = old_item;
      this.$emit("input", tmp_data);
      this.$emit("update-sort");
    },
    SetEdit(item) {
      this.$emit("set-edit", item);
    },
  },
  filters: {
    DiscountType(val) {
      return val == "P"
        ? "打折"
        : val == "G"
        ? "贈品"
        : val == "D"
        ? "免運"
        : "";
    },
  },
  created() {},
};
</script>

<style >
.opacity-0 {
  opacity: 0;
}
.page__grab-icon {
  cursor: grab;
}
</style>