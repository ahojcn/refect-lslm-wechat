import request from '@/utils/request';

// 学生身份信息注册
export function approveStudent(data) {
  return request({
    url: 'approve/student',
    method: 'post',
    data
  })
}

// 企业身份信息注册
export function approveCompany(data) {
  return request({
    url: 'approve/company',
    method: 'post',
    data
  })
}

// 社团身份信息注册
export function approveClub(data) {
  return request({
    url: 'approve/club',
    method: 'post',
    data
  })
}
