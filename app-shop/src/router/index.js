import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '../components/Layout'

Vue.use(VueRouter);

const routes = [

  // 登录
  {
    path: '/login',
    name: "login",
    component: () => import("../views/login"),
  },
  // 首页
  {
    path: '/',
    name: "Layout",
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import("../views/index"),
      }
    ]
  },

  // 会员管理
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'menber',
        component: () => import("../views/merber"),
      }
    ]
  },

  // 供应商管理
  {
    path: '/supplier',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import("../views/supplier"),
      }
    ]
  },

  // 商品管理
  {
    path: '/goods',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import("../views/goods"),
      }
    ]
  },

  // 员工管理
  {
    path: '/staff',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import("../views/staff"),
      }
    ]
  },

];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
