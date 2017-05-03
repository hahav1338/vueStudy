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
    pageStart:1,//查询起始页
    pageSize:3,//每页显示条数
    searchText:{value:"模糊查找:视频名称"},//模糊查询条件
    maxVedioCount:0,//视频列表的最大页码
    minVedioCount:1,//视频列表的最小页码
    addBtnFlag :{'display':'none'},//控制添加弹窗的显示
    isUpdate:false,//是否是更新操作
    updateVideoId:"",//更新操作对应视频ID
    iscomponent:false,//是否以组件的形式渲染
    tableList:{
        th_lists:[{value:"视频名称",trueName:'Vname',width:"10%"},
            {value:"绑定的课程",trueName:'Vstate',width:"30%"},
            {value:"视频时长",trueName:'Vtime',width:"20%"},
            {value:"上传日期",trueName:'createAt',width:"20%"},
            {value:"操作",width:"20%"}],//列表头项数组
        lists: [

        ],
        btnList:{
            _this:this,
            tfootShow:true,
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
            addVideo:"",
            update:function(data){
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

            }
        },
        count:{value:1}
    },
    //管理员页面展示数据
    AlertInputArr:{
        alertName:{value:"视频列表操作"},
        btn_click:function(){
            //恢复弹窗默认值
            state.addBtnFlag.display='none';
            //state.uploadUrl.value = "";

        },
        list:[{
            _this:this,
            type:"img_video_Upload",//表单控件种类
            accept:"video/quicktime,video/x-mpeg2,video/x-msvideo,video/mpeg,video/mp4",//上传控件限制种类
            rowName:"<i style='color:red;height:16px;line-height:16px'>*</i>视频上传",//地址栏输入框前缀
            width:280,//视频上传地址栏输入框宽度
            uuids:uuidfn(),//组件每被引用一次给上传控件绑定一个特殊的id
            aText:"选择视频",//input file对应按钮名称
            aTextU:"上传",//上传按钮名称
            aTextC:"清除",//清除按钮名称
            videos:{value:""},//视频数据
            imags:{value:""},//图片数据
            defaultObj: {
                defaultStr:{value:"视频应小于1G"},
                fs:function(event){
                    throw "跳出函数";
                }
            }


        },{
            type:"input",
            rowName:"<i style='color:red;height:16px;line-height:16px'>*</i>视频名称",
            rowSupplement:'<i style="font-size:8px">60字以内</i>',
            width:280,
            defaultObj: {
                defaultStr:{value:""},
                bl:function(event){
                    if(!event.target.value||event.target.value.length>60){
                        alert("视频名称不能为空");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }else{
                        this.defaultStr.value=event.target.value;
                    }

                }
            }
        },{
            type:"input",
            rowName:"<i style='color:red;height:16px;line-height:16px'>*</i>视频时长",
            rowSupplement:'<i style="font-size:8px">填分钟</i>',
            width:280,
            defaultObj: {
                defaultStr:{value:""},
                bl:function(event){

                    if(!event.target.value||event.target.value.length>3){
                        alert("视频时长不能为空");
                        event.target.disabled = true;
                        setInterval(function (){
                            event.target.removeAttribute('disabled');
                        },10);
                    }else{
                       this.defaultStr.value=event.target.value;
                    }

                }
            }
        }],
        btn:[{ background:'#6EC131',
            _this:this,
            btn_click:function(){
                var Vurl = (function(arr){
                    for(var i = 0;i<arr.length;i++){
                        if(arr[i].rowName.indexOf("视频上传")!=-1){
                            return arr[i].defaultObj.defaultStr.value;
                        }

                    }
                })(this._this.a.state.AlertInputArr.list);
                if(!Vurl||Vurl==="视频应小于1G"){
                    alert("视频地址不正确");
                    return false;
                }
                var Vname = (function(arr){
                    for(var i = 0;i<arr.length;i++){
                        if(arr[i].rowName.indexOf("视频名称")!=-1){
                            return arr[i].defaultObj.defaultStr.value;
                        }

                    }
                })(this._this.a.state.AlertInputArr.list);
                if(!Vname){
                    alert("视频名称不正确");
                    return false;
                }
                var Vtime = (function(arr){
                    for(var i = 0;i<arr.length;i++){
                        if(arr[i].rowName.indexOf("视频时长")!=-1){
                            return arr[i].defaultObj.defaultStr.value;
                        }

                    }
                })(this._this.a.state.AlertInputArr.list);
                if(!Vtime){
                    alert("视频时长不正确");
                    return false;
                }  /*  videos.Vname = req.body.Vname;
                 videos.Vtime = req.body.Vtime;
                 videos.Vurl = req.body.Vurl;
                 rowName*/
                    //视频列表添加
                    if(!state.isUpdate){
                        axios({
                            method: 'post',
                            url:  store.state.url.BASEURL+ store.state.url.VIDEOADD,
                            data:{
                                Vname:Vname,
                                Vtime:Vtime,
                                Vurl:Vurl
                            }
                        }).then(function (response) {
                            if(response.data.success){
                                //恢复弹窗默认值
                                state.addBtnFlag.display='none';
                                (function(arr){
                                    for(var i = 0;i<arr.length;i++){
                                        if(arr[i].rowName.indexOf("视频上传")!=-1){
                                            arr[i].defaultObj.defaultStr.value="视频应小于1G";
                                        }

                                    }
                                })(state.AlertInputArr.list);
                                (function(arr){
                                    for(var i = 0;i<arr.length;i++){
                                        if(arr[i].rowName.indexOf("视频名称")!=-1||arr[i].rowName.indexOf("视频时长")!=-1){
                                            arr[i].defaultObj.defaultStr.value="";
                                        }

                                    }
                                })(state.AlertInputArr.list);

                                //重新请求数据
                                tableVedioList();
                            }


                        });

                    }else{
                        axios({
                            method: 'post',
                            url:  store.state.url.BASEURL+ store.state.url.VIDEOUPDATE,
                            data:{
                                Vname:Vname,
                                Vtime:Vtime,
                                Vurl:Vurl,
                                ID:state.updateVideoId
                            }
                        }).then(function (response) {
                            //将状态重新改为添加状态
                            state.isUpdate= false;
                            if(response.data.success){
                                //恢复弹窗默认值
                                state.addBtnFlag.display='none';
                                state.updateVideoId="";
                                (function(arr){
                                    for(var i = 0;i<arr.length;i++){
                                        if(arr[i].rowName.indexOf("视频上传")!=-1){
                                            arr[i].defaultObj.defaultStr.value="视频应小于1G";
                                        }

                                    }
                                })(state.AlertInputArr.list);
                                (function(arr){
                                    for(var i = 0;i<arr.length;i++){
                                        if(arr[i].rowName.indexOf("视频名称")!=-1||arr[i].rowName.indexOf("视频时长")!=-1){
                                            arr[i].defaultObj.defaultStr.value="";
                                        }

                                    }
                                })(state.AlertInputArr.list);

                                //重新请求数据
                                tableVedioList();
                            }


                        });
                    }



            },
            btn_text:"确定"},
            { background:'#4F66B3',
                btn_click:function(){
                    //恢复弹窗默认值
                    state.addBtnFlag.display='none';
                    (function(arr){
                        for(var i = 0;i<arr.length;i++){
                            if(arr[i].rowName.indexOf("视频上传")!=-1){
                                arr[i].defaultObj.defaultStr.value="视频应小于1G";
                            }

                        }
                    })(state.AlertInputArr.list);
                    (function(arr){
                        for(var i = 0;i<arr.length;i++){
                            if(arr[i].rowName.indexOf("视频名称")!=-1||arr[i].rowName.indexOf("视频时长")!=-1){
                                arr[i].defaultObj.defaultStr.value="";
                            }

                        }
                    })(state.AlertInputArr.list);
                    state.isUpdate= false;
                },
                btn_text:"取消"}],
        btn_click:function(){

            //恢复弹窗默认值
            state.addBtnFlag.display='none';
            (function(arr){
                for(var i = 0;i<arr.length;i++){
                    if(arr[i].rowName.indexOf("视频上传")!=-1){
                        arr[i].defaultObj.defaultStr.value="视频应小于1G";
                    }

                }
            })(state.AlertInputArr.list);
            (function(arr){
                for(var i = 0;i<arr.length;i++){
                    if(arr[i].rowName.indexOf("视频名称")!=-1||arr[i].rowName.indexOf("视频时长")!=-1){
                        arr[i].defaultObj.defaultStr.value="";
                    }

                }
            })(state.AlertInputArr.list);
            state.isUpdate= false;
        }
    }
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
                        edit: state.iscomponent===false?true:false,
                        clickClass: "",
                        putaway: false,
                        deleteButton: false,
                        stick: false,
                        add:state.iscomponent
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
                    state.tableList.lists[i].edit= response.data.data.list[i]&&state.iscomponent===false?true:false;
                    state.tableList.lists[i].clickClass="";
                    state.tableList.lists[i].putaway=false;
                    state.tableList.lists[i].deleteButton=false;
                    state.tableList.lists[i].stick=false;
                    state.tableList.lists[i].add = state.iscomponent;
                }
            }
        }else{
            alert(response.data.err);
        };
    });
};
tableVedioList();
//取得power列表数据
(function(powerSelector){
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
})(state.AlertInputArr.list))
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

