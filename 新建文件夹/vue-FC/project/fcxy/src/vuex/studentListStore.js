import Vue from 'vue';
import Vuex from 'vuex';
import store from './store.js';
import axios from 'axios';
//允许跨域请求携带cookie
axios.defaults.withCredentials = true;
// 告诉 vue “使用” vuex
Vue.use(Vuex);
const state = {
    searchText_userName:{value:"用户名"},//查询用户名
    searchText_email:{value:"邮箱"},//查询邮箱
    searchText_phone:{value:"手机号"},//查询手机号
    addText_userName:{value:"用户名"},//添加用户名
    addText_email:{value:"邮箱"},//添加邮箱
    addText_phone:{value:"手机号"},//添加手机号
    pageStart:1,//查询起始页
    pageSize:6,//每页显示条数
    maxStudentCount:0,//adminList列表的最大页码
    minStudentCount:1,//adminList列表的最小页码

    tableList:{
        th_lists:[{value:"用户名",trueName:'userName',width:"10%"},
            {value:"邮箱",trueName:'email',width:"50%"},
            {value:"手机",trueName:'phone',width:"10%"},
            {value:"注册日期",trueName:'createAt',width:"10%"},
            {value:"状态",trueName:'status',width:"10%"},
            {value:"操作",width:"10%"}],//列表头项数组
        lists: [

        ],
        btnList:{
            _this:this,
            tfootShow:true,
            NextClick:function(){
                this._this.a.commit('addPageStart');
                tableStudentList(this._this.a.state.pageStart);
            },
            PrevClick:function(){
                this._this.a.commit('subPrevClick');
                tableStudentList(this._this.a.state.pageStart);
            },
            LastClick:function(){

                tableStudentList( this._this.a.state.maxStudentCount);
            },
            FirstClick:function(){
                tableStudentList( this._this.a.state.minStudentCount);
            },
            //条件查询
            btn_search_click:function(event){

                //如输入框值都为空或都为默认值，则不执行库操作
                if((!this._this.a.state.searchText_email.value||!this._this.a.state.searchText_phone.value||!this._this.a.state.searchText_userName.value)||(this._this.a.state.searchText_email.value==="邮箱"&&this._this.a.state.searchText_phone.value==="手机号"&&this._this.a.state.searchText_userName.value==="用户名")){
                    alert("搜索输入值不合法");
                    return false;
                }
                //执行条件查询
                tableStudentList();
            },
            //添加
            btn_add_click:function(event){
                var $studentListStore = this._this.a;
                //如输入框值为空或为默认值，则不执行库操作
                if(!this._this.a.state.addText_email.value||this._this.a.state.addText_email.value==="邮箱"||!this._this.a.state.addText_phone.value||this._this.a.state.addText_phone.value==="手机号"||this._this.a.state.addText_userName.value==="用户名"||!this._this.a.state.addText_userName.value){
                    alert("输入值不合法");
                    return false;
                }
                //添加学员
                axios({
                    method: 'post',
                    url:  store.state.url.BASEURL+ store.state.url.ADDUSERS,
                    data:{
                        addemail:this._this.a.state.addText_email.value,  //邮箱
                        addphone:this._this.a.state.addText_phone.value,  //手机号
                        adduserName:this._this.a.state.addText_userName.value//用户名

                    }
                }).then(function (response) {
                    if(response.data.success){

                       // 重置添加输入框默认值
                        $studentListStore.state.addText_email.value = "邮箱";
                        $studentListStore.state.addText_userName.value = "用户名";
                        $studentListStore.state.addText_phone.value = "手机号";

                        tableStudentList();
                    }
                });
                //tableStudentList();
            },
            blocking:function(data){
                //冻结学员
                axios({
                    method: 'get',
                    url:  store.state.url.BASEURL+ store.state.url.LOCKUSER+"&tokenId="+data.ID
                }).then(function (response) {
                    if(response.data.success){
                        tableStudentList();
                    }
                });

            }

        },
        count:{value:1}
    }
};
var tableStudentList = function(num){
    if(num){
        state.pageStart=num;
        state.tableList.count.value=num;
    }
    axios({
        method: 'post',
        url:  store.state.url.BASEURL+ store.state.url.STUDENTLIST,
        data:{
            userName:state.searchText_userName.value==="用户名"?"":state.searchText_userName.value,
            email:state.searchText_email.value==="邮箱"?"":state.searchText_email.value,
            phone:state.searchText_phone.value==="手机号"?"":state.searchText_phone.value,
            pageStart:state.pageStart
        }
    }).then(function (response) {

        if(!response.data.err){
            state.maxStudentCount=Math.ceil(response.data.data.count/state.pageSize);
            if(state.tableList.lists.length===0){
                for(var i = 0;i<response.data.data.list.length;i++){
                    var obj= {
                        userName: response.data.data.list[i].userName,
                        email: response.data.data.list[i].email,
                        phone: response.data.data.list[i].phone,
                        status: response.data.data.list[i].isstate?"正常":"<span style='color:red;'>已冻结</span>",
                        success:response.data.data.list[i].success,
                        upDateAt:response.data.data.list[i].upDateAt,
                        userPwd:response.data.data.list[i].userPwd,
                        ID: response.data.data.list[i].tokenId,
                        _id: response.data.data.list[i]._id,
                        createAt:response.data.data.list[i].createAt,
                        edit:false,
                        clickClass: "",
                        putaway: false,
                        deleteButton: false,
                        stick: false,
                        blocking:true
                    }

                    state.tableList.lists.push(obj);

                }
            }else{
                for(var i = 0;i<state.pageSize;i++){
                    if(typeof state.tableList.lists[i]=="undefined"){
                        var newObj = {}
                        state.tableList.lists.push(newObj);
                    }
                    state.tableList.lists[i].userName= response.data.data.list[i]?response.data.data.list[i].userName:"";
                    state.tableList.lists[i].email= response.data.data.list[i]?response.data.data.list[i].email:"";
                    state.tableList.lists[i].phone=response.data.data.list[i]?response.data.data.list[i].phone:"";
                    state.tableList.lists[i].status=response.data.data.list[i]? response.data.data.list[i].isstate?"正常":"<span style='color:red;'>已冻结</span>":"";
                    state.tableList.lists[i].success=response.data.data.list[i]?response.data.data.list[i].success:"";
                    state.tableList.lists[i].upDateAt=response.data.data.list[i]?response.data.data.list[i].upDateAt:"";
                    state.tableList.lists[i].userPwd=response.data.data.list[i]?response.data.data.list[i].userPwd:"";
                    state.tableList.lists[i].ID=response.data.data.list[i]?response.data.data.list[i].tokenId:"";
                    state.tableList.lists[i]._id=response.data.data.list[i]?response.data.data.list[i]._id:"";
                    state.tableList.lists[i].createAt=response.data.data.list[i]?response.data.data.list[i].createAt:"";
                    state.tableList.lists[i].edit= false;
                    state.tableList.lists[i].clickClass="";
                    state.tableList.lists[i].putaway=false;
                    state.tableList.lists[i].deleteButton=false;
                    state.tableList.lists[i].stick=false;
                    state.tableList.lists[i].blocking=response.data.data.list[i]?true:false;

                }
            }
        }else{
            alert(response.data.err);
        };
    });
};
tableStudentList();

const mutations = {
    setaddText_phone:function(state,str){
        state.addText_phone.replace(state.addText_phone,str,0);
    },
    setAddBtnFlag:function(state,str){
        state.addBtnFlag.display=str;
    },
    setAddAdminName:function(state,str){
        state.addAdminName=str;
    },
    setAddAdminLongName:function(state,str){
        state.addAdminLongName=str;
    },
    setAddAdminTel:function(state,str){
        state.addAdminTel=str;
    },
    setAddPower:function(state,str){
        state.addPower=str;
    },
    addPageStart:function(){
        if(state.pageStart<state.maxStudentCount){
            state.pageStart++;
            state.tableList.count.value=state.pageStart;
        }

    },
    subPrevClick:function(){
        if(state.pageStart>1){
            state.pageStart--;
            state.tableList.count.value=state.pageStart;
        }
    },
    setFlag:function(state,str){
        state.AlertInputArr.list[0].defaultObj.defaultStr=str;
    }

}
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations
})

