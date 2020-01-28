import axios from 'axios';
import {Notify} from 'vant';

// 一个 axios 实例
const service = axios.create({
  baseURL: 'http://tim.natapp1.cc/newbuckmoo/',
  withCredentials: true,  // send cookies when cross-domain requests
  timeout: 5000,  // request timeout
});

// request 拦截器
service.interceptors.request.use();

// response 拦截器
service.interceptors.response.use(
  res => {
    return res.data;
  },

  err => {
    Notify({type: 'danger', message: '网络错误'});
    return err.data;
  }
);

export default service;
