import Vue from 'vue';
import Vuex from 'vuex';
import store from './store.js';
import axios from 'axios';
//允许跨域请求携带cookie
axios.defaults.withCredentials = true;
// 告诉 vue “使用” vuex
Vue.use(Vuex);
var uuidfn = function() {//生成uuid码

    var len=8;
    var radix = 0;
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
};
const state = {
    catalogOne:{value:""},//专业分类一级数据
    catalogTwo:{value:""},//专业分类二级数据
    catalogThree:{value:""},//专业分类三级数据
    courseVideoName:{value:""},//课程名称
    courseDtail:{value:""},//课程详情
    coursePrice:{value:""},//课程价格
    catalogList:[],//专业分类数组数据
    uploadFlag:{'display':"none"},//图片上传弹窗控制按钮
    uploadUrl:{value:''},//图片上传返回路径
    addCatalogFlag:{'display':"none"},//添加目录弹窗控制按钮
    addVideoFlag:{'display':"none"},//添加视频弹窗控制按钮
    course_id:{value:""},//对应课程_id
    courseID:{value:""},//对应课程ID
    Cdescribe:{value:""},//课程描述
    updateCatalogFlag:false,//编辑目录弹窗控制按钮
    updateCatalogObj:{},//处于编辑状态的目录数据
    clickCatalogObj:{},//处于选定状态的目录数据

    pageStart:1,//查询起始页
    pageSize:3,//每页显示条数
    searchText:{value:"模糊查找:视频名称"},//模糊查询条件
    maxVedioCount:0,//视频列表的最大页码
    minVedioCount:1,//视频列表的最小页码
    addBtnFlag :{'display':'none'},//控制添加弹窗的显示
    isUpdate:false,//是否是更新操作
    updateVideoId:"",//更新操作对应视频ID
    tableDirectoryList:{//课程编辑页面的目录列表信息
        th_lists:[{value:"目录",trueName:'CDName',width:"20%"},
            {value:"课件数",trueName:'CourseNumber',width:"60%"},
            {value:"操作",width:"20%"}],//列表头项数组
        lists: [

        ],
        btnList:{
            _this:this,
            tfootShow:false,
            update:function(data){
                this._this.a.state.addCatalogFlag.display = 'block';
                //改变仓库里的对应字段值
                this._this.a.state.updateCatalogFlag = true;
                this._this.a.state.updateCatalogObj = data;
                this._this.a.state.addCatalogAlertArr.list[0].defaultObj.defaultStr.value = data.CDName;
                //console.log(data);

            },
            clickRow:function(e,data,num){
                this._this.a.state.clickCatalogObj = data;
                getTableDirectoryVideoList(data._id,data.ID,data.CDid);
            },
            deleteRow:function(data){
                var __this = this;
                axios({
                    method: 'get',
                    url:  store.state.url.BASEURL+ store.state.url.DELETECOURSEDIRECTORY+"&ID="+data.ID+"&CDid="+data.CDid+"&_id="+data._id
                }).then(function (response) {
                    getTableDirectoryList();
                    //__this._this.a.state.addCatalogFlag.display = 'none';
                    //__this._this.a.state.updateCatalogObj = null;
                    //__this._this.a.state.updateCatalogFlag = false;
                });
            }
        },
        count:{value:1}

    },
    tableList_video:{//课程编辑页面的视频列表信息
        th_lists:[{value:"视频名称",trueName:'Vname',width:"20%"},
            {value:"时长",trueName:'Vtime',width:"60%"},
            {value:"操作",width:"20%"}],//列表头项数组
        lists: [

        ],
        btnList:{
            _this:this,
            tfootShow:false,
            NextClick:function(){
                this._this.a.commit('addPageStart');
                tableVedioList(this._this.a.state.pageStart);
            },
            PrevClick:function(){
                this._this.a.commit('subPrevClick');
                tableVedioList(this._this.a.state.pageStart);
            },
            LastClick:function(){

                tableVedioList( this._this.a.state.maxVedioCount);
            },
            FirstClick:function(){
                tableVedioList( this._this.a.state.minVedioCount);
            },
            btn_click:function(event){
                tableVedioList();
            },
            clickRow:function(e,data,num){
                alert("456");
                console.log("8/888888");
                console.log(data);
            },
            update:function(data){//列表的编辑
                this._this.a.state.addBtnFlag.display = 'block';
                //改变仓库里的对应字段值
                this._this.a.state.isUpdate = true;
                this._this.a.state.updateVideoId = data.ID;
                (function(arr){
                    for(var i = 0;i<arr.length;i++){
                        if(arr[i].rowName.indexOf("视频上传")!=-1){
                            arr[i].defaultObj.defaultStr.value=data.Vurl;
                        }

                    }
                })(this._this.a.state.AlertInputArr.list,data);
                (function(arr){
                    for(var i = 0;i<arr.length;i++){
                        if(arr[i].rowName.indexOf("视频名称")!=-1){
                            arr[i].defaultObj.defaultStr.value=data.Vname;
                        }

                    }
                })(this._this.a.state.AlertInputArr.list,data);
                (function(arr){
                    for(var i = 0;i<arr.length;i++){
                        if(arr[i].rowName.indexOf("视频时长")!=-1){
                            arr[i].defaultObj.defaultStr.value=data.Vtime;
                        }

                    }
                })(this._this.a.state.AlertInputArr.list,data);

            },
            deleteRow:function(data){

                /*
                * _id目录_id
                * CDid课程_id
                * Vid视频_id
                * */
                axios({
                    method: 'get',
                    url:  store.state.url.BASEURL+ store.state.url.DELETEVIDEOCOURSEDIRECTORY+"&_id="+state.clickCatalogObj._id+"&CDid="+state.course_id.value+"&Vid="+data._id

                }).then(function (response) {
                    console.log("汉东码农");
                    getTableDirectoryVideoList(state.clickCatalogObj._id,state.clickCatalogObj.ID,state.course_id.value);
                });
            }
        },
        count:{value:1}
    },
    //课程信息数据
    courseList:[
        {
            type:"input",

            rowName:"<i style='color:red'>*</i><span style='font-size:8px'>课程名称:</span>",
            rowSupplement:'<i style="font-size:8px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;60字以内</i>',
            width:450,
            defaultObj: {
                _this:this,
                defaultStr:{value:""},
                bl:function(event){
                    if(!event.target.value||event.target.value.length>60){
                        alert("课程名称不能为空");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }else{
                        console.log("input_default里的this是啥");
                        this._this.a.state.courseVideoName.value=event.target.value;
                        this.defaultStr.value=event.target.value;
                    }

                }
            }
        },
        {
            type:"input",
            rowName:"<i style='color:red'>*</i><span style='font-size:8px'>课程描述:</span>",
            rowSupplement:'<i style="font-size:8px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100字以内</i>',
            width:450,
            defaultObj: {
                _this:this,
                defaultStr:{value:""},
                bl:function(event){
                    if(!event.target.value||event.target.value.length>100){
                        alert("课程描述不能为空且不能超过100字");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }else{
                        this.defaultStr.value=event.target.value;
                        this._this.a.state.Cdescribe.value=event.target.value;
                    }

                }
            }
        },
        {
            type:"input",
            rowName:"<i style='color:red'>*</i><span style='font-size:8px'>课程价格:</span>",
            rowSupplement:'<i style="font-size:8px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;课程的价格以元为单位，免费课程设置为0</i>',
            width:270,
            defaultObj: {
                _this:this,
                defaultStr:{value:""},
                bl:function(event){
                    if(event.target.value.length>0){
                        this.defaultStr.value=event.target.value;
                        this._this.a.state.coursePrice.value=event.target.value;

                    }else{
                        alert("课程价格不能为空");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }

                }
            }
        }
    ],
    //专业选择下拉框信息
    selectorList:[
        {
            defaultStr:{value:""},
            selectorStyle:{'width':'150px','height':'25px','margin-right':'10px'},
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
            selectorStyle:{'width':'150px','height':'25px','margin-right':'10px'},
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
            selectorStyle:{'width':'150px','height':'25px','margin-right':'10px'},
            options:[],
            _this:this,
            clickFn:function(event,item){
                if(event.target.innerText){
                    this._this.a.state.catalogThree.value = item.sysId;
                }
            }
        }
    ],
    //图片上传弹窗数据
    uploadAlertArr:{
        alertName:{value:"图片操作"},
        btn_click:function(){
            //恢复弹窗默认值
            state.uploadFlag.display='none';
            //state.uploadUrl.value = "";

        },
        isComponentData:{
            iscomponent:true
        },
        list:[{
            _this:this,
            type:"img_Upload",//表单控件种类
            accept:"image/gif,image/jpeg,image/x-png",//上传控件限制种类
            rowName:"<i style='color:red;height:16px;line-height:16px'>*</i>图片上传",//地址栏输入框前缀
            width:280,//视频上传地址栏输入框宽度
            uuids:uuidfn(),//组件每被引用一次给上传控件绑定一个特殊的id
            aText:"选择图片",//input file对应按钮名称
            aTextU:"上传",//上传按钮名称
            aTextC:"清除",//清除按钮名称
            videos:{value:""},//视频数据
            imags:{value:""},//图片数据
            defaultObj: {
                defaultStr:{value:"图片应小于4M"},
                fs:function(event){
                    throw "跳出函数";
                }
            }


        }],
        btn:[]
    },
    //添加目录弹窗数据
    addCatalogAlertArr:{//添加目录弹窗数据
        alertName:{value:"目录操作"},
        btn_click:function(){
            //恢复弹窗默认值
            state.addCatalogFlag.display='none';
        },
        isComponentData:{
            iscomponent:true
        },
        list:[{
            type:"input",
            rowName:"<i style='color:red;height:16px;line-height:16px'>*</i>目录名称",
            rowSupplement:'<i style="font-size:8px"></i>',
            width:280,
            defaultObj: {
                defaultStr:{value:""},
                bl:function(event){
                    if(!event.target.value||event.target.value.length>60){
                        alert("目录名称不能为空");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }else{
                        this.defaultStr.value=event.target.value;
                    }

                }
            }
        }],//getTableDirectoryList
        btn:[{ background:'#6EC131',
            _this:this,
            btn_click:function(){
                if(!state.addCatalogAlertArr.list[0].defaultObj.defaultStr.value){return false;}
                    var __this = this;
                /*updateCatalogFlag:false,//编辑目录弹窗控制按钮
                 updateCatalogObj:{},//处于编辑状态的目录数据*/
                if(!state.updateCatalogFlag){
                    //目录添加
                    axios({
                        method: 'post',
                        url:  store.state.url.BASEURL+ store.state.url.ADDCOURSEDIRECTORY,
                        data:{
                            CDName:state.addCatalogAlertArr.list[0].defaultObj.defaultStr.value,
                            CDid:state.course_id.value
                        }
                    }).then(function (response) {
                        getTableDirectoryList(response);
                        __this._this.a.state.addCatalogFlag.display = 'none';
                    });
                }else{
                    /*rs = [
                     {"_id":new ObjectID(req.body._id)},
                     {"$set":{
                     CDName : req.body.CDName*/

                    //console.log("6666666");
                    axios({
                        method: 'post',
                        url:  store.state.url.BASEURL+ store.state.url.UPDATECOURSEDIRECTORY,
                        data:{
                            _id:state.updateCatalogObj._id,
                            CDName:state.addCatalogAlertArr.list[0].defaultObj.defaultStr.value,
                            CDid:state.updateCatalogObj.CDid
                        }
                    }).then(function (response) {
                        getTableDirectoryList(response);
                        __this._this.a.state.addCatalogFlag.display = 'none';
                        __this._this.a.state.updateCatalogObj = null;
                        __this._this.a.state.updateCatalogFlag = false;
                    });

                }






            },
            btn_text:"确定"},
            { background:'#4F66B3',
                btn_click:function(){
                    //恢复弹窗默认值
                    state.addCatalogFlag.display='none';
                    state.updateCatalogObj = null;
                    state.updateCatalogFlag = false;
                },
                btn_text:"取消"}]
    },
    //课程编辑时添加视频弹窗
    addVideoAlertInputArr:{
        alertName:{value:"目录对应操作"},
        btn_click:function(){
            //恢复弹窗默认值
            state.addVideoFlag.display='none';
            //console.log();

        },
        isComponentData:{
            _this:this,
            iscomponent:false,
            addVideo:function(data){
                //ADDVIDEOCOURSEDIRECTORY
                //_id,CDid,Vid
                /*  course_id:{value:""},//对应课程_id
                 courseID:{value:""},//对应课程ID
                 Cdescribe:{value:""},//课程描述
                 updateCatalogFlag:false,//编辑目录弹窗控制按钮
                 updateCatalogObj:{},//处于编辑状态的目录数据*/
                console.log("跨界追讨");
                //console.log(state.courseVideoName.value);
                //console.log(data);
                console.log(state.clickCatalogObj._id,state.clickCatalogObj.ID,state.course_id.value);
                //console.log(this._this);
                if(state.courseID.value&&state.clickCatalogObj&&state.clickCatalogObj._id&&data._id){

                    axios({
                        method: 'get',
                        url:  store.state.url.BASEURL+ store.state.url.ADDVIDEOCOURSEDIRECTORY+"&_id="+state.clickCatalogObj._id+"&CDid="+state.course_id.value+"&Vid="+data._id
                    }).then(function (response) {
                        console.log(response.data);
                        state.addVideoFlag.display = 'none';
                        console.log(state.clickCatalogObj._id,state.clickCatalogObj.ID,state.course_id.value);
                        getTableDirectoryVideoList(state.clickCatalogObj._id,state.clickCatalogObj.ID,state.course_id.value);
                        //getTableDirectoryList(response);
                        //__this._this.a.state.addCatalogFlag.display = 'none';
                        //__this._this.a.state.updateCatalogObj = null;
                        //__this._this.a.state.updateCatalogFlag = false;
                    });
                }else{
                    alert("9999");
                }
            }
        },
        list:[],
        btn:[]
    }
};
//获取专业选择下拉框信息
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
var getTableDirectoryVideoList = function(_id,ID,CDid){//组织课程对应的视频
    //_id对应目录_id
    //CDid对应课程_id
    axios({
     method: 'get',
     url:  store.state.url.BASEURL+ store.state.url.GETDIRECTORYVIDEOLIST+"&_id="+_id+"&CDid="+CDid

     }).then(function (response) {
         console.log(response.data);
        if(state.tableList_video.lists.length===0){
            for(var i = 0;i<response.data.data.list.length;i++){
                state.tableList_video.lists.push({
                    Vname:response.data.data.list[i].Vname,
                    Vtime:response.data.data.list[i].Vtime,
                    Vurl:response.data.data.list[i].Vurl,
                    ID:response.data.data.list[i].ID,
                    _id:response.data.data.list[i]._id,
                    edit: false,
                    clickClass: "",
                    putaway: false,
                    deleteButton: true,
                    stick: false
                });
            }

        }else if(state.tableList_video.lists.length!==0&&response.data.data.list.length>=state.tableList_video.lists.length){
            for(var j = 0;j<response.data.data.list.length;j++){

                if(!state.tableList_video.lists[j]===undefined){
                    state.tableList_video.lists[j]={};
                }
                state.tableList_video.lists[j].Vname=response.data.data.list[j].Vname;
                state.tableList_video.lists[j].Vtime=response.data.data.list[j].Vtime;
                state.tableList_video.lists[j].Vurl=response.data.data.list[j].Vurl;
                state.tableList_video.lists[j].ID=response.data.data.list[j].ID;
                state.tableList_video.lists[j]._id=response.data.data.list[j]._id;
                state.tableList_video.lists[j].edit= false;
                state.tableList_video.lists[j].clickClass= "";
                state.tableList_video.lists[j].putaway= false;
                state.tableList_video.lists[j].deleteButton= true;
                state.tableList_video.lists[j].stick= false;
                //通知vue更新模板
                Vue.set(state.tableList_video.lists, j, state.tableList_video.lists[j]);
            }
        }else if(state.tableList_video.lists.length!==0&&response.data.data.list.length<state.tableList_video.lists.length){
            for(var j = 0;j<state.tableList_video.lists.length;j++){
                state.tableList_video.lists[j].Vname=response.data.data.list[j]?response.data.data.list[j].Vname:"";
                state.tableList_video.lists[j].Vtime=response.data.data.list[j]?response.data.data.list[j].Vtime:"";
                state.tableList_video.lists[j].Vurl=response.data.data.list[j]?response.data.data.list[j].Vurl:"";
                state.tableList_video.lists[j].ID=response.data.data.list[j]?response.data.data.list[j].ID:"";
                state.tableList_video.lists[j]._id=response.data.data.list[j]?response.data.data.list[j]._id:"";
                state.tableList_video.lists[j].edit= false;
                state.tableList_video.lists[j].clickClass= "";
                state.tableList_video.lists[j].putaway= false;
                state.tableList_video.lists[j].deleteButton= response.data.data.list[j]?true:false;
                state.tableList_video.lists[j].stick= false;
                //通知vue更新模板
                Vue.set(state.tableList_video.lists, j, state.tableList_video.lists[j]);
            }
        }

     });
};
var getTableDirectoryList = function(){
        /* course_id:{value:""},//对应课程_id
         courseID:{value:""},//对应课程ID*/
    axios({
        method: 'get',
        url:  store.state.url.BASEURL+ store.state.url.GETDIRECTORYLIST+"&CDid="+state.course_id.value

    }).then(function (response) {
            //遍历结果集给目录列表重新赋值
            if(state.tableDirectoryList.lists.length===0){
                for(var i = 0;i<response.data.data.list.length;i++){
                    state.tableDirectoryList.lists.push({
                        CDName:response.data.data.list[i].CDName,
                        CDid:response.data.data.list[i].CDid,
                        CourseNumber:response.data.data.list[i].CourseNumber,
                        ID:response.data.data.list[i].ID,
                        _id:response.data.data.list[i]._id,
                        edit: true,
                        clickClass: "",
                        putaway: false,
                        deleteButton: true,
                        stick: false
                    });
                }

            }else if(state.tableDirectoryList.lists.length!==0&&response.data.data.list.length>state.tableDirectoryList.lists.length){
                for(var j = 0;j<response.data.data.list.length;j++){
                    if(!state.tableDirectoryList.lists[j]){
                        state.tableDirectoryList.lists[j]={};
                    }
                        state.tableDirectoryList.lists[j].CDName=response.data.data.list[j].CDName;
                        state.tableDirectoryList.lists[j].CDid=response.data.data.list[j].CDid;
                        state.tableDirectoryList.lists[j].CourseNumber=response.data.data.list[j].CourseNumber;
                        state.tableDirectoryList.lists[j].ID=response.data.data.list[j].ID;
                        state.tableDirectoryList.lists[j]._id=response.data.data.list[j]._id;
                        state.tableDirectoryList.lists[j].edit= true;
                        state.tableDirectoryList.lists[j].clickClass= "";
                        state.tableDirectoryList.lists[j].putaway= false;
                        state.tableDirectoryList.lists[j].deleteButton= true;
                        state.tableDirectoryList.lists[j].stick= false;
                        //通知vue更新模板
                    Vue.set(state.tableDirectoryList.lists, j, state.tableDirectoryList.lists[j]);
                }
            }else if(state.tableDirectoryList.lists.length!==0&&response.data.data.list.length<state.tableDirectoryList.lists.length){
                for(var j = 0;j<state.tableDirectoryList.lists.length;j++){
                    state.tableDirectoryList.lists[j].CDName=response.data.data.list[j]?response.data.data.list[j].CDName:"";
                    state.tableDirectoryList.lists[j].CDid=response.data.data.list[j]?response.data.data.list[j].CDid:"";
                    state.tableDirectoryList.lists[j].CourseNumber=response.data.data.list[j]?response.data.data.list[j].CourseNumber:"";
                    state.tableDirectoryList.lists[j].ID=response.data.data.list[j]?response.data.data.list[j].ID:"";
                    state.tableDirectoryList.lists[j]._id=response.data.data.list[j]?response.data.data.list[j]._id:"";
                    state.tableDirectoryList.lists[j].edit= response.data.data.list[j]?true:false;
                    state.tableDirectoryList.lists[j].clickClass= "";
                    state.tableDirectoryList.lists[j].putaway= false;
                    state.tableDirectoryList.lists[j].deleteButton= response.data.data.list[j]?true:false;
                    state.tableDirectoryList.lists[j].stick= false;
                    //通知vue更新模板
                    Vue.set(state.tableDirectoryList.lists, j, state.tableDirectoryList.lists[j]);
                }
            }

            console.log(state.tableDirectoryList.lists);



    });
};
var tableVedioList = function(num){//获取视频列表数据
    if(num){
        state.pageStart=num;
        state.tableList.count.value=num;
    }
    axios({
        method: 'get',
        url:  store.state.url.BASEURL+ store.state.url.VEDIOLISTSHOW+"&pageStart="+state.pageStart+"&searchText="+(state.searchText.value==="模糊查找:视频名称"?"":state.searchText.value)+"&pageSize="+state.pageSize

    }).then(function (response) {
        /*

         Vurl : "temporary\video\upload_5242b6b3a8feb01eb577680caff58eab.mp4"

         isFinish: false
         isViewed : false
         updateAt:"2017-02-28T08:10:30.651Z"

         * */
        if(!response.data.err){
            state.searchText.value = "模糊查找:视频名称";
            state.maxVedioCount=Math.ceil(response.data.data.count/state.pageSize);
            if(state.tableList.lists.length===0){
                for(var i = 0;i<response.data.data.list.length;i++){
                    var obj= {
                        ID: response.data.data.list[i].ID,
                        Vmosaic: response.data.data.list[i].Vmosaic,
                        Vname: response.data.data.list[i].Vname,
                        Vstate: response.data.data.list[i].Vstate,
                        Vtime: response.data.data.list[i].Vtime,
                        _id: response.data.data.list[i]._id,
                        Vurl:response.data.data.list[i].Vurl,
                        createAt:response.data.data.list[i].createAt,
                        isFinish:response.data.data.list[i].isFinish,
                        isViewed:response.data.data.list[i].isViewed,
                        updateAt:response.data.data.list[i].updateAt,
                        edit: true,
                        clickClass: "",
                        putaway: false,
                        deleteButton: false,
                        stick: false
                    }

                    state.tableList.lists.push(obj);
                }
            }else{
                for(var i = 0;i<state.pageSize;i++){
                    if(typeof state.tableList.lists[i]=="undefined"){
                        state.tableList.lists.push({});
                    }
                    state.tableList.lists[i].ID=response.data.data.list[i]? response.data.data.list[i].ID:"";
                    state.tableList.lists[i].Vmosaic=response.data.data.list[i]? response.data.data.list[i].Vmosaic:"";
                    state.tableList.lists[i].Vname=response.data.data.list[i]? response.data.data.list[i].Vname:"";
                    state.tableList.lists[i].Vstate=response.data.data.list[i]? response.data.data.list[i].Vstate:"";
                    state.tableList.lists[i].Vtime=response.data.data.list[i]? response.data.data.list[i].Vtime:"";
                    state.tableList.lists[i]._id=response.data.data.list[i]? response.data.data.list[i]._id:"";
                    state.tableList.lists[i].Vurl=response.data.data.list[i]?response.data.data.list[i].Vurl:"";
                    state.tableList.lists[i].createAt=response.data.data.list[i]?response.data.data.list[i].createAt:"";
                    state.tableList.lists[i].isFinish=response.data.data.list[i]?response.data.data.list[i].isFinish:"";
                    state.tableList.lists[i].isViewed=response.data.data.list[i]?response.data.data.list[i].isViewed:"";
                    state.tableList.lists[i].updateAt=response.data.data.list[i]?response.data.data.list[i].updateAt:"";
                    state.tableList.lists[i].edit= response.data.data.list[i]?true:false;
                    state.tableList.lists[i].clickClass="";
                    state.tableList.lists[i].putaway=false;
                    state.tableList.lists[i].deleteButton=false;
                    state.tableList.lists[i].stick=false;
                }
            }
        }else{
            alert(response.data.err);
        };
    });
};
//tableVedioList();
//取得power列表数据
/*(function(powerSelector){
    if(!powerSelector){
        return false;
    }
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
})((function(arr){//遍历AlertInputArr.list取出type=selector的对象
    for(var i = 0;i<arr.length;i++){
        if(arr[i].type==="powerSelector"){
            return arr[i];
        }
    }
})(state.AlertInputArr.list))*/
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
        if(state.pageStart<state.maxVedioCount){
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

