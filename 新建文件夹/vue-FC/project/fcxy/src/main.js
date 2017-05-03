import Vue from 'vue';
import Vuex from 'vuex';
import store from "./vuex/store.js";
Vue.prototype.$store = store;
import safeAlert from "./vuex/safeAlert.js";
Vue.prototype.$safeAlert = safeAlert;
import adminListStore from './vuex/adminListStore.js';
Vue.prototype.$adminListStore = adminListStore;
import crypto from 'crypto';
Vue.prototype.$crypto = crypto;
//路由
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
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

// 定义组件, 也可以像教程之前教的方法从别的文件引入
import secondcomponent from './App.vue';
import login from './component/login_component.vue';
import second from './component/second.vue';
import adminListCom from './component/adminListCom.vue';
import studentList from './component/studentList.vue';
import courseList from './component/courseList.vue';
import vedioList from './component/vedioList.vue';
import courseEditList from './component/courseEditList.vue';
// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname+"/",
    routes: [
        {
            path: '/',
            component: login
        },
        {
            path: '/second',
            component: second
        },
        {
            path:'/adminListCom',
            component:adminListCom
        },
        {
            path:'/studentList',
            component:studentList
        }
        ,
        {
            path:'/courseList',
            component:courseList
        }
        ,
        {
            path:'/vedioList',
            component:vedioList
        }
        ,
        {
            path:'/courseEditList',
            component:courseEditList
        }
    ]
});
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router:router,
    store,
    safeAlert

}).$mount('#app')
//  render: h => h(App)
