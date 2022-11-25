<template src="./template.html"></template>

<script>
import draggable from 'vuedraggable';
export default {
  name: 'MainDragList',
  components: {
    draggable,
  },
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
    ChangeSort(dragResult) {
      const { index, element, futureIndex } = dragResult.draggedContext;
      if (index === null && futureIndex === null) return this.value;

      const result = [...this.value];
      let itemToAdd = element;

      if (index !== null) {
        itemToAdd = result.splice(index, 1)[0];
      }

      if (futureIndex !== null) {
        result.splice(futureIndex, 0, itemToAdd);
      }
      console.log(result);
      this.$emit('sort-action', result);
    },
  },
  computed: {
    drag_headers() {
      return [{ text: '', value: 'DragColumn' }, ...this.headers];
    },
  },
};
</script>
