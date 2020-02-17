import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {getUserInfo} from '@/api/basic-info';
import {getServiceLicense} from '@/api/total';

let store = new Vuex.Store({
  state: {
    clubInfo: {},
    companyInfo: {},
    studentInfo: {},
    userInfo: {},
    isNewUser: false,

    activeTabBar: 'home',

    loading: true,

    verifyCodeOk: false,  // 验证码输入正确后会变为 true

    serviceLicense: "",  // 用户服务协议
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
    // 获取用户协议
    getServiceLicense(store) {
      getServiceLicense().then(res => {
        store.serviceLicense = res.data
      });
    },
  },
});

export default store;
