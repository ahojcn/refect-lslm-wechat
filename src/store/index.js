import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {getUserInfo} from '@/api/basic-info';

let store = new Vuex.Store({
  state: {
    clubInfo: {},
    companyInfo: {},
    studentInfo: {},
    userInfo: {},
    isNewUser: false,

    activeTabBar: 'home',
  },
  getters: {},
  mutations: {},
  actions: {
  },
});

export default store;
