import Vue from 'vue';
import Vuex from 'vuex';
import store from './store.js';
import axios from 'axios';
//允许跨域请求携带cookie
axios.defaults.withCredentials = true;
// 告诉 vue “使用” vuex
Vue.use(Vuex);
const state = {
    addBtnFlag :{'display':'none'},//控制添加弹窗的显示
    addAdminName:"",//用户名
    addAdminLongName:"",//姓名
    addAdminTel:"",//电话
    addPower:"",//权限
    addID:"",//对应数据的ID
    add_id:"",//对应数据的_id
    isUpdate:false,//是否是更新操作
    maxAdminCount:0,//adminList列表的最大页码
    minAdminCount:1,//adminList列表的最小页码
    adminCurrentList:[],//adminList的当前数据段
    adminConfig:{},//adminList列表的配置项
    pageStart:1,//查询起始页
    pageSize:3,//每页显示条数
    searchText:"",//模糊查询条件
    tableList:{
        th_lists:[{value:"用户名",trueName:'userName',width:"10%"},
            {value:"姓名",trueName:'turename',width:"10%"},
            {value:"后台权限",trueName:'power',width:"20%"},
            {value:"手机",trueName:'phone',width:"20%"},
            {value:"编辑日期",trueName:'createAt',width:"20%"},
            {value:"操作",width:"20%"}],//列表头项数组
        lists: [

        ],
        btnList:{
            _this:this,
            tfootShow:true,
            NextClick:function(){
                Vue.prototype.$adminListStore.commit('addPageStart');

                tableAdminList();
            },
            PrevClick:function(){
                Vue.prototype.$adminListStore.commit('subPrevClick');
                tableAdminList();
            },
            LastClick:function(){

                tableAdminList( Vue.prototype.$adminListStore.state.maxAdminCount);
            },
            FirstClick:function(){
                tableAdminList( Vue.prototype.$adminListStore.state.minAdminCount);
            },
            btn_click:function(event){

                tableAdminList();
            },
            update:function(data){
                console.log( Vue.prototype.$adminListStore.state);
                Vue.prototype.$adminListStore.state.addBtnFlag.display = 'block';
                Vue.prototype.$adminListStore.state.isUpdate=true;
                //改变仓库里的对应字段值
                Vue.prototype.$adminListStore.state.addAdminName=data.userName;
                Vue.prototype.$adminListStore.state.addAdminLongName=data.turename;
                Vue.prototype.$adminListStore.state.addAdminTel=data.phone;
                Vue.prototype.$adminListStore.state.addPower=data.power;
                Vue.prototype.$adminListStore.state.addID=data.ID;
                Vue.prototype.$adminListStore.state.add_id=data._id;
                //改变弹窗里的默认值
                Vue.prototype.$adminListStore.state.AlertInputArr.list[0].defaultObj.defaultStr.value=data.userName;
                Vue.prototype.$adminListStore.state.AlertInputArr.list[1].defaultObj.defaultStr.value=data.turename;
                Vue.prototype.$adminListStore.state.AlertInputArr.list[2].defaultObj.defaultStr.value=data.phone;
                Vue.prototype.$adminListStore.state.AlertInputArr.list[3].defaultStr.value=data.power;

            },
            deleteRow:function(data){//删除管理员
                //删除管理员
                axios({
                    method: 'get',
                    url:  store.state.url.BASEURL+ store.state.url.DELETEADMINSTOR+"&tokenId="+data.ID
                }).then(function (response) {
                    if(response.data.success){
                        console.log("67890");
                        console.log(response.data);
                        //恢复弹窗默认值
                        Vue.prototype.$adminListStore.state.AlertInputArr.list[0].defaultObj.defaultStr.value="";
                        Vue.prototype.$adminListStore.state.AlertInputArr.list[1].defaultObj.defaultStr.value="";
                        Vue.prototype.$adminListStore.state.AlertInputArr.list[2].defaultObj.defaultStr.value="";
                        Vue.prototype.$adminListStore.state.AlertInputArr.list[3].defaultStr.value="";
                        //重新请求数据
                        tableAdminList();
                    }


                });
            }
        },
        count:{value:1}
    },//管理员页面展示数据
    AlertInputArr:{
        alertName:{value:"管理员列表操作"},
        btn_click:function(){
            //恢复弹窗默认值
            state.addBtnFlag.display='none';
        },
        isComponentData:{
            iscomponent:true
        },
        list:[{
            type:"input",
            rowName:"用户名",
            width:300,
            defaultObj: {
                defaultStr:{value:"56"},
                bl:function(event){
                    if(!event.target.value){
                        alert("用户名不能为空");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }else{

                        Vue.prototype.$adminListStore.commit('setAddAdminName',event.target.value);
                    }
                }
            }


        },{
            type:"input",
            rowName:"姓名",
            width:300,
            defaultObj: {
                defaultStr:{value:""},
                bl:function(event){
                    if(!event.target.value){
                        alert("姓名不能为空");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }else{
                        Vue.prototype.$adminListStore.commit('setAddAdminLongName',event.target.value);
                    }

                }
            }
        },{
            type:"input",
            rowName:"手机号",
            width:300,
            defaultObj: {
                defaultStr:{value:""},
                bl:function(event){

                    if((!event.target.value||event.target.value.length<11)||!parseInt(event.target.value)){
                        alert("手机号码不正确");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }else{
                        Vue.prototype.$adminListStore.commit('setAddAdminTel',event.target.value);
                    }

                }
            }
        },{
            type:"powerSelector",
            width:300,
            defaultStr:{value:""},
            selectorStyle:{'width':'280px','height':'20px'},
            options:[],
            clickFn:function(event){
                if(event.target.innerText==='系统管理员'){
                    Vue.prototype.$adminListStore.commit('setAddPower','系统管理员');
                }else{
                    Vue.prototype.$adminListStore.commit('setAddPower','课程管理员');
                }
            }
        }],
        btn:[{ background:'#6EC131',
            btn_click:function(){

                if(!state.addAdminName){
                    alert("用户名有误");
                    return false;
                }
                if(!state.addAdminLongName){
                    alert("姓名有误");
                    return false;
                }
                if(!state.addAdminTel||state.addAdminTel.length<11){
                    alert("电话有误");
                    return false;
                }
                if(!state.isUpdate){
                    //添加管理员
                    axios({
                        method: 'post',
                        url:  store.state.url.BASEURL+ store.state.url.ADDADMINSTOR,
                        data:{
                            userName:state.addAdminName,
                            turename:state.addAdminLongName,
                            password:'123456',
                            power:state.addPower,
                            phone:state.addAdminTel
                        }
                    }).then(function (response) {
                        if(response.data.success){
                            //收回弹窗
                            state.addBtnFlag.display = 'none';
                            //回复update操作的默认值
                            state.addAdminName="";
                            state.addAdminLongName="";
                            state.addAdminTel="";
                            state.addPower="";
                            state.addID="";
                            state.add_id="";
                            state.isUpdate=false;
                            //恢复弹窗默认值
                            //console.log(state.AlertInputArr.list[0].defaultObj.defaultStr);

                            state.AlertInputArr.list[0].defaultObj.defaultSt.valuer="";
                            //console.log("11111111111111");
                            //console.log(state.AlertInputArr.list[0].defaultObj.defaultStr);
                            state.AlertInputArr.list[1].defaultObj.defaultStr.value="";
                            state.AlertInputArr.list[2].defaultObj.defaultStr.value="";
                            state.AlertInputArr.list[3].defaultStr.value="";
                            //重新请求数据
                            tableAdminList();
                        }


                    });
                }else{//更新管理员
                    /*
                    *    "userName":req.body.userName,
                     "turename":req.body.turename,
                     "phone":req.body.phone,
                     "power":req.body.power,
                    * */
                    axios({
                        method: 'post',
                        url:  store.state.url.BASEURL+ store.state.url.UPDATAADMINSTOR,
                        data:{
                            tokenId:state.addID,
                            userName:state.addAdminName,
                            turename:state.addAdminLongName,
                            power:state.addPower,
                            phone:state.addAdminTel
                        }
                    }).then(function (response) {
                        if(response.data.success){
                            //回复update操作的默认值
                            state.addAdminName="";
                            state.addAdminLongName="";
                            state.addAdminTel="";
                            state.addPower="";
                            state.addID="";
                            state.add_id="";
                            state.isUpdate=false;
                            //恢复弹窗默认值
                            state.AlertInputArr.list[0].defaultObj.defaultStr.value="";
                            state.AlertInputArr.list[1].defaultObj.defaultStr.value="";
                            state.AlertInputArr.list[2].defaultObj.defaultStr.value="";
                            state.AlertInputArr.list[3].defaultStr.value="";

                            //收回弹窗
                            state.addBtnFlag.display = 'none';
                            //重新请求数据
                            tableAdminList();
                        }


                    });

                }

            },
            btn_text:"确定"},
            { background:'#4F66B3',
                btn_click:function(){
                    state.addBtnFlag.display='none';
                    state.addAdminName="";
                    state.addAdminLongName="";
                    state.addAdminTel="";
                    state.addPower="";
                    state.addID="";
                    state.add_id="";
                    state.isUpdate=false;
                    //恢复弹窗默认值
                    state.AlertInputArr.list[0].defaultObj.defaultStr.value="";
                    state.AlertInputArr.list[1].defaultObj.defaultStr.value="";
                    state.AlertInputArr.list[2].defaultObj.defaultStr.value="";
                    state.AlertInputArr.list[3].defaultStr.value="";
                },
                btn_text:"取消"}]
    }
};
var tableAdminList = function(num){
    if(num){
        state.pageStart=num;
        state.tableList.count.value=num;
    }
    axios({
        method: 'get',
        url:  store.state.url.BASEURL+ store.state.url.GETADMINLIST+"&pageStart="+state.pageStart+"&searchText="+state.searchText

    }).then(function (response) {
        if(!response.data.err){
            state.maxAdminCount=Math.ceil(response.data.data.count/state.pageSize);
            if(state.tableList.lists.length===0){
                for(var i = 0;i<response.data.data.list.length;i++){
                    var obj= {
                        userName: response.data.data.list[i].userName,
                        turename: response.data.data.list[i].turename,
                        power: response.data.data.list[i].power,
                        phone: response.data.data.list[i].phone,
                        ID: response.data.data.list[i].tokenId,
                        _id: response.data.data.list[i]._id,
                        createAt:response.data.data.list[i].createAt,
                        edit: true,
                        clickClass: "",
                        putaway: false,
                        deleteButton: true,
                        stick: false
                    }

                    state.tableList.lists.push(obj);
                    //console.log(response.data.data.list.length);
                }
            }else{
                console.log("来来");
                console.log(response.data.data.list.length);
                for(var i = 0;i<state.pageSize;i++){
                        console.log(state.tableList.lists[i]);
                        if(typeof state.tableList.lists[i]=="undefined"){
                            var newObj = {}
                            state.tableList.lists.push(newObj);
                        }
                        state.tableList.lists[i].userName= response.data.data.list[i]?response.data.data.list[i].userName:"";
                        state.tableList.lists[i].turename= response.data.data.list[i]?response.data.data.list[i].turename:"";
                        state.tableList.lists[i].power=response.data.data.list[i]?response.data.data.list[i].power:"";
                        state.tableList.lists[i].phone=response.data.data.list[i]?response.data.data.list[i].phone:"";
                        state.tableList.lists[i].ID=response.data.data.list[i]?response.data.data.list[i].tokenId:"";
                        state.tableList.lists[i]._id=response.data.data.list[i]?response.data.data.list[i]._id:"";
                        state.tableList.lists[i].createAt=response.data.data.list[i]?response.data.data.list[i].createAt:"";
                        state.tableList.lists[i].edit= response.data.data.list[i]?true:false;
                        state.tableList.lists[i].clickClass="";
                        state.tableList.lists[i].putaway=false;
                        state.tableList.lists[i].deleteButton=response.data.data.list[i]?true:false;
                        state.tableList.lists[i].stick=false;


                }
            }
        }else{
            alert(response.data.err);
        };
    });
};
tableAdminList();
//取得power列表数据
(function(powerSelector){

    axios({
        method: 'get',
        url:  store.state.url.BASEURL+ store.state.url.GETPOWERS
    }).then(function (response) {

        if(response.data.success){
            for(var i = 0;i<response.data.data.length;i++){
                powerSelector.options[i]=response.data.data[i];
            }

        }else{
            alert(response.data.err);
        };
    });
})(state.AlertInputArr.list[3])
const mutations = {

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
        if(state.pageStart<state.maxAdminCount){
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

