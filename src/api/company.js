import request from '@/utils/request';

// 企业发布/修改兼职信息
export function createPosition(data) {
  return request({
    url: 'company/position/create',
    method: 'post',
    data
  })
}

// 获取兼职标签列表
export function getPositionCategories() {
  return request({
    url: 'company/position/categories',
    method: 'get',
  })
}
