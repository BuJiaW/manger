import Server from '../../utils/request'
export function getGoods(data,size,limit){
    return Server({
        url:`/goods/list/search/${size}/${limit}`,
        method:'post',
        data

    })
}
//删除
export function del(id){
    return Server({
        url:`/goods/${id}`,
        method:'delete',
        data:{
            id,
        }
    })
}
//添加

export function add(id){
    return Server({
        url:`/goods/${id}`,
        method:'put',
        data:{
            id,
        }
    })
}


