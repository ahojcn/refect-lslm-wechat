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

    loading: false,
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
    updateUserInfo(store, openId) {
      return getUserInfo({openId: openId}).then(res => {
        res = res.data;
        let state = store.state;
        state.userInfo = res.userInfo;
        state.clubInfo = res.clubInfo;
        state.companyInfo = res.companyInfo;
        state.studentInfo = res.studentInfo;

        // 保存 openId
        localStorage.setItem('openId', res.userInfo.openId);

        return res;
      });
    },
  },
});

export default store;
