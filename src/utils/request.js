import axios from 'axios';
import {Toast, Dialog} from 'vant';
import store from '../store';

// 一个 axios 实例
const service = axios.create({
  // baseURL: 'http://tim.natapp1.cc/newbuckmoo/',
  baseURL: 'http://lslm.live/newbuckmoo/',
  withCredentials: true,  // send cookies when cross-domain requests
  // timeout: 5000,  // request timeout
});

// request 拦截器
service.interceptors.request.use(
  config => {
    store.state.loading = true;

    return config;
  },
  err => {
    store.state.loading = false;

    return err;
  }
);

// response 拦截器
service.interceptors.response.use(
  res => {
    store.state.loading = false;

    if (res.data.code !== 0) {
      // Toast.fail(res.data.msg);
      // Dialog.alert({
      //   message: res.data.msg
      // });
    }

    return res.data;
  },

  err => {
    store.state.loading = false;

    // Dialog.alert({
    //   message: '网络似乎出了些小问题~'
    // });

    return err.data;
  }
);

export default service;
