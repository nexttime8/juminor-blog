import request from '@/utils/request'

// 查询博客文章列表（分页）
export function listArticles(query) {
  return request({
    url: '/article/articles/list',
    method: 'get',
    params: query
  })
}

// 查询博客文章列表（所有）
export function AllArticles() {
  return request({
    url: '/article/articles/all',
    method: 'get',
  })
}

// 查询博客文章详细
export function getArticles(articleId) {
  return request({
    url: '/article/articles/' + articleId,
    method: 'get'
  })
}

// 新增博客文章
export function addArticles(data) {
  return request({
    url: '/article/articles',
    method: 'post',
    data: data
  })
}

// 修改博客文章
export function updateArticles(data) {
  return request({
    url: '/article/articles',
    method: 'put',
    data: data
  })
}

// 删除博客文章
export function delArticles(articleId) {
  return request({
    url: '/article/articles/' + articleId,
    method: 'delete'
  })
}
