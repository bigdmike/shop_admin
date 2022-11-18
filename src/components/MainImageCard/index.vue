<template src="./template.html"></template>

<script>
export default {
  name: 'MainImageCard',
  props: {
    image_data: {
      type: Object,
    },
    upload_index: {
      default: 0,
    },
    upload_key: {
      default: '',
    },
    aspect_ratio: {
      default: '',
    },
    delete_mode: {
      default: false,
    },
    dark_mode: {
      default: false,
    },
  },
  methods: {
    OpenUpload() {
      this.$refs.ImageUpload.click();
    },
    UploadImage(files) {
      for (let file of files) {
        var reader = new FileReader();
        reader.onload = () => {
          let image_data = {
            file: file,
            preview_url: reader.result,
          };
          this.$emit(
            'update-action',
            image_data,
            this.upload_index,
            this.upload_key
          );
          this.$refs.ImageUpload.value = '';
        };
        reader.readAsDataURL(file);
      }
    },
    OpenDeleteDialog() {
      this.$emit('delete-action', this.upload_index, this.upload_key);
    },
  },
};
</script>
<style>
.image_card {
  transition: opacity 0.4s ease-in-out;
  cursor: grab;
}

.img_card_control {
  background-color: rgba(0, 0, 0, 0.541);
  transition: opacity 0.4s ease-in-out;
  opacity: 0;
}
.img_card_control.show {
  opacity: 1;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.option_type_btn {
  min-height: 200px;
  transition: all 0.3s;
}
.option_type_btn:hover {
  cursor: pointer;
  background-color: rgb(232, 240, 255);
}
</style>
