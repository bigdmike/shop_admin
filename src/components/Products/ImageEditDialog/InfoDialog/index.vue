<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        商品圖片資料
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <p>指定選項一：{{ GetColor(color_id) }}</p>
              <p>指定選項二：{{ GetSize(size_id) }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 關閉 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PictureInfoDialog",
  props: {
    color: {
      require: true,
      type: Array,
    },
    size: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      color_id: "",
      size_id: "",
      dialog: false,
    };
  },
  methods: {
    Open(item) {
      this.color_id = item.ColorID;
      this.size_id = item.SizeID;
      this.dialog = true;
    },
    Cancel() {
      this.color_id = "";
      this.size_id = "";
      this.dialog = false;
    },
    GetColor(id) {
      console.log(this.color.filter((item) => item.ColorID == id));
      return id == ""
        ? ""
        : this.color.filter((item) => item.ColorID == id)[0].ColorTitle;
    },
    GetSize(id) {
      return id == ""
        ? ""
        : this.size.filter((item) => item.SizeID == id)[0].SizeTitle;
    },
  },
};
</script>