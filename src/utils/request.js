import axios from 'axios';
import {Toast, Dialog} from 'vant';

// 一个 axios 实例
const service = axios.create({
  // baseURL: 'http://tim.natapp1.cc/newbuckmoo/',
  baseURL: 'http://lslm.live/newbuckmoo/',
  withCredentials: true,  // send cookies when cross-domain requests
  timeout: 5000,  // request timeout
});

// request 拦截器
service.interceptors.request.use();

// response 拦截器
service.interceptors.response.use(
  res => {
    console.log(res);
    if (res.data.code !== 0) {
      Toast.fail(res.data.msg);
    }

    return res.data;
  },

  err => {
    Dialog.alert({
      message: '服务器开小差啦~'
    });

    return err.data;
  }
);

export default service;
