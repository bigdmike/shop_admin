<template src="./template.html"></template>

<script>
export default {
  name: 'ShipCodeDialog',
  data() {
    return {
      dialog: false,
      comment: '',
    };
  },
  methods: {
    Open(val) {
      this.dialog = true;
      this.comment = val;
    },
    Close() {
      this.dialog = false;
      this.comment = '';
    },
    async UpdateData() {
      this.$emit('send-data', this.comment);
    },
  },
};
</script>
