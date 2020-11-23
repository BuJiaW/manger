import Server from '../../utils/request'
export function getGoods(data,size,limit){
    return Server({
        url:`/goods/list/search/${size}/${limit}`,
        method:'post',
        data

    })
}

