import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
var VueCookie = require('vue-cookie');

Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.config.productionTip = false;

Vue.prototype.$ImageUrl = (item) => {
  return item == '' ? '' : process.env.VUE_APP_BASEURL + item;
};

Vue.prototype.$SetImageObj = (item, image_url) => {
  let tmp_data = Object.assign({}, item);
  tmp_data.type = 'image';
  tmp_data.Image1 = null;
  tmp_data.PreviewImage = Vue.prototype.$ImageUrl(image_url);
  return tmp_data;
};

Date.prototype.addDays = function(d) {
  return new Date(this.valueOf() + 864e5 * d);
};
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
};

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
