import requset from '../../utils/request'
export function login(username,password){
    return requset({
        url:'/user/login',
        method:'POST',
        data:{
          username,
          password
        }
    })

}