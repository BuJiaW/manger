// 
/**
 * 员工管理接口文件
 * 引入axios配置文件
 */

import request from '../../utils/request'

// 获取数据
export const get = (data, page, pagesize) => {
    return request({
        url: `/staff/list/search/${page}/${pagesize}`,
        method: 'POST',
        data
    })
};
// 添加
export const add = (data) => {
    return request({
        url: `/staff`,
        method: 'POST',
        data
    })
};
// 编辑
export const updata = (data) => {
    return request({
        url: `/staff/${data.id}`,
        method: 'PUT',
        data
    })
};
// 删除
export const del = (id) => {
    return request({
        url: `/staff/${id}`,
        method: 'DELETE'
    })
};
// 获取单条数据
export const findOne = (id) => {
    return request({
        url: `/staff/${id}`,
        method: 'GET'
    })
}