import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '../components/Layout'
Vue.use(VueRouter);
const routes = [

<<<<<<< HEAD
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
    redirect: '/login',
    children: [
      {
        path: '/index',
        component: () => import("../views/index"),
      }
    ]
  },
=======
    // 登录
    {
        path: '/login',
        name: "login",
        component: () =>
            import ("../views/login"),
>>>>>>> 383396c427c67cc7f381fc11447602969af59901

    },
    // 首页
    {
        path: '/',
        name: "Layout",
        component: Layout,
        redirect: '/index',
        children: [{
            path: '/index',
            component: () =>
                import ("../views/index"),
            meta: { title: '首页', auth: true }

        }]
    },

    // 会员管理
    {
        path: '/',
        component: Layout,
        children: [{
            path: 'menber',
            component: () =>
                import ("../views/merber"),
            meta: { title: '会员管理', auth: false }
        }]
    },

    // 供应商管理
    {
        path: '/supplier',
        component: Layout,
        children: [{
            path: '/',
            component: () =>
                import ("../views/supplier"),
            meta: { title: '供应商管理', auth: false }
        }]
    },

    // 商品管理
    {
        path: '/goods',
        component: Layout,
        children: [{
            path: '/',
            component: () =>
                import ("../views/goods"),
            meta: { title: '商品管理', auth: false }
        }]
    },

    // 员工管理
    {
        path: '/staff',
        component: Layout,
        children: [{
            path: '/',
            component: () =>
                import ("../views/staff"),
            meta: { title: '员工管理', auth: false }

        }]
    },

];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

export default router;