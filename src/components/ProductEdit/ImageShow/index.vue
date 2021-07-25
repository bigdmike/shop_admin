<template src="./template.html"></template>

<script>
import draggable from 'vuedraggable'
import ImageShowDialog from "@/components/ProductEdit/ImageShowDialog/"
export default {
  name: "ProductImageEditor",
  props: {
    value: {
      require: true,
      type: Array
    }
  },
  components: {
    draggable,
    ImageShowDialog
  },
  data() {
    return {
      drag: false,
      show_dialog: false
    }
  },
  methods: {
    OpenShowDialog(index) {
      this.$refs.ImageShowDialog.Open(index)
    }
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