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
    },
    ChangePosition(val) {
      let value = JSON.parse(JSON.stringify(this.value))
      let tmp_data = value[val.moved.oldIndex - 1]
      value.splice(val.moved.oldIndex - 1, 1)
      value.splice(val.moved.newIndex - 1, 0, tmp_data)
      this.$emit("input", value)
    }
  },
  computed: {
    image_data: {
      get() {
        return this.value
      },
      set(value) {
        console.log(value)
      }
    }
  }
}
</script>