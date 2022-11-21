<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="500">
    <v-card>
      <v-card-title
        style="border-bottom: 1px solid rgb(218, 218, 218)"
        class="bg-primary"
      >
        編輯商品分類
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="title"
                label="分類標題"
                placeholder="請輸入分類標題"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="啟用狀態"
                v-model="status"
                :items="status_list"
                hide-details="auto"
                item-text="label"
                item-value="value"
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="UpdateData"> 更新 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmpty } from '@/common/validate.js';
export default {
  name: 'MenuEditDialog',
  props: {
    category_list: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      id: -1,
      title: '',
      status: 'Y',
      position: 0,
      dialog: false,
      errors: {
        title: '',
        status: '',
      },
      status_list: [
        {
          label: '已啟用',
          value: 'Y',
        },
        {
          label: '已停用',
          value: 'N',
        },
      ],
    };
  },
  methods: {
    Open(item) {
      this.id = item.MenuID;
      this.title = item.Title;
      this.position = item.Seq;
      this.category = 1;
      this.status = item.Status;
      this.dialog = true;
      this.errors = {
        title: '',
        status: '',
      };
    },
    Cancel() {
      this.title = '';
      this.category = 1;
      this.dialog = false;
      this.errors = {
        title: '',
        status: '',
      };
    },
    UpdateData() {
      let error = false;
      this.errors = {
        title: '',
        status: '',
      };
      if (!validEmpty(this.title)) {
        this.errors.title = '請輸入分類名稱';
        error = true;
      }
      if (!validEmpty(this.status)) {
        this.errors.title = '請選擇啟用狀態';
        error = true;
      }
      if (!error) {
        this.$emit('update-menu', {
          ID: this.id,
          Title: this.title,
          Content: '',
          CategoryID: 1,
          Status: this.status,
          Image1: '',
          Seq: this.position,
        });
      }
    },
  },
};
</script>
