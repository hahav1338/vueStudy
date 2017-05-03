import Vue from 'vue';
import Vuex from 'vuex';
import store from "./vuex/store.js";
//将store实例绑到原型上
Vue.prototype.$store = store;
import crypto from 'crypto';
Vue.prototype.$crypto = crypto;
//路由
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
//引入axios模块
import axios from 'axios';
//允许跨域请求携带cookie
axios.defaults.withCredentials = true;
//将axios赋值给Vue，以便在子组件中使用
Vue.prototype.$reqs = axios;
//开启debug模式
Vue.config.debug = true;
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);

// 引入组件
import first from './component/firstComponent.vue';
import second from './component/secondComponent.vue';
// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname+"/",
    routes: [
        {
            path: '/',
            component: first
        },
        {
            path: '/second',
            component: second
        }
    ]
});
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router:router,
    store
}).$mount('#app')

