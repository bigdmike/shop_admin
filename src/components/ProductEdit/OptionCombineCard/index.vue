<template src="./template.html"></template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "OptionCombineCard",
  props: {
    option_combine: {
      require: true,
    },
    options: {
      require: true
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      option_list: [],
      edit_index: -1
    }
  },
  methods: {
    ChangeSort() {
      this.$emit("update", this.option_list)
    },
    SetData() {
      let option_list = []

      this.options.forEach(option_type => {
        if (option_list.length <= 0) {
          option_type.options.forEach(option => {
            option_list.push(
              {
                option_id_group: option.option_id,
                option_text_group: option.title
              }
            )
          })
        }
        else {
          let tmp_list = []
          option_list.forEach(option => {
            option_type.options.forEach(new_option => {
              tmp_list.push({
                option_id_group: option.option_id_group + "," + new_option.option_id,
                option_text_group: option.option_text_group + "," + new_option.title
              })
            })
          })
          option_list = tmp_list
        }
      });


      option_list.forEach(item => {
        let is_exist = false
        this.option_combine.forEach(combine => {
          if (combine.option_id_group == item.option_id_group) {
            is_exist = true
            item.price = combine.price
            item.status = combine.status == "Y" || combine.status == true ? true : false
            item.stock = combine.stock
            item.image = combine.image
            item.location = combine.location
          }
        })
        if (is_exist == false) {
          item.price = 0
          item.status = false
          item.stock = 0
          item.image = ""
          item.location = 0
        }
      })
      this.option_list = option_list
      this.option_list.sort((a, b) => {
        return a.location - b.location
      })
    },
    OpenImageDialog(index) {
      this.edit_index = index
      this.$refs.ImageUpload.click()
    },
    async ChangeImageFile(files) {
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        let result = await this.SendFormData(process.env.VUE_APP_BASE_API + "products/upload_product_image.php", formData)
        if (result != "error") {
          this.$refs.ImageUpload.value = ""
          this.option_list[this.edit_index].image = JSON.parse(result.data).link
          this.$emit("update", this.option_list)
        }
      }
    },
    ChangeData() {
      this.$emit("update", this.option_list)
    }
  },
  watch: {
    options() {
      this.SetData()
    }
  },
  created() {
    this.SetData()
  }
}
</script>