<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        更新選單群組
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
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
                label="顯示狀態"
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
        <v-btn color="primary" @click="UpdateCategory"> 更新 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmpty } from "@/common/validate.js";
export default {
  name: "WebLinkCategoryEditDialog",
  data() {
    return {
      title: "",
      id: -1,
      Seq: -1,
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
      dialog: false,
      errors: {
        title: "",
      },
    };
  },
  methods: {
    Open(category_item) {
      this.dialog = true;
      this.title = category_item.Title;
      this.id = category_item.WebLinkCategoryID;
      this.status = category_item.Status;
      this.Seq = category_item.Seq;
      this.errors = {
        title: "",
      };
    },
    Cancel() {
      this.title = "";
      this.id = -1;
      this.Seq = -1;
      this.dialog = false;
      this.errors = {
        title: "",
      };
    },
    UpdateCategory() {
      if (validEmpty(this.title)) {
        this.$emit("update-category", {
          ID: this.id,
          Title: this.title,
          Status: this.status,
          Seq: this.Seq,
        });
      } else {
        this.errors.title = "此欄位不得留空";
      }
    },
  },
};
</script>