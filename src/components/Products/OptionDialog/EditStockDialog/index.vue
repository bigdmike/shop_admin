<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title style="border-bottom: 1px solid rgb(218, 218, 218)">
        編輯商品庫存
      </v-card-title>

      <v-card-text class="pt-5">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                :items="option_1"
                label="請選擇規格一"
                hide-details="auto"
                item-text="ColorTitle"
                item-value="ColorID"
                dense
                outlined
                v-model="color_id"
                :error-messages="errors.color_id"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                :items="option_2"
                label="請選擇規格二"
                hide-details="auto"
                item-text="SizeTitle"
                item-value="SizeID"
                dense
                outlined
                v-model="size_id"
                :error-messages="errors.size_id"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="庫存量"
                v-model="stock"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.stock"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="積材尺寸"
                v-model="deliver_volume"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.deliver_volume"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="商品重量"
                v-model="deliver_weight"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.deliver_weight"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="建議售價"
                v-model="price"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.price"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="實際售價"
                v-model="sell_price"
                hide-details="auto"
                outlined
                dense
                required
                :error-messages="errors.sell_price"
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
                v-model="status"
                :error-messages="errors.status"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="Cancel"> 取消 </v-btn>
        <v-btn color="primary" @click="CreateOption"> 新增 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmpty, validFileEmpty } from "@/common/validate.js";
export default {
  name: "OptionCreateDialog",
  props: {
    option_1: {
      require: true,
      type: Array,
    },
    option_2: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      size_id: -1,
      color_id: -1,
      stock: "",
      deliver_volume: "",
      deliver_weight: "",
      price: "",
      sell_price: "",
      title: "",
      status: "Y",
      dialog: false,
      status_array: [
        {
          title: "啟用",
          value: "Y",
        },
        {
          title: "停用",
          value: "N",
        },
      ],
      errors: {
        size_id: "",
        color_id: "",
        stock: "",
        deliver_volume: "",
        deliver_weight: "",
        price: "",
        sell_price: "",
        title: "",
        status: "",
      },
    };
  },
  methods: {
    Open(item) {
      this.size_id = item.SizeID;
      this.color_id = item.ColorID;
      this.stock = item.Stock;
      this.deliver_volume = item.DeliverVolume;
      this.deliver_weight = item.DeliverVolume;
      this.price = item.Price;
      this.sell_price = item.SellPrice;
      this.status = item.Status;
      this.dialog = true;
      this.errors = {
        size_id: "",
        color_id: "",
        stock: "",
        deliver_volume: "",
        deliver_weight: "",
        price: "",
        sell_price: "",
        status: "",
      };
    },
    Cancel() {
      this.size_id = -1;
      this.color_id = -1;
      this.stock = "";
      this.deliver_volume = "";
      this.deliver_weight = "";
      this.price = "";
      this.sell_price = "";
      this.status = "Y";
      this.dialog = false;
      this.errors = {
        size_id: "",
        color_id: "",
        stock: "",
        deliver_volume: "",
        deliver_weight: "",
        price: "",
        sell_price: "",
        status: "",
      };
    },
    CreateOption() {
      let error = false;
      this.errors = {
        size_id: "",
        color_id: "",
        stock: "",
        deliver_volume: "",
        deliver_weight: "",
        price: "",
        sell_price: "",
        status: "",
      };
      if (!validEmpty(this.color_id)) {
        this.errors.color_id = "請選擇規格";
        error = true;
      }
      if (!validEmpty(this.size_id)) {
        this.errors.size_id = "請選擇規格";
        error = true;
      }
      if (!validFileEmpty(this.stock)) {
        this.errors.stock = "請輸入庫存量";
        error = true;
      }
      if (!validFileEmpty(this.deliver_volume)) {
        this.errors.deliver_volume = "請輸入積材尺寸";
        error = true;
      }
      if (!validFileEmpty(this.deliver_weight)) {
        this.errors.deliver_weight = "請輸入重量";
        error = true;
      }
      if (!validFileEmpty(this.price)) {
        this.errors.price = "請輸入建議售價";
        error = true;
      }
      if (!validFileEmpty(this.sell_price)) {
        this.errors.sell_price = "請輸入實際售價";
        error = true;
      }
      if (!error) {
        let Data = {};
        Data.ColorID = this.color_id;
        Data.SizeID = this.size_id;
        Data.Stock = this.stock;
        Data.Status = this.status;
        Data.DeliverVolume = this.deliver_volume;
        Data.DeliverWeight = this.deliver_weight;
        Data.Price = this.price;
        Data.SellPrice = this.sell_price;
        this.$emit("update-stock", Data);
      }
    },
  },
};
</script>