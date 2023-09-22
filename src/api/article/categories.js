import request from '@/utils/request'

// 查询博客文章分类列表
export function listCategories(query) {
  return request({
    url: '/article/categories/list',
    method: 'get',
    params: query
  })
}

// 查询博客文章分类详细
export function getCategories(categoryId) {
  return request({
    url: '/article/categories/' + categoryId,
    method: 'get'
  })
}

// 新增、修改、删除功能不可用
