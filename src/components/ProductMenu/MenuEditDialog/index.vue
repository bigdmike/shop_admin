<template>
  <v-dialog v-model="dialog" width="500">
    <v-card v-if="menu_data != null">
      <v-card-title class="primary--text">
        {{ type_title }}商品分類
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="menu_data.Title"
              label="分類標題"
              placeholder="請輸入分類標題"
              hide-details="auto"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              label="商品目錄"
              v-model="menu_data.CategoryID"
              :items="category_list"
              hide-details="auto"
              item-text="Title"
              item-value="MenuCategoryID"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              label="啟用狀態"
              v-model="menu_data.Status"
              :items="status_list"
              hide-details="auto"
              item-text="label"
              item-value="value"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="menu_data.MenuTimeSet"
              label="限制販售期間"
              :items="status_list"
              item-text="label"
              item-value="value"
              dense
              outlined
            ></v-select>

            <template v-if="menu_data.MenuTimeSet == 'Y'">
              <DateTimePicker
                label="開始販售時間"
                v-model="menu_data.MenuTimeStart"
              />
              <DateTimePicker
                label="結束販售時間"
                v-model="menu_data.MenuTimeEnd"
              />
            </template>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" class="elevation-0" @click="Validate">
          {{ type_action }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DateTimePicker from '@/components/DateTimePicker/index.vue';
export default {
  name: 'MenuEditDialog',
  props: {
    category_list: {
      require: true,
      type: Array,
    },
  },
  components: {
    DateTimePicker,
  },
  data() {
    return {
      menu_data: null,
      dialog: false,
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
      edit_type: 'edit',
    };
  },
  methods: {
    Open(item, edit_type) {
      this.edit_type = edit_type;
      if (edit_type == 'edit') {
        let menu_data = Object.assign({}, item);
        menu_data.MenuTimeSet =
          menu_data.MenuTimeStart != null && menu_data.MenuTimeEnd != null
            ? 'Y'
            : 'N';
        if (menu_data.MenuTimeStart == null) {
          menu_data.MenuTimeStart = '';
        }
        if (menu_data.MenuTimeEnd == null) {
          menu_data.MenuTimeEnd = '';
        }

        this.menu_data = menu_data;
        this.menu_data.ID = this.menu_data.MenuID;
      } else {
        this.menu_data = Object.assign(
          {},
          {
            ID: 0,
            Title: '',
            Content: '',
            Seq: 0,
            CategoryID: 1,
            Status: 'Y',
            Image1: '',
          }
        );
      }
      this.dialog = true;
    },
    Cancel() {
      this.menu_data = null;
      this.dialog = false;
    },
    Validate() {
      let error_msg = '';
      if (this.menu_data.Title == '') {
        error_msg += '- 請輸入分類名稱<br/>';
      }
      if (this.menu_data.Status == '') {
        error_msg += '- 請選擇啟用狀態<br/>';
      }
      if (this.menu_data.MenuTimeSet == 'Y') {
        if (
          this.menu_data.MenuTimeStart == '' ||
          this.menu_data.MenuTimeStart == null
        ) {
          error_msg += '- 請選擇開始販售時間 <br>';
        }
        if (
          this.menu_data.MenuTimeEnd == '' ||
          this.menu_data.MenuTimeEnd == null
        ) {
          error_msg += '- 請選擇結束販售時間 <br>';
        }
      }

      if (error_msg == '') {
        this.SendData();
      } else {
        error_msg = '無法儲存資料，請修正以下問題：<br>' + error_msg;
        this.$store.commit('SetDialog', {
          title: '發生錯誤',
          content: error_msg,
          status: true,
        });
      }
    },
    SendData() {
      if (this.menu_data.MenuTimeSet == 'N') {
        this.menu_data.MenuTimeStart = null;
        this.menu_data.MenuTimeEnd = null;
      }
      if (this.edit_type == 'edit') {
        this.$emit('update-action', this.menu_data);
      } else {
        this.$emit('create-action', this.menu_data);
      }
    },
  },
  computed: {
    type_title() {
      return this.edit_type == 'edit' ? '編輯' : '新增';
    },
    type_action() {
      return this.edit_type == 'edit' ? '更新' : '新增';
    },
  },
};
</script>
