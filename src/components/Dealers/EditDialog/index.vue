<template>
  <v-dialog v-model="dialog" width="800">
    <v-card v-if="dealers_data != null">
      <v-card-title class="primary--text">
        {{ mode == 'create' ? '新增' : '編輯' }}經銷據點
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="dealers_data.Title"
                placeholder="請輸入經銷名稱"
                hide-details="auto"
                label="經銷名稱"
                outlined
                dense
                required
                :error-messages="GetError('Title') ? '請輸入經銷名稱' : ''"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-select
                label="城市"
                @input="ResetArea"
                v-model="dealers_data.Content1"
                :items="city_data"
                hide-details="auto"
                outlined
                dense
                :error-messages="GetError('City') ? '請選擇城市' : ''"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-select
                label="區域"
                @input="SetZip"
                v-model="dealers_data.Content2"
                :items="area_data"
                item-text="Area"
                item-value="Area"
                hide-details="auto"
                outlined
                dense
                :error-messages="GetError('Area') ? '請選擇區域' : ''"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-text-field
                v-model="dealers_data.Content3"
                placeholder="郵遞區號"
                hide-details="auto"
                readonly
                label="郵遞區號"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="dealers_data.Content4"
                placeholder="請輸入詳細地址"
                hide-details="auto"
                label="詳細地址"
                outlined
                dense
                required
                :error-messages="GetError('Address') ? '請輸入詳細地址' : ''"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="dealers_data.Content5"
                placeholder="請輸入聯絡電話"
                hide-details="auto"
                label="聯絡電話"
                outlined
                dense
                required
                :error-messages="GetError('Phone') ? '請輸入聯絡電話' : ''"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="啟用狀態"
                v-model="dealers_data.Content6"
                :items="status_list"
                item-text="title"
                item-value="value"
                hide-details="auto"
                outlined
                dense
                :error-messages="GetError('Status') ? '請選擇啟用狀態' : ''"
              ></v-select>
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
  name: 'DealerEditDialog',
  props: {
    zip_code_data: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      status_list: [
        {
          title: '已啟用',
          value: 'Y',
        },
        {
          title: '已停用',
          value: 'N',
        },
      ],
      dealers_data: null,
      dialog: false,
      mode: 'edit',
      errors: [],
    };
  },
  methods: {
    Open(item, type) {
      if (type == 'edit') {
        this.dealers_data = Object.assign({}, item);
      } else {
        this.dealers_data = this.SetNewData();
      }
      this.mode = type;
      this.dialog = true;
    },
    SetNewData() {
      return {
        ID: 0,
        CategoryID: 1,
        Title: '',
        Content1: '',
        Content2: '',
        Content3: '',
        Content4: '',
        Content5: '',
        Content6: '',
        Content7: '',
        Content8: '',
        Content9: '',
        Content10: '',
        Seq: 0,
      };
    },
    Cancel() {
      this.dealers_data = null;
      this.dialog = false;
    },
    ResetArea() {
      this.dealers_data.Content2 = '';
      this.dealers_data.Content3 = '';
    },
    SetZip() {
      this.dealers_data.Content3 = this.zip_code;
    },
    CreateData() {
      this.errors = [];
      if (this.title == '') {
        this.errors.push('Title');
      }
      if (this.errors.length <= 0) {
        if (this.mode == 'edit') {
          this.$emit('update-action', this.dealers_data);
        } else {
          this.$emit('create-action', this.dealers_data);
        }
      }
    },
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
  },
  computed: {
    city_data() {
      let city_list = [];
      if (this.zip_code_data != null) {
        this.zip_code_data.forEach((zip_data) => {
          const city = city_list.filter((item) => item == zip_data.City);
          city.length <= 0 ? city_list.push(zip_data.City) : '';
        });
      }
      return city_list;
    },
    area_data() {
      let area_list = [];
      if (this.dealers_data != null && this.dealers_data.Content1 != '') {
        area_list = this.zip_code_data.filter(
          (item) => item.City == this.dealers_data.Content1
        );
      }
      return area_list;
    },
    zip_code() {
      if (this.dealers_data != null && this.dealers_data.Contnet2 != '') {
        return this.zip_code_data.filter(
          (item) =>
            item.City == this.dealers_data.Content1 &&
            item.Area == this.dealers_data.Content2
        )[0].ZipCode;
      }
      return '';
    },
  },
};
</script>
