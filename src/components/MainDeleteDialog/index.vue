<template src="./template.html"></template>

<script>
export default {
  name: 'MainDeleteDialog',
  data() {
    return {
      id: -1,
      dialog: false,
    };
  },
  methods: {
    Open({ ShippingID }) {
      this.id = ShippingID;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.dialog = false;
    },
    async DeleteData() {
      this.$emit('delete-action', this.id);
    },
  },
};
</script>
