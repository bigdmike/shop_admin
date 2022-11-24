<template src="./template.html"></template>

<script>
export default {
  name: 'MainList',
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
};
</script>
