import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/froalaEditor';
import draggable from 'vuedraggable';
import VueCookie from 'vue-cookie';
import { loadScript } from './plugins/loadScript';
import './plugins/globalMethods';

Vue.use(VueCookie);
Vue.config.productionTip = false;

const loadApexCharts = () =>
  loadScript('https://cdn.jsdelivr.net/npm/apexcharts');
const loadVueApexCharts = () =>
  loadScript('https://cdn.jsdelivr.net/npm/vue-apexcharts');

const initVue = () => {
  Vue.component('VueApexCharts', window.VueApexCharts);
  Vue.component('draggable', draggable);
  new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
};

loadApexCharts()
  .then(loadVueApexCharts)
  .then(initVue)
  .catch((err) => console.warn(err));
