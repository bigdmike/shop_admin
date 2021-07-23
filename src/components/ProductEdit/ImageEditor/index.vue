<template src="./template.html"></template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "ProductImageEditor",
  props: {
    value: {
      require: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      drag: false
    }
  },
  methods: {

  },
  computed: {
    image_data: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  }
}
</script>