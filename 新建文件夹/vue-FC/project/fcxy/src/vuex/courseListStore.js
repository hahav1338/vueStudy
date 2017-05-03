import Vue from 'vue';
import Vuex from 'vuex';
import store from './store.js';
import axios from 'axios';
//允许跨域请求携带cookie
axios.defaults.withCredentials = true;
// 告诉 vue “使用” vuex
Vue.use(Vuex);
const state = {
    searchText:{value:"课程名称"},//查询课程名
    catalogOne:{value:""},//专业分类一级数据
    catalogTwo:{value:""},//专业分类二级数据
    catalogThree:{value:""},//专业分类三级数据
    catalogList:[],//专业分类数组数据
    pageStart:1,//查询起始页
    pageSize:3,//每页显示条数
    maxCourseCount:0,//课程列表的最大页码
    minCourseCount:1,//课程列表的最小页码
    selectorList:[
        {
            defaultStr:{value:""},
            selectorStyle:{'width':'300px','height':'25px'},
            options:[],
            _this:this,
            clickFn:function(event,item){
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
                        this._this.a.state.selectorList[1].options.push({});
                    }
                    this._this.a.state.selectorList[1].options[k].fatherId = arrTemp[k].fatherId;
                    this._this.a.state.selectorList[1].options[k].power = arrTemp[k].power;
                    this._this.a.state.selectorList[1].options[k].sysId = arrTemp[k].sysId;
                    this._this.a.state.selectorList[1].options[k].title = arrTemp[k].title;
                    this._this.a.state.selectorList[1].options[k]._id = arrTemp[k]._id;
                }
                if(event.target.innerText){
                    console.log(typeof item.sysId);
                    this._this.a.state.catalogOne.value = item.sysId;
                }
            }
        },
        {
            defaultStr:{value:""},
            selectorStyle:{'width':'300px','height':'25px'},
            options:[],
            _this:this,
            clickFn:function(event,item){
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
                        this._this.a.state.selectorList[2].options.push({});
                    }
                    this._this.a.state.selectorList[2].options[k].fatherId = arrTemp[k].fatherId;
                    this._this.a.state.selectorList[2].options[k].power = arrTemp[k].power;
                    this._this.a.state.selectorList[2].options[k].sysId = arrTemp[k].sysId;
                    this._this.a.state.selectorList[2].options[k].title = arrTemp[k].title;
                    this._this.a.state.selectorList[2].options[k]._id = arrTemp[k]._id;
                };
                if(event.target.innerText){
                    this._this.a.state.catalogTwo.value = item.sysId;
                }
            }
        },
        {
            defaultStr:{value:""},
            selectorStyle:{'width':'300px','height':'25px'},
            options:[],
            _this:this,
            clickFn:function(event,item){
                if(event.target.innerText){
                    this._this.a.state.catalogThree.value = item.sysId;
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
            tfootShow:true,
            NextClick:function(){
                this._this.a.commit('addPageStart');
                tableCourseList(this._this.a.state.pageStart);
            },
            PrevClick:function(){
                this._this.a.commit('subPrevClick');
                tableCourseList(this._this.a.state.pageStart);
            },
            LastClick:function(){

                tableCourseList( this._this.a.state.maxCourseCount);
            },
            FirstClick:function(){
                tableCourseList( this._this.a.state.minCourseCount);
            },
            btn_click:function(event){//课程列表的条件查询
                tableCourseList({
                    searchText:this._this.a.state.searchText.value==="课程名称"?"":this._this.a.state.searchText,
                    CategoryOne:this._this.a.state.catalogOne.value,
                    CategoryTwo:this._this.a.state.catalogTwo.value,
                    CategoryThree:this._this.a.state.catalogThree.value
                });
            },
            putawayData:function(data){//处理上下架
                axios({
                    method: 'post',
                    url:  store.state.url.BASEURL+ store.state.url.COURSESTATE,
                    data:{
                        ID:data.ID
                    }
                }).then(function (response) {
                    if(response.data.success){

                        //重新请求数据
                        tableCourseList();
                    }


                });
            },
            stickData:function(data){//处理是否置顶
                axios({
                    method: 'post',
                    url:  store.state.url.BASEURL+ store.state.url.COURSEISTOP,
                    data:{
                        ID:data.ID
                    }
                }).then(function (response) {
                    if(response.data.success){

                        //重新请求数据
                        tableCourseList();
                    }


                });
            },
            update:function(data){//编辑课程信息
                    window.location = "/courseEditList?Cname="+data.Cname+"&Cprice="+data.Cprice+"&Cpic="+data.Cpic+"&Cdetails="+data.Cdetails+"&category="+data.category
                    +"&ID="+data.ID+"&_id="+data._id+"&CategoryOne="+data.CategoryOne+"&CategoryTwo="+data.CategoryTwo+"&CategoryThree="+data.CategoryThree+"&Cdescribe="+data.Cdescribe;
            },
            deleteRow:function(data){//删除课程
                //删除课程
                axios({
                    method: 'post',
                    url:  store.state.url.BASEURL+ store.state.url.COURSEDELETE,
                    data:{
                        _id:data._id,
                        ID:data.ID
                    }

                }).then(function (response) {
                    console.log("汉武大帝");
                    console.log(response.data);
                    tableCourseList();
                });

            }
        },
        count:{value:1}
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
    if(num && typeof num === "number"){
        state.pageStart=num;
        state.tableList.count.value=num;
    }
    //条件查询数据
    var datas;
    if(num && typeof num === "object"){
        datas = num;
    }else{
        datas = {
            searchText:"",
            CategoryOne:"",
            CategoryTwo:"",
            CategoryThree:"",
            pageStart:state.pageStart
        }
    }
    axios({
        method: 'post',
        url:  store.state.url.BASEURL+ store.state.url.COURSELISTSHOW,
        data:datas
    }).then(function (response) {

        if(!response.data.err){
            state.maxCourseCount=Math.ceil(response.data.data.count/state.pageSize);
            state.searchText.value="课程名称";
            state.CategoryOne="";
            state.CategoryTwoe="";
            state.CategoryThree="";
            if(state.tableList.lists.length===0){
                for(var i = 0;i<response.data.data.list.length;i++){
                    var obj= {
                        Cname: response.data.data.list[i].Cname,
                        Cnumber: response.data.data.list[i].Cnumber,
                        onlineUser: response.data.data.list[i].onlineUser,
                        category: getCategory(response.data.data.list[i].CategoryTwo,response.data.data.list[i].CategoryThree),//需要重新计算
                        createAt:response.data.data.list[i].createAt,
                        isState:response.data.data.list[i].isState===1?"<span >草稿</span>":response.data.data.list[i].isState===2?"<span >在架</span>":"<span style='color:red;'>已下架</span>",
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
                        putawayText:response.data.data.list[i].isState===1||response.data.data.list[i].isState===3?"上架":"下架",
                        deleteButton: true,
                        stick: true,
                        stickText:!response.data.data.list[i].isTop?"置顶":"取消置顶",
                        blocking:false
                    }

                    state.tableList.lists.push(obj);

                }
            }else{
                for(var i = 0;i<state.pageSize;i++){
                    if(typeof state.tableList.lists[i]=="undefined"){
                        var newObj = {}
                        state.tableList.lists.push(newObj);
                    };

                    state.tableList.lists[i].Cname= response.data.data.list[i]?response.data.data.list[i].Cname:"";
                    state.tableList.lists[i].Cnumber=response.data.data.list[i]?response.data.data.list[i].Cnumber:"";
                    state.tableList.lists[i].onlineUser=response.data.data.list[i]?response.data.data.list[i].onlineUser:"";
                    state.tableList.lists[i].category=response.data.data.list[i]?getCategory(response.data.data.list[i].CategoryTwo,response.data.data.list[i].CategoryThree):"";//需要重新计算
                    state.tableList.lists[i].createAt=response.data.data.list[i]?response.data.data.list[i].createAt:"";
                    state.tableList.lists[i].isState=response.data.data.list[i]?response.data.data.list[i].isState===1?"<span >草稿</span>":response.data.data.list[i].isState===2?"<span >在架</span>":"<span style='color:red;'>已下架</span>":"";
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
                    state.tableList.lists[i].putawayText=response.data.data.list[i]?response.data.data.list[i].isState===1||response.data.data.list[i].isState===3?"上架":"下架":"",
                    state.tableList.lists[i].deleteButton=response.data.data.list[i]?true:false;
                    state.tableList.lists[i].stick=response.data.data.list[i]?true:false;
                    state.tableList.lists[i].stickText=response.data.data.list[i]?!response.data.data.list[i].isTop?"置顶":"取消置顶":"";
                    state.tableList.lists[i].blocking=false;

                }
            }
        }else{
            alert(response.data.err);
        };
    });
};
tableCourseList();

const mutations = {
    addPageStart:function(){
        if(state.pageStart<state.maxCourseCount){
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


