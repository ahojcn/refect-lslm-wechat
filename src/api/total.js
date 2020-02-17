import request from '@/utils/request';

// 获取平台服务协议
export function getServiceLicense() {
  return request({
    url: 'total/show/service-agree',
    method: 'get'
  })
}
