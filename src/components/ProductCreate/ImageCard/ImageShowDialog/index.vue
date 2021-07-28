<template src="./template.html"></template>

<script>
export default {
  name: "ImageShowDialog",
  props: {
    images: {
      require: true
    }
  },
  data() {
    return {
      active: 0,
      dialog: false
    }
  },
  methods: {
    NextImage() {
      this.active == this.images.length - 1 ? this.active = 0 : this.active += 1
    },
    PrevImage() {
      this.active == 0 ? this.active = this.images.length - 1 : this.active -= 1
    },
    Open(index) {
      this.dialog = true
      this.active = index
    },
    Close() {
      this.dialog = false
      this.active = 0
    }
  },
  watch: {
  }
}
</script>

<style lang="scss">
.active_image {
  width: 600px;
  max-width: 600px;
  @media (max-width: 768px) {
    width: auto;
    max-width: 95%;
  }
}
</style>