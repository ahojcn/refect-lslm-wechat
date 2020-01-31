import request from '@/utils/request';

// 发送手机验证码
export function sendVerifyKey(data) {
  return request({
    url: 'basic-info/verify-key',
    method: 'post',
    data
  })
}

// 用户绑定手机号
export function bindPhone(data) {
  return request({
    url: 'basic-info/bind-phone',
    method: 'post',
    data
  })
}

// 获取用户详细信息
export function getUserInfo(data) {
  return request({
    url: 'basic-info/getUserInfo',
    method: 'post',
    data
  })
}
