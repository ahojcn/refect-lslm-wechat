import request from '@/utils/request';

// 学生简历信息上传
export function uploadStudentResume(data) {
  return request({
    url: 'approve/student',
    method: 'post',
    data
  })
}

// 学生获取兼职列表
export function getPositionList(data) {
  return request({
    url: 'student/position/list',
    method: 'post',
    data
  })
}

// 学生申请兼职
export function applyStudentPosition(data) {
  return request({
    url: 'student/position/apply',
    method: 'post',
    data
  })
}
