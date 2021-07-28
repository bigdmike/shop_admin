<template src="./template.html"></template>

<script>
import OptionEditDialog from "@/components/ProductEdit/OptionCard/EditOptionDialog/"
import OptionCreateDialog from "@/components/ProductEdit/OptionCard/CreateOptionDialog/"
export default {
  name: "OptionCard",
  components: {
    OptionEditDialog,
    OptionCreateDialog
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
    OpenOptionCreate() {
      this.$refs.OptionCreateDialog.Open()
    },
    CreateOptions({ title, options, type }) {
      let tmp_data = JSON.parse(JSON.stringify(this.value))
      tmp_data.push({
        option_type_id: 0,
        type: type,
        title: title,
        options: options
      })
      this.$emit("input", tmp_data)
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