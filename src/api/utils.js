import request from '@/utils/request';

/**
 * 上传文件至文件服务器
 * @param file 文件
 * @param callback 上传进度处理函数
 */
export function uploadFile(file, callback) {
  let fd = new FormData();
  fd.append('file', file);

  return request({
    url: 'http://lslm.live:8090/fileserver/file/fileUpload',
    method: 'post',
    headers: { "Content-Type": "multipart/form-data" },
    data: fd,
    contentType: false,
    processData: false,
    onUploadProgress: callback,
  })
}
