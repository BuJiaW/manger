// 引入路由 vuex
import router from './router'
import store from './store'
router.beforeEach((to, from, next) => {
    // 获取token值
    const token = store.state.token;
    // 没有token (没有登录)
    if (!token) {
        // 再判断 如果所处的路由不是登录页的话就跳转到登录页
        if (to.path != '/login') {
            next('login');
        } else {
            next();
        }
    } else { //有token (登录了)
        const userInfo = store.state.info;
        // 再判获取到用户信息了没
        if (!userInfo) {
            next('/login')
        } else {
            if (to.path == '/login') {
                next(from.path);
            } else {
                next();
            }
        }
    }
})