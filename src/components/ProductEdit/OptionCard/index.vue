<template src="./template.html"></template>

<script>
import OptionEditDialog from "@/components/ProductEdit/OptionCard/EditOptionDialog/"
export default {
  name: "OptionCard",
  components: {
    OptionEditDialog
  },
  props: {
    value: {
      require: true,
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {
    OpenOptionEdit(item, index) {
      this.$refs.OptionEditDialog.Open(item, index)
    },
    UpdateOptions({ title, options, index, delete_options }) {
      let tmp_data = JSON.parse(JSON.stringify(this.value))
      tmp_data[index].title = title
      tmp_data[index].options = options
      this.$emit("input", tmp_data)
      delete_options.length <= 0 ? "" : this.$emit("delete-option", delete_options)
    },
    DeleteType(item, index) {
      let tmp_data = JSON.parse(JSON.stringify(this.value))
      tmp_data.splice(index, 1)
      this.$emit("input", tmp_data)
      item.option_type_id == 0 ? "" : this.$emit("delete-type", [item.option_type_id])
    }
  },
  filters: {
    option_type(val) {
      return val == "model" ? "一般" : "顏色"
    }
  }
}
</script>