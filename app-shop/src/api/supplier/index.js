import Server from '../../utils/request'

export function bjw_getList(page,limit){
    return Server({
        url:`/supplier/list/search/${page}/${limit}`,
        method:'post',
        data:{
            page,limit
        }
    })
}