<template>
  <v-dialog ref="dialog" v-model="modal" width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :label="label"
        :value="value"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        @click="SetDateTime"
      ></v-text-field>
    </template>

    <v-card>
      <v-tabs v-model="tab" color="basil" grow>
        <v-tab>
          日期
        </v-tab>
        <v-tab>
          時間
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card color="basil" flat>
            <v-date-picker
              header-color="primary"
              color="primary"
              v-model="date"
              scrollable
              class="rounded-0"
              locale="zh-tw"
              @input="tab = 1"
            >
            </v-date-picker>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil" flat>
            <v-time-picker v-model="time" format="ampm"></v-time-picker>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal = false">
          取消
        </v-btn>
        <v-btn text color="primary" @click="Update">
          確認
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DateTimePicker',
  props: {
    label: {
      type: String,
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      modal: false,
      date: '',
      time: '',
      tab: 0,
    };
  },
  methods: {
    Update() {
      if (this.date == '') {
        this.$emit('input', '');
      } else if (this.time == '') {
        this.$emit('input', this.date + ' ' + '00:00:00');
      } else {
        this.$emit('input', this.date + ' ' + this.time + ':00');
      }
      this.modal = false;
    },
    SetDateTime() {
      this.tab = 0;
      if (this.value == '') {
        this.date = '';
        this.time = '';
      } else {
        this.date = this.value.slice(0, 10);
        this.time = this.value.slice(11, -1);
      }
    },
  },
};
</script>
