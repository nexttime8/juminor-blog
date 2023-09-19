import request from '@/utils/request'

// 查询博客标签分类列表
export function listTags(query) {
    return request({
        url: '/article/tags/list',
        method: 'get',
        params: query
    })
}

// 查询博客标签分类详细
export function getTags(tagsId) {
    return request({
        url: '/article/tags/' + tagsId,
        method: 'get'
    })
}

// 根据标签名查询标签详情
export function getTagsIdByName(name) {
    return request({
        url: '/article/tags/name/' + name,
        method: 'get'
    })
}


// 新增博客标签分类
export function addTags(data) {
    return request({
        url: '/article/tags',
        method: 'post',
        data: data
    })
}

// 修改博客标签分类
export function updateTags(data) {
    return request({
        url: '/article/tags',
        method: 'put',
        data: data
    })
}

// 删除博客标签分类
export function delTags(tagsId) {
    return request({
        url: '/article/tags/' + tagsId,
        method: 'delete'
    })
}
