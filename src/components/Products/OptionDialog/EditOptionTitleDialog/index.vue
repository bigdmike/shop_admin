<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="primary--text">
        選項標題
      </v-card-title>

      <v-card-text class="pt-5">
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              label="選項一"
              v-model="option1"
              hide-details="auto"
              outlined
              dense
              required
              class="mb-2"
            ></v-text-field>

            <v-text-field
              label="選項二"
              v-model="option2"
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
        <v-btn color="primary" class="elevation-0" @click="Validate"
          >儲存</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'OptionCreateDialog',
  data() {
    return {
      option1: '',
      option2: '',
      dialog: false,
    };
  },
  methods: {
    Open(data) {
      this.option1 = data.Option1;
      this.option2 = data.Option2;
      this.dialog = true;
    },
    Cancel() {
      this.option1 = '';
      this.option2 = '';
      this.dialog = false;
    },
    Validate() {
      let error_msg = '';
      if (this.option1 == '' || this.option2 == '') {
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
      this.$emit('update-action', {
        Option1: this.option1,
        Option2: this.option2,
      });
    },
  },
};
</script>
