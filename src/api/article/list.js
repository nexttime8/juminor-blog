import request from '@/utils/request'

// 查询博客文章列表（分页）
export function listArticles(query) {
  return request({
    url: '/article/articles/list',
    method: 'get',
    params: query
  })
}

// 查询博客文章详细
export function getArticles(articleId) {
  return request({
    url: '/article/articles/' + articleId,
    method: 'get'
  })
}

// 新增、修改、删除功能不可用