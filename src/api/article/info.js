import request from '@/utils/request'

// 查询作者关注信息列表
export function listInfo(query) {
  return request({
    url: '/article/info/list',
    method: 'get',
    params: query
  })
}

// 查询作者关注信息详细
export function getInfo(ID) {
  return request({
    url: '/article/info/' + ID,
    method: 'get'
  })
}

// 新增作者关注信息
export function addInfo(data) {
  return request({
    url: '/article/info',
    method: 'post',
    data: data
  })
}

// 修改作者关注信息
export function updateInfo(data) {
  return request({
    url: '/article/info',
    method: 'put',
    data: data
  })
}

// 删除作者关注信息
export function delInfo(ID) {
  return request({
    url: '/article/info/' + ID,
    method: 'delete'
  })
}
