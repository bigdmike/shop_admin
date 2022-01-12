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
        { text: "上架時間", value: "create_time" },
        { text: "手續費", value: "create_time" },
        { text: "啟用狀態", value: "create_time" },
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
    GetChargeFee(item) {
      return item.ChargeFee != "0"
        ? item.ChargeFee + "元"
        : item.ChargePercent + "%";
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