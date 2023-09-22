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

// 新增、修改、删除功能不可用
