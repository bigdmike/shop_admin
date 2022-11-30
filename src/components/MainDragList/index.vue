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
  },
  computed: {
    drag_headers() {
      return [{ text: '', value: 'DragColumn' }, ...this.headers];
    },
  },
};
</script>
