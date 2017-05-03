import Vue from 'vue';
import Vuex from 'vuex';
import store from './store.js';
// 告诉 vue “使用” vuex
Vue.use(Vuex);
const state = {
    currentPwd :"",
    newPwd:"",
    confirmPwd:"",
    AlertInputArr:{
        list:[{
            rowName:"当前密码",
            width:300,
            defaultObj: {
                defaultStr:"",
                bl:function(event){
                    var str = event.target.value;
                    Vue.prototype.$reqs({//获取当前管理员信息crypto
                        method: 'post',
                        url: Vue.prototype.$store.state.url.BASEURL+Vue.prototype.$store.state.url.RETURNADMIN
                    }).then(function (response) {
                        var md5 = Vue.prototype.$crypto.createHash('md5');
                        var password = md5.update(str).digest('base64');
                        console.log(password);
                        console.log(response.data.password);
                        if(response.data.password==password){
                            Vue.prototype.$safeAlert.state.currentPwd=str;
                        }else{

                            alert("当前密码不正确");
                            event.target.disabled = true;
                            setInterval(function (){
                                event.target.removeAttribute('disabled');
                            },10);
                        }

                    });

                }
            }


        },{
            rowName:"新密码",
            defaultStr:"987",
            width:300,
            defaultObj: {
                defaultStr:"",
                bl:function(event){
                    var str = event.target.value;
                    var strs = event.target;
                    if(!str||str.length<6){

                        alert("密码不能为空且不能少于6位");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }else{
                        Vue.prototype.$safeAlert.state.newPwd=str;
                    }


                }
            }
        },{
            rowName:"确认密码",
            width:300,
            defaultObj: {
                defaultStr:"",
                bl:function(event){
                    var str = event.target.value;
                    if( Vue.prototype.$safeAlert.state.newPwd!== str){
                        alert("两次输入不一致");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }else{
                        Vue.prototype.$safeAlert.state.confirmPwd=str;
                    }

                }
            }
        }],

        btn:[{ background:'#6EC131',
            btn_click:function(){
                if(!Vue.prototype.$safeAlert.state.currentPwd|| Vue.prototype.$safeAlert.state.currentPwd.length<6){
                    alert("当前密码有误");
                    return false;
                }
                if(!Vue.prototype.$safeAlert.state.newPwd|| Vue.prototype.$safeAlert.state.newPwd.length<6){
                    alert("新密码有误");
                    return false;
                }
                if(!Vue.prototype.$safeAlert.state.confirmPwd||Vue.prototype.$safeAlert.state.confirmPwd.length<6){
                    alert("确认密码有误");
                    return false;
                }//UPDATEPASSWORD
                Vue.prototype.$reqs({
                    method: 'post',
                    url: Vue.prototype.$store.state.url.BASEURL+Vue.prototype.$store.state.url.UPDATEPASSWORD,
                    data:{
                        userPwd:Vue.prototype.$safeAlert.state.currentPwd,
                        newPwd:Vue.prototype.$safeAlert.state.newPwd
                    }
                }).then(function (response) {
                    if(response.data.success){
                        store.state.updateElement.safeAlertContent.style.display='none';
                    }else{
                        alert(response.data.err);
                    };
                });

            },
            btn_text:"确定"},
            { background:'#4F66B3',
            btn_click:function(){
                store.state.updateElement.safeAlertContent.style.display='none';

            },
            btn_text:"取消"}]
    }
}

const mutations = {
    getCurrentPwd:function(){
        return state.currentPwd;
    },
    setCurrentPwd:function(state,str){
        state.currentPwd=str;
    },
    getNewPwd:function(){
        return state.newPwd;
    },
    setNewPwd:function(state,str){
        state.newPwd=str;
    },
    getConfirmPwd:function(){
        return state.confirmPwd;
    },
    setConfirmPwd:function(state,str){
        state.confirmPwd=str;
    }
}
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations
})
