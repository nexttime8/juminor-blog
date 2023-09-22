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

// 新增、修改、删除功能不可用

