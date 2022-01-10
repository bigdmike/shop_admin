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
        { text: "", value: "" },
        {
          text: "名稱",
          align: "start",
          sortable: false,
          value: "Title",
        },
        { text: "上架時間", value: "create_time" },
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