import Vue from 'vue';;
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
   count:0
}
const actions = {
    
}
const mutations = {
    //为AlertValue添加新的监控对象
    Add:function(){
        state.count++;
    }
}
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations
})
