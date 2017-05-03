<template>
  <div>

        <div class="adminListContent">
            <span style="color:#777777;font-size:10px">- - - - 课 程 列 表 - - - -</span>
             <div class="functional_block">
                    <div class="functional_block_top">
                        <div class="functional_block_left"></div>
                        <div class="functional_block_right">课程信息</div>
                    </div>
                    <div class="fc_section_wrap">
                                <div class = "courseListInput_left">

                                    <ul>
                                        <template v-for="item in courseInputList">
                                            <li  class="admin_top_input">
                                              <span style="display:inline-block;width:80px;text-align:center" v-html="item.rowName"></span><input_default v-bind:width="item.width"  height="30px" v-bind:defaultObj="item.defaultObj"></input_default><span v-html="item.rowSupplement"></span>

                                           </li><br>
                                        </template>
                                       <li class="admin_top_input">
                                            <span style="display:inline-block;width:80px;text-align:center"><span style='font-size:8px'> 专业选择：</span></span>

                                           <li style="height:30px;" v-for="item in selectorDataList">
                                               <selector v-bind:selectorData="item"></selector>
                                          </li>
                                       </li><br>
                                       <li class="admin_top_search">
                                               <btn  v-show="courseListAddBtn" v-bind:props_btn_data_obj='btnobj.add'></btn>
                                       </li>

                                   </ul>
                                </div>
                                 <div class = "courseListInput_right">
                                        <span style='font-size:8px;'>课程封面：</span>
                                        <img v-bind:src = "uploadFlag_imgurl.value"  class = "courseListInput_right_img"/>
                                        <a style='font-size:8px;color:blue;cursor:pointer' v-on:click = "coverImgDelete()" class="courseListInput_right_a_left">清除</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <a style='font-size:8px;color:blue;cursor:pointer' v-on:click = "upload()" class="courseListInput_right_a_right">上传</a>
                                 </div>

                     </div>
             </div>
            <div v-show="courseListAddBtn" style="width:100%;height:950px;position:absolute;top:300px;left:0;background:#fff;z-index:1000;opacity:0.6"></div>
            <div class="functional_block">
                    <div class="functional_block_top">
                        <div class="functional_block_left"></div>
                        <div class="functional_block_right">课程内容</div>
                    </div>
                    <div class="functional_block_bottom">
                            <div class = "courseListTablelist_left">
                                    <btn v-bind:props_btn_data_obj='btnobj.addCatalog'></btn><p style="height:10px"></p>
                                    <div class = "courseListTablelist_left_div">
                                        <tables v-bind:tableListData="tableListDirectoryListData"></tables>
                                    </div>

                            </div>
                             <div class = "courseListTablelist_right">
                                   <btn v-bind:props_btn_data_obj='btnobj.addVideo'></btn><p style="height:10px"></p>
                                    <div class = "courseListTablelist_right_div">
                                        <tables v-bind:tableListData="tableListDataStore_video"></tables>
                                    </div>
                             </div>

                    </div>
            </div>
             <div class="functional_block">
                    <div class="functional_block_top">
                        <div class="functional_block_left"></div>
                        <div class="functional_block_right">课程详情</div>
                    </div>
                    <div class="functional_block_bottom">

                        <uediter v-bind:contentTxt = "ueditorContentTxt"></uediter>
                         <p style="height:10px"></p><btn v-bind:props_btn_data_obj='btnobj.addAll'></btn>
                    </div>
            </div>
            <div v-bind:style="uploadFlag_vue">
                <addAlert   v-bind:AlertDatas = "uploadAlertDatas"></addAlert>
            </div>
            <div v-bind:style="addCatalogFlag_vue">
                <addAlert   v-bind:AlertDatas = "addCatalogAlertDatas"></addAlert>
            </div>
            <div v-bind:style="addVideoFlag_vue">
                <addAlert   v-bind:AlertDatas = "addVideoAlertDatas"></addAlert>
            </div>
        </div>
  </div>
