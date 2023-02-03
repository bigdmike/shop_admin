<template src="./template.html"></template>

<script>
import { get_member } from '@/api/member';
import MainList from '@/components/MainList/';
import Breadcrumb from '@/components/Breadcrumb/';
export default {
  name: 'Members',
  components: {
    MainList,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '會員管理',
          link: '',
        },
        {
          title: '會員列表',
          link: '',
        },
      ],
      options: {},
      headers: [
        {
          text: '會員名稱',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
        {
          text: '會員帳號',
          align: 'start',
          sortable: false,
          value: 'Account',
        },
        { text: '註冊時間', value: 'created_at' },
        { text: '消費總額', value: 'TotalPrice' },
      ],
      member_data: null,
      trade_data: null,
      key_word: '',
    };
  },
  methods: {
    GetData() {
      get_member().then((res) => {
        this.trade_data = res[1].data.List;
        res[0].data.List.forEach((item, item_index) => {
          let total_price = 0;
          res[0].data.List[item_index].TableTitle = item.Name;
          this.trade_data.forEach((trade) => {
            if (trade.MemberID == item.MemberID && trade.Status != 'C') {
              total_price += parseInt(trade.Price);
            }
          });
          total_price = (total_price / 1).toFixed(0).replace('.', ',');
          total_price = total_price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          res[0].data.List[item_index].TotalPrice = total_price;
        });
        this.member_data = res[0].data.List;
      });
    },
  },
  computed: {
    filter_member() {
      if (this.member_data == null) {
        return [];
      }
      if (this.key_word != '') {
        return this.member_data.filter(
          (item) =>
            item.Name.indexOf(this.key_word) != -1 ||
            item.Phone.indexOf(this.key_word) != -1 ||
            item.Account.indexOf(this.key_word) != -1
        );
      } else {
        return this.member_data;
      }
    },
  },
  created() {
    this.GetData();
  },
};
</script>

<style>
.searchbar .filter_btn {
  height: 40px !important;
  border-radius: 5px 0 0 5px;
  border-right: 0px;
  border-color: #888;
}
.searchbar .searchtext .v-input__control .v-input__slot {
  border-radius: 0px 5px 5px 0px;
}
.searchbar .display_btn {
  height: 40px !important;
}
.opacity-0 {
  opacity: 0;
}
</style>
