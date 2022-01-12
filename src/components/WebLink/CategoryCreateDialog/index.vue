<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        新增選單群組
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="選單名稱"
                v-model="title"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                class="mb-8"
                v-model="status"
                :items="status_data"
                hide-details="auto"
                item-text="label"
                item-value="value"
                dense
                outlined
              ></v-select>
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
  name: "WebLinkCategoryCreateDialog",
  props: {},
  data() {
    return {
      title: "",
      dialog: false,
      status: "N",
      status_data: [
        {
          label: "顯示",
          value: "Y",
        },
        {
          label: "隱藏",
          value: "N",
        },
      ],
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
          Status: this.status,
          Seq: 0,
        });
      } else {
        this.errors.title = "此欄位不得留空";
      }
    },
  },
};
</script>