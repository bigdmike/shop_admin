<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        新增問答分類
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="分類名稱"
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
        <v-btn color="primary" @click="CreateCategory"> 新增 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmpty } from "@/common/validate.js";
export default {
  name: "QuestionCategoryCreateDialog",
  props: {},
  data() {
    return {
      title: "",
      dialog: false,
      errors: {
        title: "",
      },
    };
  },
  methods: {
    Open() {
      this.title = "";
      this.dialog = true;
      this.errors = {
        title: "",
      };
    },
    Cancel() {
      this.title = "";
      this.dialog = false;
      this.errors = {
        title: "",
      };
    },
    CreateCategory() {
      if (validEmpty(this.title)) {
        this.$emit("create-category", {
          Title: this.title,
          Seq: 0,
        });
      } else {
        this.errors.title = "此欄位不得留空";
      }
    },
  },
};
</script>