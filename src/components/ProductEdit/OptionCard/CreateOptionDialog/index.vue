<template src="./template.html"></template>

<script>
export default {
  name: "CreateOptionDialog",
  data() {
    return {
      dialog: false,
      valid: false,
      index: -1,
      title: "",
      type: "model",
      edit_color: "",
      menu: -1,
      options: [],
      delete_options: [],
      type_array: [
        {
          label: "顏色",
          value: "color"
        },
        {
          label: "一般",
          value: "model"
        }
      ],
      Require: [
        v => !!v || '選項內容請勿空白',
      ],
      Title: [
        v => {
          if (v == "") {
            return '選項內容請勿空白'
          }
          else {
            var spec = /[,.<>{}@#$%^&*!]/;
            return spec.test(v) ? "選項內容請勿包含符號" : true
          }
        }
      ]
    }
  },
  methods: {
    Open() {
      this.dialog = true
      this.type = "model"
      this.delete_options = []
    },
    CreateOptions() {
      this.$refs.form.validate()
      setTimeout(() => {
        if (this.valid && this.options.length > 0) {
          this.$emit("create-options", { title: this.title, options: this.options, type: this.type })
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
      this.options.splice(index, 1)
    }
  }
}
</script>