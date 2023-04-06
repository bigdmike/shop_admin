<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="primary--text">
        {{ type_title }}商品規格
      </v-card-title>

      <v-card-text class="pt-5">
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              label="規格名稱"
              v-model="title"
              hide-details="auto"
              outlined
              dense
              required
            ></v-text-field>
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
export default {
  name: 'OptionCreateDialog',
  data() {
    return {
      id: -1,
      product_id: -1,
      type: '',
      title: '',
      edit_type: 'edit',
      dialog: false,
    };
  },
  methods: {
    Open(id, product_id, type, title, edit_type) {
      this.id = id;
      this.product_id = product_id;
      this.edit_type = edit_type;
      this.type = type;
      this.title = title;
      this.dialog = true;
    },
    Cancel() {
      this.id = -1;
      this.type = '';
      this.edit_type = 'edit';
      this.title = '';
      this.dialog = false;
    },
    Validate() {
      let error_msg = '';
      if (this.title == '') {
        error_msg += '- 請填寫規格名稱';
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
      let option_data = {};
      option_data[`${this.type}Title`] = this.title;
      option_data.GoodsID = this.product_id;
      option_data.ID = this.id;
      option_data.Status = 'Y';
      if (this.edit_type == 'edit') {
        this.$emit('update-action', option_data);
      } else {
        delete option_data.ID;
        this.$emit('create-action', option_data);
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
