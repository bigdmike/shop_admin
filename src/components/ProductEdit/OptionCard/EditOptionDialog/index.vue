<template src="./template.html"></template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "EditOptionDialog",
  components: {
    draggable
  },
  data() {
    return {
      dialog: false,
      valid: false,
      index: -1,
      title: "",
      type: "",
      edit_color: "",
      menu: -1,
      options: [],
      delete_options: [],
      Require: [
        v => !!v || '選項內容請勿空白'
      ],
      Title: [
        v => {
          if (v == "") {
            return '選項內容請勿空白'
          }
          else {
            var spec = /[,<>{}@#$%^&*!]/;
            return spec.test(v) ? "選項內容請勿包含符號" : true
          }
        }
      ]
    }
  },
  methods: {

    ChangeSort() {
      console.log(this.options)
    },
    Open(val, index) {
      this.dialog = true
      this.index = index
      this.title = val.title
      this.type = val.type
      this.options = val.options
      console.log(this.options)
      this.delete_options = []
      this.options.forEach(item => item.menu = false)
    },
    UpdateOptions() {
      this.$refs.form.validate()
      setTimeout(() => {
        if (this.valid && this.options.length > 0) {
          this.$emit("update-options", { title: this.title, options: this.options, delete_options: this.delete_options, index: this.index })
          this.Cancel()
        }
      }, 100);
    },
    Cancel() {
      this.dialog = false
      this.valid = false
      this.index = -1
      this.title = ""
      this.type = ""
      this.options = []
      this.delete_options = []
    },
    CreateOption() {
      this.options.push({ option_id: 0, title: "", color: "" })
    },
    DeleteOption(item, index) {
      if (item.option_id != 0) {
        this.delete_options.push(item.option_id)
      }
      this.options.splice(index, 1)
    }
  }
}
</script>