<template src="./template.html"></template>
<script>
import qs from "qs"
export default {
  name: "ShopCreateDialog",
  data() {
    return {
      dialog: false,
      name: "",
      address: "",
      phone: "",
      status: "Y",
      coordinatesX: "",
      coordinatesY: "",
      shop_id: -1,
      status_array: [
        {
          label: "已啟用",
          value: 'Y'
        },
        {
          label: "已停用",
          value: 'N'
        }
      ],
      Require: [
        v => !!v || '選項內容請勿空白'
      ],
      valid: false
    }
  },
  methods: {
    Open() {
      this.dialog = true
      this.status = "Y"
      this.shop_id = ""
      this.name = ""
      this.address = ""
      this.phone = ""
      this.coordinatesX = ""
      this.coordinatesY = ""
    },
    UpdateCategory() {
      this.$refs.form.validate()
      setTimeout(() => {
        if (this.valid) {
          this.SendUpdateData()
        }
      }, 100);
    },
    async SendUpdateData() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "shop/create_shop.php", qs.stringify({
        shop_data: {
          name: this.name,
          status: this.status,
          shop_id: this.shop_id,
          address: this.address,
          phone: this.phone,
          coordinatesX: this.coordinatesX,
          coordinatesY: this.coordinatesY,
        }
      }))
      if (result.status != "error") {
        this.$emit("load-data")
        this.$store.commit("SetSnackbar", {
          content: "經銷資訊已新增",
          status: true
        })
        this.Cancel()
      }
    },
    Cancel() {
      this.dialog = false
      this.status = "Y"
      this.shop_id = ""
      this.name = ""
      this.address = ""
      this.phone = ""
      this.coordinatesX = ""
      this.coordinatesY = ""
    }
  }
}
</script>