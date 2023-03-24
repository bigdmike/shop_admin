<template>
  <v-dialog v-model="dialog" width="500">
    <v-card v-if="category_data != null">
      <v-card-title class="primary--text">
        {{ mode == 'create' ? '新增' : '編輯' }}影片分類
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="category_data.Title"
                placeholder="請輸入分類標題"
                hide-details="auto"
                label="分類標題"
                outlined
                dense
                required
                :error-messages="GetError('Title') ? '請輸入分類標題' : ''"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" class="elevation-0" @click="CreateData">
          {{ mode == 'create' ? '新增' : '更新' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'VideoCategoryDialog',
  props: {
    category_list: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      category_data: null,
      dialog: false,
      errors: [],
    };
  },
  methods: {
    Open(item) {
      this.category_data = Object.assign({}, item);
      this.dialog = true;
    },
    Cancel() {
      this.category_data = null;
      this.dialog = false;
    },
    CreateData() {
      this.errors = [];
      if (this.title == '') {
        this.errors.push('Title');
      }
      if (this.errors.length <= 0) {
        if (this.mode == 'edit') {
          this.$emit('update-action', this.category_data);
        } else {
          this.$emit('create-action', this.category_data);
        }
      }
    },
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
  },
  computed: {
    mode() {
      return this.category_data && this.category_data.VideoCategoryID != 0
        ? 'edit'
        : 'create';
    },
  },
};
</script>
