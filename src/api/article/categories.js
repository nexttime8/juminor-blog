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

// 新增博客文章分类
export function addCategories(data) {
  return request({
    url: '/article/categories',
    method: 'post',
    data: data
  })
}

// 修改博客文章分类
export function updateCategories(data) {
  return request({
    url: '/article/categories',
    method: 'put',
    data: data
  })
}

// 删除博客文章分类
export function delCategories(categoryId) {
  return request({
    url: '/article/categories/' + categoryId,
    method: 'delete'
  })
}
