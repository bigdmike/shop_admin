<template src="./template.html"></template>

<script>
import draggable from 'vuedraggable'
import ImageShowDialog from "@/components/ProductEdit/ImageCard/ImageShowDialog/"
import ImageUrlDialog from "@/components/ProductEdit/ImageCard/ImageUrlDialog/"
import ImageInfoDialog from "@/components/ProductEdit/ImageCard/ImageInfoDialog/"
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
    ImageShowDialog,
    ImageUrlDialog,
    ImageInfoDialog
  },
  data() {
    return {
      drag: false,
      show_dialog: false,
      url_image: ""
    }
  },
  methods: {
    OpenShowDialog(index) {
      this.$refs.ImageShowDialog.Open(index)
    },
    OpenUploadImage() {
      this.$refs.ImageUpload.click()
    },
    OpenImageUrlDialog() {
      this.$refs.ImageUrlDialog.Open()
    },
    OpenImageInfoDialog(item, item_index) {
      console.log(item.alt)
      this.$refs.ImageInfoDialog.Open({ title: item.title, alt: item.alt, index: item_index })
    },
    ChangePosition(val) {
      let value = JSON.parse(JSON.stringify(this.value))
      let tmp_data = value[val.moved.oldIndex - 1]
      value.splice(val.moved.oldIndex - 1, 1)
      value.splice(val.moved.newIndex - 1, 0, tmp_data)
      this.$emit("input", value)
    },
    async ChangeImageFile(files) {
      console.log(files)
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        let result = await this.SendFormData(process.env.VUE_APP_BASE_API + "products/create_product_image.php", formData)
        if (result != "error") {
          console.log(JSON.parse(result.data).link)
          let value = JSON.parse(JSON.stringify(this.value))
          value.push(
            {
              image_id: 0,
              url: JSON.parse(result.data).link,
              title: "",
              alt: "",
              position: value.length - 1
            }
          )
          this.$emit("input", value)
        }
      }
    },
    CreateUrlImage(val) {
      console.log(val)
      if (val != "") {
        let value = JSON.parse(JSON.stringify(this.value))
        value.push(
          {
            image_id: 0,
            url: val,
            title: "",
            alt: "",
            position: value.length - 1
          }
        )
        this.$emit("input", value)
      }
    },
    UpdateImageInfo({ title, alt, index }) {
      let value = JSON.parse(JSON.stringify(this.value))
      value[index].title = title
      value[index].alt = alt
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