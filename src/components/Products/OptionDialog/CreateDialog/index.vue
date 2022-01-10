<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        新增商品規格
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="規格名稱"
                v-model="title"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.title"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="CreateOption"> 新增 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmpty } from "@/common/validate.js";
export default {
  name: "OptionCreateDialog",
  data() {
    return {
      id: -1,
      type: "",
      title: "",
      dialog: false,
      errors: {
        title: "",
      },
    };
  },
  methods: {
    Open(id, type) {
      this.id = id;
      this.type = type;
      this.title = "";
      this.dialog = true;
      this.errors = {
        title: "",
      };
    },
    Cancel() {
      this.id = -1;
      this.type = "";
      this.title = "";
      this.dialog = false;
      this.errors = {
        title: "",
      };
    },
    CreateOption() {
      let error = false;
      this.errors = {
        title: "",
      };
      if (!validEmpty(this.title)) {
        this.errors.title = "請填寫規格名稱";
        error = true;
      }
      if (!error) {
        let Data = {};
        Data[`${this.type}Title`] = this.title;
        Data.GoodsID = this.id;
        this.$emit("create-option", Data);
      }
    },
  },
};
</script>