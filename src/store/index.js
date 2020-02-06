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
  mutations: {
    // 设置 TabBar
    setActiveTabBar(state, name) {
      state.activeTabBar = name;
    },
  },
  actions: {
    // 更新用户信息
    updateUserInfo(store) {
      getUserInfo({openId: store.state.userInfo.openId}).then(res => {
        res = res.data;
        let state = store.state;
        state.userInfo = res.userInfo;
        state.clubInfo = res.clubInfo;
        state.companyInfo = res.companyInfo;
        state.studentInfo = res.studentInfo;
      });
    },
  },
});

export default store;
