import Server from '../../utils/request'

// 渲染数据接口
export function bjw_getList(page,limit){
    return Server({
        url:`/supplier/list/search/${page}/${limit}`,
        method:'post',
        data:{
            page,limit
        }
    })
}

// 删除数据接口
export function bjw_Delete(id){
    return Server({
        url:`supplier/${id}`,
        method:'DELETE',
        data:{
            id
        }
    })
}

// 获取需要编辑的数据
export function bjw_Update(id){
    return Server({
        url:`supplier/${id}`,
        method:'get',
        data:{
            id
        }
    })
}

//编辑
export function bjw_Edit(id){
    return Server({
        url:`supplier/${id}`,
        method:'put',
        data:{
            id
        }
    })
}