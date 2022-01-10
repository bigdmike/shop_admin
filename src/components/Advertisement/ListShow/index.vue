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
      let tmp_data = [];
      if (moved_log.moved.oldIndex > moved_log.moved.newIndex) {
        tmp_data = this.ChangeBackward(
          moved_log.moved.newIndex,
          moved_log.moved.oldIndex
        );
      } else {
        tmp_data = this.ChangeForward(
          moved_log.moved.newIndex,
          moved_log.moved.oldIndex
        );
      }
      tmp_data.forEach((item, item_index) => {
        item.Seq = this.value[item_index].Seq;
      });
      this.$emit("input", tmp_data);
      this.$emit("update-sort");
    },
    ChangeForward(newIndex, oldIndex) {
      let tmp_data = JSON.parse(JSON.stringify(this.value));
      let old_data = tmp_data[oldIndex];
      tmp_data.forEach((item, item_index) => {
        if (item_index > oldIndex && item_index <= newIndex) {
          tmp_data[item_index - 1] = item;
        }
      });
      tmp_data[newIndex] = old_data;
      return tmp_data;
    },
    ChangeBackward(newIndex, oldIndex) {
      let tmp_data = JSON.parse(JSON.stringify(this.value));
      let old_data = tmp_data[oldIndex];
      for (let i = oldIndex; i > newIndex; i--) {
        tmp_data[i] = tmp_data[i - 1];
      }
      tmp_data[newIndex] = old_data;
      return tmp_data;
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