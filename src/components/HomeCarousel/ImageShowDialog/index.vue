<template src="./template.html"></template>

<script>
export default {
  name: "ImageShowDialog",
  data() {
    return {
      active: 0,
      images: [],
      dialog: false,
    };
  },
  methods: {
    NextImage() {
      this.active == this.images.length - 1
        ? (this.active = 0)
        : (this.active += 1);
    },
    PrevImage() {
      this.active == 0
        ? (this.active = this.images.length - 1)
        : (this.active -= 1);
    },
    Open(item) {
      this.images.push(item.Image1);
      this.images.push(item.Image2);
      this.dialog = true;
    },
    Close() {
      this.dialog = false;
      this.images = [];
      this.active = 0;
    },
  },
  filters: {
    image(val) {
      return process.env.VUE_APP_BASEURL + val;
    },
  },
};
</script>

<style lang="scss">
.active_image {
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
  @media (max-width: 768px) {
    width: auto;
    max-width: 95%;
  }
}
</style>