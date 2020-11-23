import Vue from "vue";
import Vuex from "vuex";
import {getUserToken,getUserInfo} from "../utils/auth"
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
  mutations: {},
  actions: {
    //登录
    UserLogin({commit},form){
      return new Promise((resolve,reject)=>{
        login(form.username.trim(),form.password.trim()).then(response=>{
        const res=response.data;
        if(res.flag){
          //获取token
          const token =res.data.token;
          resolve(res);
          commit("SET_TOKEN",token)
        }
        })
      })
    }
  },
  modules: {}
});
