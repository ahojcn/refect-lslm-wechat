// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

// import axios from 'axios';
// import VueAxios from 'vue-axios';

import VueCookie from 'vue-cookie';

import Vant from 'vant';

// Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(Vant);

// axios.defaults.baseURL = 'http://tim.natapp1.cc/newbuckmoo/';
// axios.defaults.withCredentials = true;
// Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
