<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="primary--text">
        {{ type_title }}輪播圖
      </v-card-title>

      <v-card-text class="pt-5">
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              label="連結網址"
              v-model="link"
              hide-details
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-file-input
              v-model="image_pc"
              prepend-icon=""
              label="電腦版圖片"
              :placeholder="file_path.image_pc"
              hide-details
              dense
              outlined
              show-size
            ></v-file-input>
            <a
              target="_blank"
              :href="$ImageUrl(file_path.image_pc)"
              class="my-0 text-caption"
              v-if="edit_type == 'edit'"
            >
              查看目前圖片
            </a>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-file-input
              v-model="image_mb"
              prepend-icon=""
              label="手機版圖片"
              :placeholder="file_path.image_mb"
              hide-details
              dense
              outlined
              show-size
            ></v-file-input>
            <a
              target="_blank"
              :href="$ImageUrl(file_path.image_mb)"
              class="my-0 text-caption"
              v-if="edit_type == 'edit'"
            >
              查看目前圖片
            </a>
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
  name: 'CarouselEditDialog',
  data() {
    return {
      link: '',
      id: -1,
      image_pc: null,
      image_mb: null,
      seq: 0,
      file_path: {
        image_pc: '',
        image_mb: '',
      },
      edit_type: 'edit',
      dialog: false,
    };
  },
  methods: {
    Open(item, edit_type) {
      this.edit_type = edit_type;
      if (edit_type == 'edit') {
        this.link = item.Link;
        this.id = item.CarouselID;
        this.image_pc = null;
        this.image_mb = null;
        this.seq = item.Seq;
        this.file_path = {
          image_pc: item.Image1,
          image_mb: item.Image2,
        };
      } else {
        this.Reset();
      }
      this.dialog = true;
    },
    Reset() {
      this.link = '';
      this.id = 0;
      this.image_pc = null;
      this.image_mb = null;
      this.seq = 0;
      this.file_path = {
        image_pc: '',
        image_mb: '',
      };
    },
    Cancel() {
      this.Reset();
      this.dialog = false;
    },
    Validate() {
      let error_msg = '';
      if (this.edit_type != 'edit' && this.image_pc == null) {
        error_msg += '- 請上傳電腦版圖片<br/>';
      }
      if (this.edit_type != 'edit' && this.image_mb == null) {
        error_msg += '- 請上傳手機版圖片<br/>';
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
      if (this.edit_type == 'edit') {
        this.$emit('update-action', {
          CarouselID: this.id,
          Link: this.link,
          Image1: this.image_pc,
          Image2: this.image_mb,
          Seq: this.seq,
        });
      } else {
        this.$emit('create-action', {
          Link: this.link,
          Image1: this.image_pc,
          Image2: this.image_mb,
          Seq: 0,
        });
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
