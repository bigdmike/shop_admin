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
    option_1: {
      require: true,
      type: Array,
    },
    option_2: {
      require: true,
      type: Array,
    },
    type: {
      require: true,
      type: String,
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
          text: "規格一",
          align: "start",
          sortable: false,
        },
        {
          text: "規格二",
          align: "start",
          sortable: false,
        },
        {
          text: "庫存量",
          align: "start",
          sortable: false,
        },
        {
          text: "建議售價",
          align: "start",
          sortable: false,
        },
        {
          text: "實際售價",
          align: "start",
          sortable: false,
        },
        {
          text: "動作",
          align: "start",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    ChangeSort() {
      // let tmp_data = JSON.parse(JSON.stringify(this.value));
      // let old_item = tmp_data[moved_log.oldIndex];
      // tmp_data[moved_log.oldIndex] = tmp_data[moved_log.newIndex];
      // tmp_data[moved_log.newIndex] = old_item;
      // this.$emit("input", tmp_data);
      // this.$emit("update-sort");
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