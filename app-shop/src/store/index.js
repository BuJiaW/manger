import Vue from "vue";
import Vuex from "vuex";
import {login,getInfo,logout} from "../api/login"
import {getUserToken,getUserInfo,setUserToken,setUserInfo} from "../utils/auth"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:getUserToken(),
    info:getUserInfo()
  },
  getters:{
    token(state){
      return state.token;
    },
    info(state){
      return state.info;
    }
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token;
      setUserToken(token)
    },
    SET_INFO(state,info){
      state.info = info;
      setUserInfo(info);
    }  
  },
  actions: {
    //登录
    UserLogin({commit},form){
      return new Promise((resolve,reject)=>{
        login(form.username.trim(),form.password.trim()).then(res=>{
        if(res.flag){
          //获取token
          const token =res.data.token;
          resolve(res);
          commit("SET_TOKEN",token)
        }
        })
      })
    },
     //退出
     UserLogout({commit}){
      return new Promise((resolve, reject) => {
        logout().then(res=>{
          if(res.flag){
            commit("SET_TOKEN",null);
            commit("SET_INFO",null);
            // removeUser();
            resolve(res)
          }
        })
      })
    }
  },
  modules: {}
});
