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
  },
  getters: {},
  mutations: {},
  actions: {
    // 获取用户详细信息
    updateInfo(store, data) {
    },

  },
});

export default store;
