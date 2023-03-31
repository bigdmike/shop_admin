<template src="./template.html"></template>

<script>
export default {
  name: 'MainDragList',
  props: {
    value: {
      // 表格資料
      require: true,
      type: Array,
    },
    headers: {
      // 表個標頭
      require: true,
      type: Array,
    },
    options: {
      // 選項
      require: true,
      type: Object,
    },
    hide_footer: {
      // 隱藏分頁
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      drag: false,
    };
  },
  methods: {
    ChangeSort() {
      this.drag = false;
      this.$emit('sort-action', this.value);
    },

    onDropCallback(event) {
      console.log('onDropCallback');
      const movedItem = this.table_data.splice(event.oldIndex, 1)[0];
      this.table_data.splice(event.newIndex, 0, movedItem);
      this.drag = false;
      this.$emit('sort-action', this.value);
    },
  },
  computed: {
    drag_headers() {
      return [{ text: '', value: 'DragColumn' }, ...this.headers];
    },
    table_data() {
      return this.value;
    },
  },
};
</script>
