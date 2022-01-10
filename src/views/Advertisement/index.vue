<template src="./template.html"></template>

<script>
import { get_all_data } from "@/api/advertisement";
import ListShow from "@/components/Advertisement/ListShow/index";
import Breadcrumb from "@/components/Breadcrumb/";
import ImageShowDialog from "@/components/Advertisement/ImageShowDialog";
import category_components from "@/components/Advertisement/category_components.js";
import ad_components from "@/components/Advertisement/ad_components.js";
export default {
  name: "News",
  mixins: [category_components, ad_components],
  components: {
    ListShow,
    Breadcrumb,
    ImageShowDialog,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "頁面編輯",
          link: "",
        },
        {
          title: "廣告",
          link: "",
        },
      ],
      test: false,
      ad_categories: [],
      ad_data: [],
      ad_data_1: [],
      ad_data_2: [],
      ad_data_3: [],
    };
  },
  methods: {
    async GetNewsData() {
      this.ad_data_1 = [];
      this.ad_data_2 = [];
      this.ad_data_3 = [];
      get_all_data().then((res) => {
        console.log(res);
        this.ad_categories = res[0].data;
        this.ad_data = res[1].data;
        this.ad_data.forEach((item) => {
          if (item.AdvertisementCategoryID == 2) {
            this.ad_data_1.push(item);
          } else if (item.AdvertisementCategoryID == 3) {
            this.ad_data_2.push(item);
          } else if (item.AdvertisementCategoryID == 4) {
            this.ad_data_3.push(item);
          }
        });

        this.CheckSort();
      });
    },
    CheckSort() {
      let is_sort = true;
      this.ad_categories.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateNewsCategorySort();

      is_sort = true;
      this.ad_data.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      let data = [];
      this.ad_data.forEach((item, item_index) => {
        data.push({
          AdvertisementID: item.AdvertisementID,
          Seq: item_index + 1,
        });
      });
      is_sort ? "" : this.UpdateNewsSort(data);
    },
    OpenImageDialog(item) {
      this.$refs.ImageShowDialog.Open(item);
    },
  },
  created() {
    this.GetNewsData();
  },
};
</script>
