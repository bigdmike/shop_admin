<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="primary--text">
        選擇規格
      </v-card-title>

      <v-card-text class="pt-5">
        <v-row>
          <template v-for="(item, item_index) in spec_list">
            <v-col class="d-flex" cols="6" :key="`category_${item_index}`">
              <v-select
                v-model="item.SpecCategoryID"
                @input="ChangeCategoryTitle($event, item_index)"
                hide-details="auto"
                dense
                :items="category_data"
                item-text="Title"
                item-value="SpecCategoryID"
                label="選項分類"
                outlined
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="6" :key="`spec_${item_index}`">
              <v-select
                v-model="item.CustomSpecID"
                @input="ChangeTitle($event, item_index)"
                hide-details="auto"
                dense
                :items="GetCategory(item.SpecCategoryID)"
                item-text="Title"
                item-value="CustomSpecID"
                label="選項"
                outlined
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              class="d-flex justify-end py-0 my-0"
              :key="`action_${item_index}`"
            >
              <a @click="RemoveSpec(item_index)" class="primary--text">移除</a>
            </v-col>
          </template>
          <v-col cols="12">
            <v-btn @click="AddSpec" block outlined primary>新增規格</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" class="elevation-0" @click="Validate">
          更新
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'OptionCreateDialog',
  props: {
    spec_data: {
      type: Array,
    },
    category_data: {
      type: Array,
    },
  },
  data() {
    return {
      spec_list: [],
      dialog: false,
    };
  },
  methods: {
    Open(spec_list) {
      this.spec_list = spec_list;
      this.dialog = true;
    },
    Cancel() {
      this.spec_list = [];
      this.dialog = false;
    },
    Validate() {
      let error_msg = '';
      if (this.spec_list.length <= 0) {
        error_msg += '- 請選擇規格';
      }
      // 檢查不能有重複的SpecCategoryID
      let same_spec_category = false;
      this.spec_list.forEach((item) => {
        let same_count = 0;
        this.spec_list.forEach((spec) => {
          spec.SpecCategoryID == item.SpecCategoryID ? (same_count += 1) : '';
        });
        same_count >= 2 ? (same_spec_category = true) : '';
      });
      if (same_spec_category) {
        error_msg += '- 不能有重複的規格類型';
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
      this.$emit('update-action', this.spec_list);
      this.Cancel();
    },
    GetCategory(id) {
      return this.spec_data.filter((item) => item.SpecCategoryID == id);
    },
    RemoveSpec(index) {
      this.spec_list.splice(index, 1);
    },
    AddSpec() {
      const new_category = this.category_data.filter((item) => {
        return (
          this.spec_list.filter(
            (spec) => spec.SpecCategoryID == item.SpecCategoryID
          ).length <= 0
        );
      })[0];
      const new_spec = this.spec_data.filter((item) => {
        return item.SpecCategoryID == new_category.SpecCategoryID;
      })[0];
      this.spec_list.push({
        SpecCategoryID: new_category.SpecCategoryID,
        CustomSpecID: new_spec.CustomSpecID,
        Title: new_spec.Title,
        CategoryTitle: new_category.Title,
      });
    },
    ChangeTitle(id, index) {
      const spec = this.spec_data.filter((item) => item.CustomSpecID == id)[0];
      this.spec_list[index].Title = spec.Title;
    },
    ChangeCategoryTitle(id, index) {
      const category = this.category_data.filter(
        (item) => item.SpecCategoryID == id
      )[0];
      this.spec_list[index].CategoryTitle = category.Title;
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
