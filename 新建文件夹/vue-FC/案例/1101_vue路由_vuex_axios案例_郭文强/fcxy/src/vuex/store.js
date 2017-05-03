import Vue from 'vue';
import Vuex from 'vuex'
// 告诉 vue “使用” vuex
Vue.use(Vuex);
const state = {
    count:{value:0}
}

const mutations = {
    add:function(){
        state.count.value+=1;

    }
}
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations
})