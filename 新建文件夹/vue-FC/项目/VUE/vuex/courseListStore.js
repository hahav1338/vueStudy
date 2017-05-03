import Vue from 'vue';
import Vuex from 'vuex';
import store from './store.js';
import axios from 'axios';
//允许跨域请求携带cookie
axios.defaults.withCredentials = true;
// 告诉 vue “使用” vuex
Vue.use(Vuex);
const state = {
    searcheText:{value:"课程名称"},//查询课程名
    catalogOne:{},//专业分类一级数据
    catalogTwo:{},//专业分类二级数据
    catalogThree:{},//专业分类三级数据
    catalogList:[],//专业分类数组数据
    pageStart:1,//查询起始页
    pageSize:3,//每页显示条数
    maxCourseCount:0,//adminList列表的最大页码

    addBtnFlag :{'display':'none'},//控制添加弹窗的显示
    addAdminName:"",//用户名
    addAdminLongName:"",//姓名
    addAdminTel:"",//电话
    addPower:"",//权限
    addID:"",//对应数据的ID
    add_id:"",//对应数据的_id
    isUpdate:false,//是否是更新操作

    minAdminCount:1,//adminList列表的最小页码
    adminCurrentList:[],//adminList的当前数据段
    adminConfig:{},//adminList列表的配置项

    searchText:"",//模糊查询条件
    selectorList:[
        {
            defaultStr:{value:"1111"},
            selectorStyle:{'width':'300px','height':'25px'},
            options:[],
            _this:this,
            clickFn:function(event){
                var parentSysId;
                for(var i = 0;i< this._this.a.state.selectorList[0].options.length;i++){
                    if(this._this.a.state.selectorList[0].options[i].title===event.target.innerText){
                        parentSysId=this._this.a.state.selectorList[0].options[i].sysId;
                    }
                };
                var arrTemp = [];
                for(var j = 0;j<this._this.a.state.catalogList.length;j++){
                    if(this._this.a.state.catalogList[j].fatherId===parentSysId){
                        arrTemp.push(this._this.a.state.catalogList[j]);
                    }
                };
                //处理目标数组，保证长度小于等于赋值数组
                if(this._this.a.state.selectorList[1].options.length>arrTemp.length){
                    var m = 0;
                    while(m<(this._this.a.state.selectorList[1].options.length-arrTemp.length)){
                        m++;
                        this._this.a.state.selectorList[1].options.pop();
                    }
                }
                for(var k=0;k<arrTemp.length;k++){
                    if(!this._this.a.state.selectorList[1].options[k]){
                        this._this.a.state.selectorList[1].options[k]={};
                    }
                    this._this.a.state.selectorList[1].options[k].fatherId = arrTemp[k].fatherId;
                    this._this.a.state.selectorList[1].options[k].power = arrTemp[k].power;
                    this._this.a.state.selectorList[1].options[k].sysId = arrTemp[k].sysId;
                    this._this.a.state.selectorList[1].options[k].title = arrTemp[k].title;
                    this._this.a.state.selectorList[1].options[k]._id = arrTemp[k]._id;
                }
                //console.log(this._this.a.state.selectorList[1].options);
                // this._this.a.state.selectorList[1].options;
            }
        },
        {
            defaultStr:{value:"2222"},
            selectorStyle:{'width':'300px','height':'25px'},
            options:[],
            _this:this,
            clickFn:function(event){
                var parentSysId;
                for(var i = 0;i< this._this.a.state.selectorList[1].options.length;i++){
                    if(this._this.a.state.selectorList[1].options[i].title===event.target.innerText){
                        parentSysId=this._this.a.state.selectorList[1].options[i].sysId;
                    }
                };
                var arrTemp = [];
                for(var j = 0;j<this._this.a.state.catalogList.length;j++){
                    if(this._this.a.state.catalogList[j].fatherId===parentSysId){
                        arrTemp.push(this._this.a.state.catalogList[j]);
                    }
                }
                //处理目标数组，保证长度小于等于赋值数组
                if(this._this.a.state.selectorList[2].options.length>arrTemp.length){
                    var m = 0;
                    while(m<(this._this.a.state.selectorList[2].options.length-arrTemp.length)){
                        m++;
                        this._this.a.state.selectorList[2].options.pop();
                    }
                };
                for(var k=0;k<arrTemp.length;k++){
                    if(!this._this.a.state.selectorList[2].options[k]){
                        this._this.a.state.selectorList[2].options[k]={};
                    }
                    this._this.a.state.selectorList[2].options[k].fatherId = arrTemp[k].fatherId;
                    this._this.a.state.selectorList[2].options[k].power = arrTemp[k].power;
                    this._this.a.state.selectorList[2].options[k].sysId = arrTemp[k].sysId;
                    this._this.a.state.selectorList[2].options[k].title = arrTemp[k].title;
                    this._this.a.state.selectorList[2].options[k]._id = arrTemp[k]._id;
                };
            }
        },
        {
            defaultStr:{value:"33333"},
            selectorStyle:{'width':'300px','height':'25px'},
            options:[],
            clickFn:function(event){
                if(event.target.innerText==='系统管理员'){
                    Vue.prototype.$adminListStore.commit('setAddPower','系统管理员');
                }else{
                    Vue.prototype.$adminListStore.commit('setAddPower','课程管理员');
                }
            }
        }
    ],
    tableList:{
        selectList:[],
        th_lists:[{value:"课程名称",trueName:'Cname',width:"10%"},
            {value:"课程代号",trueName:'Cnumber',width:"10%"},
            {value:"在学人数",trueName:'onlineUser',width:"10%"},
            {value:"所属分类",trueName:'category',width:"20%"},
            {value:"编辑日期",trueName:'createAt',width:"20%"},
            {value:"状态",trueName:'isState',width:"10%"},
            {value:"操作",width:"20%"}],//列表头项数组
        lists: [

        ],
        btnList:{
            _this:this,
            NextClick:function(){
                this._this.a.commit('addPageStart');
                tableCourseList(this._this.a.state.pageStart);
            },
            PrevClick:function(){
                this._this.a.commit('subPrevClick');
                tableCourseList(this._this.a.state.pageStart);
            },
            LastClick:function(){

                tableCourseList( this._this.a.state.maxAdminCount);
            },
            FirstClick:function(){
                tableCourseList( this._this.a.state.minAdminCount);
            },
            btn_click:function(event){

                tableAdminList();
            },
            update:function(data){
                alert("123");
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
                Vue.prototype.$adminListStore.state.AlertInputArr.list[0].defaultObj.defaultStr=data.userName;
                Vue.prototype.$adminListStore.state.AlertInputArr.list[1].defaultObj.defaultStr=data.turename;
                Vue.prototype.$adminListStore.state.AlertInputArr.list[2].defaultObj.defaultStr=data.phone;
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
                        Vue.prototype.$adminListStore.state.AlertInputArr.list[0].defaultObj.defaultStr="";
                        Vue.prototype.$adminListStore.state.AlertInputArr.list[1].defaultObj.defaultStr="";
                        Vue.prototype.$adminListStore.state.AlertInputArr.list[2].defaultObj.defaultStr="";
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
        list:[{
            type:"input",
            rowName:"用户名",
            width:300,
            defaultObj: {
                defaultStr:"",
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
            defaultStr:"",
            width:300,
            defaultObj: {
                defaultStr:"",
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
                defaultStr:"",
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
            type:"selector",
            width:300,
            defaultStr:{value:""},
            selectorStyle:{'width':'300px','height':'20px'},
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
                            console.log(state.AlertInputArr.list[0].defaultObj.defaultStr);

                            state.AlertInputArr.list[0].defaultObj.defaultStr="";
                            console.log("11111111111111");
                            console.log(state.AlertInputArr.list[0].defaultObj.defaultStr);
                            state.AlertInputArr.list[1].defaultObj.defaultStr="";
                            state.AlertInputArr.list[2].defaultObj.defaultStr="";
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
                            state.AlertInputArr.list[0].defaultObj.defaultStr="";
                            state.AlertInputArr.list[1].defaultObj.defaultStr="";
                            state.AlertInputArr.list[2].defaultObj.defaultStr="";
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
                    state.AlertInputArr.list[0].defaultObj.defaultStr="";
                    state.AlertInputArr.list[1].defaultObj.defaultStr="";
                    state.AlertInputArr.list[2].defaultObj.defaultStr="";
                    state.AlertInputArr.list[3].defaultStr.value="";
                },
                btn_text:"取消"}]
    }
};
//专业下拉框数据请求
var selectorList = function(){
    axios({
        method: 'get',
        url:  store.state.url.BASEURL+ store.state.url.COURSESELECTORLIST

    }).then(function (response) {
        for(var i = 0;i< response.data.data.length;i++){//catalogOneList
            //加装第一个下拉框的数据
            if(response.data.data[i].fatherId===0){
                state.selectorList[0].options[i] = response.data.data[i];
                state.selectorList[0].options[i].power = response.data.data[i].title;
            }
            //将整个级联列表数据加装到仓库的catalogList字段
            state.catalogList[i] =  response.data.data[i];
            state.catalogList[i].power = response.data.data[i].title;
        }

    });
}
selectorList();
//获取对应课程的所属分类
var getCategory = function(fatherId,sysId){

    for(var i = 0;i< state.catalogList.length;i++){

        if(state.catalogList[i].fatherId===parseInt(fatherId) && state.catalogList[i].sysId===parseInt(sysId)){

            return state.catalogList[i].power;
        }
    }
}
//课程列表数据请求
var tableCourseList = function(num){
    if(num){
        state.pageStart=num;
        state.tableList.count.value=num;
    }
    console.log(state.pageStart);
    axios({
        method: 'post',
        url:  store.state.url.BASEURL+ store.state.url.COURSELISTSHOW,
        data:{
            searchText:"",
            CategoryOne:"",
            CategoryTwo:"",
            CategoryThree:"",
            pageStart:state.pageStart
        }
    }).then(function (response) {
        console.log(response.data.data);
        if(!response.data.err){
            state.maxCourseCount=Math.ceil(response.data.data.count/state.pageSize);
            if(state.tableList.lists.length===0){
                for(var i = 0;i<response.data.data.list.length;i++){
                    var obj= {
                        Cname: response.data.data.list[i].Cname,
                        Cnumber: response.data.data.list[i].Cnumber,
                        onlineUser: response.data.data.list[i].onlineUser,
                        category: getCategory(response.data.data.list[i].CategoryTwo,response.data.data.list[i].CategoryThree),//需要重新计算
                        createAt:response.data.data.list[i].createAt,
                        isState:response.data.data.list[i].isState===1?"<span >草稿</span>":response.data.data.list[i].isState===2?"<span >在架</span>":"<span >已下架</span>",
                        Cdetails:response.data.data.list[i].Cdetails,
                        ID: response.data.data.list[i].ID,
                        _id: response.data.data.list[i]._id,
                        upDateAt:response.data.data.list[i].upDateAt,
                        CategoryOne: response.data.data.list[i].CategoryOne,
                        CategoryTwo: response.data.data.list[i].CategoryTwo,
                        CategoryThree: response.data.data.list[i].CategoryThree,
                        Cdescribe: response.data.data.list[i].Cdescribe,
                        Cpic: response.data.data.list[i].Cpic,
                        Cprice: response.data.data.list[i].Cprice,
                        isDelete: response.data.data.list[i].isDelete,
                        isTop: response.data.data.list[i].isTop,
                        success: response.data.data.list[i].success,
                        edit:true,
                        clickClass: "",
                        putaway: true,
                        deleteButton: true,
                        stick: true,
                        blocking:true
                    }

                    state.tableList.lists.push(obj);

                }
            }else{
                for(var i = 0;i<state.pageSize;i++){
                    if(typeof state.tableList.lists[i]=="undefined"){
                        var newObj = {}
                        state.tableList.lists.push(newObj);
                    };
                    if(response.data.data.list.length===0){
                        return false;
                    };
                    state.tableList.lists[i].Cname= response.data.data.list[i]?response.data.data.list[i].Cname:"";
                    state.tableList.lists[i].Cnumber=response.data.data.list[i]?response.data.data.list[i].Cnumber:"";
                    state.tableList.lists[i].onlineUser=response.data.data.list[i]?response.data.data.list[i].onlineUser:"";
                    state.tableList.lists[i].category=response.data.data.list[i]?getCategory(response.data.data.list[i].CategoryTwo,response.data.data.list[i].CategoryThree):"";//需要重新计算
                    state.tableList.lists[i].createAt=response.data.data.list[i]?response.data.data.list[i].createAt:"";
                    state.tableList.lists[i].isState=response.data.data.list[i]?response.data.data.list[i].isState==="1"?"<span >草稿</span>":response.data.data.list[i].isState==="2"?"<span >在架</span>":"<span >已下架</span>":"";
                    state.tableList.lists[i].Cdetails=response.data.data.list[i]?response.data.data.list[i].Cdetails:"";
                    state.tableList.lists[i].ID=response.data.data.list[i]?response.data.data.list[i].ID:"";
                    state.tableList.lists[i]._id=response.data.data.list[i]?response.data.data.list[i]._id:"";
                    state.tableList.lists[i].upDateAt=response.data.data.list[i]?response.data.data.list[i].upDateAt:"";
                    state.tableList.lists[i].CategoryOne= response.data.data.list[i]?response.data.data.list[i].CategoryOne:"";
                    state.tableList.lists[i].CategoryTwo= response.data.data.list[i]?response.data.data.list[i].CategoryTwo:"";
                    state.tableList.lists[i].CategoryThree= response.data.data.list[i]?response.data.data.list[i].CategoryThree:"";
                    state.tableList.lists[i].Cdescribe=response.data.data.list[i]?response.data.data.list[i].Cdescribe:"";
                    state.tableList.lists[i].Cpic= response.data.data.list[i]?response.data.data.list[i].Cpic:"";
                    state.tableList.lists[i].Cprice= response.data.data.list[i]?response.data.data.list[i].Cprice:"";
                    state.tableList.lists[i].isDelete=response.data.data.list[i]?response.data.data.list[i].isDelete:"";
                    state.tableList.lists[i].isTop= response.data.data.list[i]?response.data.data.list[i].isTop:"";
                    state.tableList.lists[i].success= response.data.data.list[i]?response.data.data.list[i].success:"";
                    state.tableList.lists[i].edit= response.data.data.list[i]?true:false;
                    state.tableList.lists[i].clickClass="";
                    state.tableList.lists[i].putaway=response.data.data.list[i]?true:false;
                    state.tableList.lists[i].deleteButton=false;
                    state.tableList.lists[i].stick=response.data.data.list[i]?true:false;
                    state.tableList.lists[i].blocking=response.data.data.list[i]?true:false;

                }
            }
        }else{
            alert(response.data.err);
        };
    });
};
tableCourseList();
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