</template>
<script type="text/javascript">
import courseEditListStore from '../vuex/courseEditListStore.js';
import courseListStore from '../vuex/courseListStore.js';
import fcheader from './fcheader.vue';
import btn_add from './btn_add.vue';
import btn from './btn.vue';
import input_default from './input_default.vue';
import tables from './tableList.vue';
import addAlert from './addAlert.vue';
import selector from "./powerSelector.vue";
import uediter from "./uediter.vue";
import store from '../vuex/store.js';
import axios from 'axios';
//允许跨域请求携带cookie
axios.defaults.withCredentials = true;
export default {
      data () {
        return {

            courseInputList:courseEditListStore.state.courseList,
            tableListDirectoryListData:courseEditListStore.state.tableDirectoryList,
            tableListDataStore_video:courseEditListStore.state.tableList_video,
            uploadAlertDatas:courseEditListStore.state.uploadAlertArr,//上传弹窗数据
            addCatalogAlertDatas:courseEditListStore.state.addCatalogAlertArr,//添加目录弹窗数据
            addVideoAlertDatas:courseEditListStore.state.addVideoAlertInputArr,//添加视频弹窗数据
            uploadFlag_vue:courseEditListStore.state.uploadFlag,//上传弹窗按钮控制
            uploadFlag_imgurl:courseEditListStore.state.uploadUrl,//上传返回的图片路径
            addCatalogFlag_vue:courseEditListStore.state.addCatalogFlag,//添加目录弹窗按钮控制
            addVideoFlag_vue:courseEditListStore.state.addVideoFlag,//添加视频弹窗按钮控制
            thisCatalogList:courseEditListStore.state.catalogList,//级联菜单数据
            courseListAddBtn:true,//课程添加页面的保存按钮和遮罩层控制开关
            ueditorContentTxt:courseEditListStore.state.courseDtail,//课程详情信息
            btnobj:{
                add:{
                     //课程添加页面的保存按钮
                     background:'#449D44',
                     _this:this,//当前vue实例
                     btn_click:function(){

                        console.log("手心里的温柔");
                        console.log(courseEditListStore.state.courseDtail);
                        var __this = this._this;
                        axios({
                            url:store.state.url.BASEURL+ store.state.url.COURSEADD,
                            method: 'post',
                            data:{
                                CategoryOne:courseEditListStore.state.catalogOne.value,
                                CategoryTwo:courseEditListStore.state.catalogTwo.value,
                                CategoryThree:courseEditListStore.state.catalogThree.value,
                                Cname:courseEditListStore.state.courseVideoName.value,
                                Cdetails:courseEditListStore.state.courseDtail.value,
                                Cprice:courseEditListStore.state.coursePrice.value,
                                Cdescribe:courseEditListStore.state.Cdescribe.value,
                                Cpic:courseEditListStore.state.uploadUrl.value
                            }
                        }).then(function (response) {
                              __this.courseListAddBtn = false;
                              //console.log(response.data);
                              //ID,_id
                               courseEditListStore.state.course_id.value = response.data._id;
                               courseEditListStore.state.courseID.value = response.data.ID;
                        },function(response){
                            //请求异常时逻辑
                        });

                      },
                      btn_text:"保存"
                },

                addCatalog:{ background:'#449D44',
                      btn_click:function(){
                            courseEditListStore.state.addCatalogFlag.display = 'block';
                           //courseListStore.state.tableList.btnList.btn_click();

                      },
                      btn_text:"添加目录"},
                addVideo:{ background:'#449D44',
                      btn_click:function(){

                            if(courseEditListStore.state.clickCatalogObj._id){
                                courseEditListStore.state.addVideoFlag.display = 'block';
                            }else{
                                alert("请选择目录");
                            }

                           //courseListStore.state.tableList.btnList.btn_click();

                      },
                      btn_text:"添加视频"},
                addAll:{ background:'#449D44',
                      btn_click:function(){
                           //全部保存按钮触发的课程信息更改
                           //console.log("北宋小朝廷");
                           //console.log(courseEditListStore.state.courseDtail);
                             axios({
                               url:store.state.url.BASEURL+ store.state.url.ADDALLCOURSE,
                               method: 'post',
                               data:{

                                   _id:courseEditListStore.state.course_id.value,
                                   CategoryOne:courseEditListStore.state.catalogOne.value,
                                   CategoryTwo:courseEditListStore.state.catalogTwo.value,
                                   CategoryThree:courseEditListStore.state.catalogThree.value,
                                   Cname:courseEditListStore.state.courseVideoName.value,
                                   Cdetails:courseEditListStore.state.courseDtail.value,
                                   Cprice:courseEditListStore.state.coursePrice.value,
                                   Cdescribe:courseEditListStore.state.Cdescribe.value,
                                   Cpic:courseEditListStore.state.uploadUrl.value
                               }
                           }).then(function (response) {

                                window.location = "/courseList";
                                //console.log("南宋小朝廷");
                                //console.log(response.data);
                                 //__this.courseListAddBtn = false;
                                 //console.log(response.data);
                                 //ID,_id
                                  //courseEditListStore.state.course_id.value = response.data._id;
                                  //courseEditListStore.state.courseID.value = response.data.ID;
                           },function(response){
                               //请求异常时逻辑
                           });

                      },
                      btn_text:"全部保存"}
            },
             defaultObjs: {
                    defaultStr:courseListStore.state.searchText,
                    bl:function(event){

                        var str = event.target.value;
                        var strs = event.target;
                        if(!str){

                            event.target.value=courseListStore.state.searchText.value;
                        }else{

                            courseListStore.state.searchText.value=str;
                        }
                    }
             },
             selectorDataList:courseEditListStore.state.selectorList

        }
      },
      computed:{
        addBtnFlag:function(){

                return adminStore.state.addBtnFlag;
        }
      },

      components:{fcheader,btn_add,btn,input_default,tables,selector,uediter,addAlert},
      mounted:function(){
         document.body.setAttribute("style","background:url(./src/assets/images/body_bg.jpg) no-repeat;min-width:1100px;font-family:'宋体';margin:0;padding:0;background-size:100% 500px;");
        //如果路由有参数传过来，
        //课程编辑时逻辑
        if(this.$route.query.Cname&&this.$route.query.Cprice&&this.$route.query.Cname){

                this.courseListAddBtn = false;
                //遍历courseList给其赋初始值
                for(var i = 0;i< courseEditListStore.state.courseList.length;i++ ){
                    if(courseEditListStore.state.courseList[i].rowName.indexOf("课程名称")!==-1){
                        //页面显示数据
                        courseEditListStore.state.courseList[i].defaultObj.defaultStr.value = this.$route.query.Cname;
                        //仓库中操作数据
                        courseEditListStore.state.courseVideoName.value = this.$route.query.Cname;
                    }
                    if(courseEditListStore.state.courseList[i].rowName.indexOf("课程描述")!==-1){
                        courseEditListStore.state.courseList[i].defaultObj.defaultStr.value = this.$route.query.Cdescribe;
                        courseEditListStore.state.Cdescribe.value = this.$route.query.Cdescribe;
                    }
                    if(courseEditListStore.state.courseList[i].rowName.indexOf("课程价格")!==-1){
                        courseEditListStore.state.courseList[i].defaultObj.defaultStr.value = this.$route.query.Cprice;
                        courseEditListStore.state.coursePrice.value = this.$route.query.Cprice;
                    }
                }
                //给课程ID和_id赋值
                  courseEditListStore.state.course_id.value = this.$route.query._id;
                  courseEditListStore.state.courseID.value = this.$route.query.ID;
                //根据sysId遍历
                var catalogList = {
                    "1":"移动开发",
                    "2":"前端开发",
                    "3":"后端开发",
                    "4":"应用开发",
                    "5":"移动框架",
                    "6":"前端基础",
                    "7":"前端进阶",
                    "8":"前端框架",
                    "9":"Python",
                    "10":"PHP",
                    "11":"ASP.NET",
                    "12":"ios",
                    "13":"Android",
                    "14":"Cordova",
                    "15":"HTML",
                    "16":"CSS",
                    "17":"js高程",
                    "18":"vue",
                    "19":"angularjs",
                    "20":"爬虫原理"
                };

                //专业选择下拉框赋值
                 for(var i = 0;i< courseEditListStore.state.selectorList.length;i++ ){
                    if(i===0){
                        courseEditListStore.state.selectorList[i].defaultStr.value = catalogList[this.$route.query.CategoryOne];
                        courseEditListStore.state.catalogOne.value = this.$route.query.CategoryOne;
                    }
                    if(i===1){
                        courseEditListStore.state.selectorList[i].defaultStr.value = catalogList[this.$route.query.CategoryTwo];
                         courseEditListStore.state.catalogTwo.value = this.$route.query.CategoryTwo;
                    }
                    if(i===2){
                        courseEditListStore.state.selectorList[i].defaultStr.value = catalogList[this.$route.query.CategoryThree];
                         courseEditListStore.state.catalogThree.value = this.$route.query.CategoryThree;
                    }
                }
                //组织封面图片地址信息
                courseEditListStore.state.uploadUrl.value = this.$route.query.Cpic.indexOf(store.state.url.BASEURL)===-1?store.state.url.BASEURL+this.$route.query.Cpic:store.state.url.BASEURL;
                //组织课程对应的目录
                   axios({
                        method: 'get',
                        url:  store.state.url.BASEURL+ store.state.url.GETDIRECTORYLIST+"&CDid="+this.$route.query._id

                    }).then(function (response) {

                        console.log(response.data);
                        if(response.data.success&&courseEditListStore.state.tableDirectoryList.lists.length===0){
                            //裁剪原数组与结果集等长
                            //courseEditListStore.state.tableDirectoryList.lists.splice(0,courseEditListStore.state.tableDirectoryList.lists.splice.length);
                            //遍历结果集给目录列表重新辅助

                                for(var i = 0;i<response.data.data.list.length;i++){
                                    courseEditListStore.state.tableDirectoryList.lists.push({
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


                        }
                    });

                //组织富媒体编辑器内容Cdescribe
                this.ueditorContentTxt.value = this.$route.query.Cdetails.trim();
        }

        /*
         for(var key in courseListStore.state.selectorList[0].options){

            console.log( typeof courseListStore.state.selectorList[0].options[key] );
         };*/
      },
      methods:{
             upload:function(){//封面上传
               //封面上传弹窗控制按钮
                courseEditListStore.state.uploadFlag.display = 'block';
             },
             coverImgDelete:function(){//封面清除
                     if(courseEditListStore.state.uploadUrl.value){
                        var imgDropUrlArr = courseEditListStore.state.uploadUrl.value.split("=");
                            courseEditListStore.state.uploadUrl.value = "";
                          axios({
                             url:store.state.url.BASEURL+ store.state.url.DELETEDROPIMG+"&pathName="+imgDropUrlArr[imgDropUrlArr.length-1],
                             method: 'get'
                         }).then(function (response) {

                               //
                              console.log(response.data);

                         },function(response){
                             //请求异常时逻辑
                         });

                   };
             }
       },
       watch:{
             '$route': function () {
                    this.orders = []
                    this.fetchData()
                    this.orderId = this.$route.params.orderId
              },
              'ueditorContentTxt':function(val){
                    console.log("五一了");
                    console.log(val);
              }
       }
}
</script>

<style>
    .courseListInput_left{
        position:relative;
        width:40%;
    }
     .courseListInput_right{
            position:absolute;
            width:55%;
            top:20px;
            right:60px;
            height:150px;
      }
      .courseListInput_right_img {
        display:block;
        width:190px;
        height:90px;
        border:1px solid #C0C0C0;
      }
      .courseListTablelist_left {
            position:relative;
            width:45%;

      }
      .courseListTablelist_left_div {
             border:1px solid #D6D6D6;
      }
       .courseListTablelist_right {
              position:absolute;
             width:50%;
              top:10px;
             right:10px;
        }
         .courseListTablelist_right_div {
                 border:1px solid #D6D6D6;
          }
    .adminListContent{
        padding-top:10px;
        padding-left:10px;
        padding-right:10px;
        background:#F5F5F5;
        min-width:1100px;
        height:100%;
    }
    .fc_section_wrap {

        position:relative;
        height:100%;
        padding:10px;
        border:1px solid #C0C0C0;
        background:#FFFFFF;
        margin-top:15px;
        margin-botton:15px;
    }
    .fc_section_wrap ul {
            margin:0;
            padding:0;
    }
    .fc_section_wrap ul li{
            margin:0;
            margin-right:5px;
            padding:0;
     }
     .admin_top_add {
        float:right;

     }
     .functional_block_bottom{
                position:relative;
                overflow:hidden;
                padding:10px;
        }
        .functional_block {
             width:100%;
             line-height:34px;
        	 background:#fff;
        	 text-align:left;
        	 margin-top:15px;
        	 border:1px solid #8FB4D7;
        }
        .functional_block_top{
            height:34px;
            position:relative;
             border-bottom:1px solid #8FB4D7;
        }
        .functional_block_left {
            position:absolute;
            width:34px;
             height:34px;
               border-right:1px solid #8FB4D7;
            background:url(../assets/functional_block.png) no-repeat center;
        }
        .functional_block_right{
            padding-left:40px;
        }
</style>
