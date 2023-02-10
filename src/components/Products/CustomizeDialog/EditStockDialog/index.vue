<template>
  <v-dialog v-model="dialog" width="500">
    <EditSpecDialog
      ref="EditSpecDialog"
      :spec_data="spec_data"
      :category_data="category_data"
      @update-action="UpdateSpecList"
    />
    <v-card v-if="stock_data != null">
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        {{ type_title }}商品庫存
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12">
              <p class="text-body primary--text ma-0">
                庫存規格：<br />
                <span
                  v-for="(item, item_index) in stock_data.SpecList"
                  :key="`stock_${item_index}`"
                >
                  <i v-if="item_index != 0">/</i>
                  {{ item.CategoryTitle }}:{{ item.Title }}
                </span>
              </p>
              <div v-if="edit_type == 'create'" class="d-flex justify-end">
                <v-btn
                  elevation="0"
                  small
                  color="primary"
                  @click="OpenSpecDialog"
                  >編輯規格</v-btn
                >
              </div>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="庫存量"
                v-model="stock_data.Stock"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="積材尺寸"
                v-model="stock_data.DeliverVolume"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="商品重量"
                v-model="stock_data.DeliverWeight"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="建議售價"
                v-model="stock_data.Price"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="實際售價"
                v-model="stock_data.SellPrice"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="會員售價"
                v-model="stock_data.MemberSellPrice"
                hide-details="auto"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                :items="status_array"
                label="啟用狀態"
                hide-details="auto"
                item-text="title"
                item-value="value"
                dense
                outlined
                v-model="stock_data.Status"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="Validate"> {{ type_action }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EditSpecDialog from '@/components/Products/CustomizeDialog/EditSpecDialog';
export default {
  name: 'OptionCreateDialog',
  components: {
    EditSpecDialog,
  },
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
      stock_data: null,
      dialog: false,
      status_array: [
        {
          title: '啟用',
          value: 'Y',
        },
        {
          title: '停用',
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
        this.stock_data = Object.assign({}, item);
      } else {
        this.stock_data = Object.assign(
          {},
          {
            Stock: 0,
            CustomSpecID: '',
            DeliverVolume: 0,
            DeliverWeight: 0,
            Price: 0,
            MemberSellPrice: 0,
            SellPrice: 0,
            Status: 'Y',
            SpecList: [],
            Seq: 1,
          }
        );
      }
      this.dialog = true;
    },
    Cancel() {
      this.stock_data = null;
      this.dialog = false;
    },
    UpdateSpecList(list) {
      this.$set(this.stock_data, 'SpecList', list);
    },
    Validate() {
      let error_msg = '';

      if (this.stock_data.ColorID == '') {
        error_msg += '- 請選擇規格一';
      }
      if (this.stock_data.SizeID == '') {
        error_msg += '- 請選擇規格二';
      }
      if (this.stock_data.Stock == '') {
        error_msg += '- 請輸入庫存量';
      }
      if (this.stock_data.DeliverVolume == '') {
        error_msg += '- 請輸入積材尺寸';
      }
      if (this.stock_data.DeliverWeight == '') {
        error_msg += '- 請輸入重量';
      }
      if (this.stock_data.Price == '') {
        error_msg += '- 請輸入建議售價';
      }
      if (this.stock_data.SellPrice == '') {
        error_msg += '- 請輸入實際售價';
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
    OpenSpecDialog() {
      this.$refs.EditSpecDialog.Open(this.stock_data.SpecList);
    },
    SendData() {
      this.$emit('update-stock', this.stock_data);
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
