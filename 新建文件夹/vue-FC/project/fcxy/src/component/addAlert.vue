<template>
    <div  v-bind:style = "alertClass">
        <div v-bind:style ="alertHol">
                <div  style=" height:30px;background:#4F66B3;margin-bottom:10px">
                        <span style="display:inline-block;float:left;color:white;line-height:30px;font-size:14px" v-text="AlertInputArr.alertName.value">管理员添加</span><img v-on:click="AlertInputArr.btn_click" style="display:inline-block;float:right;margin-top:5px;margin-right:5px"  src="../assets/images/x.png">
                </div>
                <ul v-if="this.AlertInputArr.list.length">
                    <template v-for="item in this.AlertInputArr.list">
                        <li v-if ="item.type==='input'" style="display:block;margin-bottom:10px">
                              <span style="display:inline-block;width:80px;text-align:right" v-html="item.rowName"></span><input_default v-bind:width="item.width"  height="20px" v-bind:defaultObj="item.defaultObj"></input_default><span v-html="item.rowSupplement"></span>
                        </li>
                        <li v-if = "item.type==='powerSelector'" style="display:block;height:30px;margin-bottom:10px;position:relative;top:0;left:0">
                              <span style="display:inline-block;width:80px;height:20px;line-height:20px;text-align:right;">权限选择:</span><div  style="position:absolute;top:-5px;right:65px"><selector v-bind:selectorData="item"></selector></div>
                        </li>
                         <li v-if = "item.type==='img_video_Upload'||item.type==='img_Upload'"  v-bind:style="upload_vedio_li" style="position:relative">

                              <span style="display:inline-block;width:80px;height:20px;line-height:20px;text-align:right;" v-html="item.rowName">视频上传:</span>

                              <template v-if = "uploadFlag">
                                 <input_default v-bind:width="item.width"  height="20px" v-bind:defaultObj="item.defaultObj"></input_default>
                                 <a  v-on:click="addPic($event,item)" v-text="item.aText" style="color:white;font-size:2px !important;text-decoration: none;width:50px;height:21px;line-height:22px;background-color:#4F66B3;float:right;margin-top:8px"></a>

                              </template>
                              <template v-else>
                                  <img v-bind:src="item.imags.value" width="250" height="100" style="vertical-align:bottom;margin-bottom:5px" />
                                  <a  v-on:click="removeImage($event,item)" v-on:mouseenter = "img_video_btn" v-text="item.aTextC" style="color:white;font-size:2px !important;text-decoration: none;text-aligh:top;width:50px;height:21px;line-height:22px;background-color:#4F66B3;position:absolute;top:45px;right:-80px;margin-top:8px;border-radius:3px"></a>
                                  <a  v-on:click="uploadImage($event,item)" v-on:mouseenter = "img_video_btn" v-text="item.aTextU" style="color:white;font-size:2px !important;text-decoration: none;text-aligh:center;width:50px;height:21px;line-height:22px;background-color:#4F66B3;margin-top:8px;position:absolute;top:15px;right:-80px;border-radius:3px"></a>
                                </template>
                                    <video v-if="item.type==='img_video_Upload'" v-bind:src = "item.videos.value"  v-on:loadeddata="loadeddata($event,item)" v-show="false" id="videoId" controls="true">

                                    </video>
                                <input type="file" v-bind:accept="item.accept"  v-bind:id="item.uuids" @change="onFileChange($event,item)"  multiple style="display:none" >
                        </li>
                    </template>


                </ul>
                <div v-else>
                    <tableListVideo v-bind:isComponent="isComponentData"></tableListVideo>
                </div>
                <div style="text-align:center;" >
                    <btn v-for="key in AlertInputArr.btn" v-bind:props_btn_data_obj="key"></btn>
                </div>
        </div>

    </div>
</template>
<script type="text/javascript">
import input_default from "./input_default.vue";
import vedioListStore from "../vuex/vedioListStore.js";
import tableListVideo from "./addVideoList.vue";
import btn from "./btn.vue";
import selector from "./powerSelector.vue";
import store from "../vuex/store.js";

import axios from 'axios';
//允许跨域请求携带cookie
axios.defaults.withCredentials = true;
export default {
     name: 'btn_add',
      data () {
        return {
          isComponentData:this.AlertDatas.isComponentData?this.AlertDatas.isComponentData:{iscomponent:true},
          alertClass: {
            'width':window.innerWidth+"px",
            'height':window.innerHeight+"px",
            background:"white",
            'z-index':1050,
            'position':'absolute',
            'top':0,
            'left':0,
            'opacity':0.9
          },
          alertHol:{},
          alertHolTop:{},
          AlertInputArr:this.AlertDatas,
          uploadFlag:true,
          upload_vedio_li:{
            'display':'block',
            'height':'30px',
            'margin-bottom':'10px',
            'position':'relative'
          }
        }
      },
      props:['AlertDatas'],
      computed:{

      },
      watch:{
        uploadFlag:function(val){//监控上传控件切换重新计算弹窗高度
        //55566
            if(!val){
                 this.alertHol.height=parseInt(this.alertHol.height)+70+"px";
                 this.upload_vedio_li=parseInt(this.upload_vedio_li.height)+70+"px";

            }else{
                this.alertHol.height=parseInt(this.alertHol.height)-70+"px";
                this.upload_vedio_li=parseInt(this.upload_vedio_li.height)-70+"px";

            }

        }
      },
      mounted:function(){
                        console.log("大力丸桩");
                        console.log(this.AlertDatas.isComponentData?this.AlertDatas.isComponentData:{iscomponent:true});
                            var width = (function(arr){
                                                 if(arr.length>1){
                                                     for(var i = 1;i<arr.length;i++){

                                                          if(arr[i-1].width>arr[i].width){
                                                                  var temp = arr[i-1].width;
                                                                  arr[i-1].width = arr[i].width;
                                                                  arr[i].width = temp;

                                                          }
                                                      };
                                                      return arr[arr.length-1].width;
                                                 }else if(arr.length===1){
                                                        return arr[0].width;
                                                 }else{
                                                         return 0;
                                                 }




                                        })(this.AlertInputArr.list)+160;
                            var height = (function(arr){
                                                    var height=0;
                                                  if(arr.length>=1){
                                                      for(var i = 1;i<arr.length;i++){

                                                           if(arr[i].type==="input"||arr[i].type==="powerSelector"){
                                                                   height+=30;
                                                           }
                                                       };
                                                        //return height;
                                                  }

                                                 return height;


                                         })(this.AlertInputArr.list)+60+30+(this.AlertInputArr.btn.length===0||this.AlertInputArr.list.length<=1?20:130);
                            if(this.AlertInputArr.isComponentData&&!this.AlertInputArr.isComponentData.iscomponent){
                                width=1150;
                                height=620;
                            }
                            this.alertHol = {
                                   'padding-top':0,
                                    'position':'relative',
                                    'background':'#FFFFFF',
                                    'border':'5px solid #4F66BB',
                                    'border-top':'none',
                                    'width':width+'px',
                                    'height':height+"px",
                                    'top':window.innerHeight/2-height/2+'px',
                                    'left':window.innerWidth/2-width/2+'px'
                                 }
                            this.alertHolTop = {
                                'height':"30px",
                            }

      },
      methods:{
        getWidth:function(item){
            if(!item){
                return item.width;
            }else{
                return 0;
            }
        },
        img_video_btn:function(e){
            e.target.style.cursor = "pointer";
        },
         addPic:function(e,item){//'选择按钮的单击事件'
           e.preventDefault();
           alert(item.uuids);
           document.getElementById(item.uuids).click();
           return false;
        },
         onFileChange(e,item) {//上传按钮的filechange事件
             var files = e.target.files || e.dataTransfer.files;
             if(item.type==="img_video_Upload"){
                         if (!files.length||files[0].size>1024*1024*1024)return;//如果未选择任何视频或视频大小超过1G就终断操作
                             //开始制作缩略图
                             var url = URL.createObjectURL(files[0]);
                             //改变video标签的src使其重新加载数据
                             item.videos.value=url;
                           // vedioListStore.state.AlertInputArr.list[0].defaultObj.defaultStr.value=files[0].name;
                             this.createImage(files,item);
             }else{
                     if (!files.length||files[0].size>14*1024*1024)return;//如果未选择任何图片或图片大小超过4M就终断操作
                         //开始制作缩略图
                          var url = URL.createObjectURL(files[0]);
                          item.imags.value = url;
                         this.createImage(files,item);
             }


         },
          createImage(files,item) {
             if(typeof FileReader==='undefined'){
                 alert('您的浏览器不支持图片视频上传，请升级您的浏览器');
                 return false;
             };




             //控制选择框的显示与否
              this.uploadFlag=false;
         },
         loadeddata:function(e,item){//视频标签加载完数据后触发的事件
            if(item.type==="img_video_Upload"){
                var video = e.target;
                var canvas = document.createElement("canvas");
                canvas.width =  video.videoWidth*0.3;
                canvas.height =  video.videoHeight*0.3;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                item.imags.value=canvas.toDataURL("image/jpg");
            }

         },
         removeImage: function(e,item) {
             this.vedios = [];
             this.uploadFlag=true;
              //item.defaultObj.defaultStr.value="";
         },
         uploadImage: function(e,item) {


                var _this = this;
              if(item.rowName.indexOf("视频上传")!==-1){
                    //利用表单对象进行上传
                   var form = new FormData();
                  if(document.getElementById(item.uuids).files[0]){
                      //参数为上传控件的id和该控件的数据
                       form.append(item.uuids,document.getElementById(item.uuids).files[0]);
                  }
                   axios.post(store.state.url.BASEURL+ store.state.url.VIDEOUPLOAD,form,{
                       method: 'post',
                       headers:{'Content-Type':'multipart/form-data'}

                   }).then(function (response) {
                       item.defaultObj.defaultStr.value=response.data.cacheName;
                       //恢复‘选择按钮’以及上传输入框
                       _this.uploadFlag = true;

                   },function(response){
                        //恢复‘选择按钮’以及上传输入框
                       _this.uploadFlag = true;
                       alert(response.data.err);
                   });
              }else if(item.rowName.indexOf("图片上传")!==-1){
                   //判断item._this.a.state.uploadUrl.value是否为空，如不为空则清除该图片，因为不管是编辑还是重复上传，数据库中的上张图片已无用
                    if(item._this.a.state.uploadUrl.value){
                        var imgDropUrlArr = item._this.a.state.uploadUrl.value.split("=");

                          axios({
                             url:store.state.url.BASEURL+ store.state.url.DELETEDROPIMG+"&pathName="+imgDropUrlArr[imgDropUrlArr.length-1],
                             method: 'get'
                         }).then(function (response) {
                              console.log(response.data);

                         },function(response){
                              //恢复‘选择按钮’以及上传输入框
                             //_this.uploadFlag = true;
                            // alert(response.data.err);
                             // item._this.a.state.uploadUrl.value="";
                         });

                   };
                      //利用表单对象进行上传
                       var form = new FormData();

                      if(document.getElementById(item.uuids).files[0]){
                            var render = function(src){
                                     var img = new Image();
                                    //img.id = item.uuids;
                                    img.onload = function(e){
                                         var canvas = document.createElement("canvas");
                                          canvas.width =  img.naturalWidth*0.1;
                                          canvas.height =  img.naturalHeight*0.1;
                                          canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
                                          //页面显示缩略图
                                          item.imags.value=canvas.toDataURL("image/jpg");
                                          var str = canvas.toDataURL("image/jpg");
                                          str = str.substring(str.indexOf(",")+1,str.length);
                                           var form = new FormData();
                                           form.append("myId",document.getElementById(item.uuids).files[0]);
                                           axios.post(store.state.url.BASEURL+ store.state.url.IMGUPLOAD,form,{
                                                 method: 'post',
                                                 headers:{'Content-Type':'multipart/form-data'}
                                             }).then(function (response) {
                                                  console.log(response.data);
                                                  item._this.a.state.uploadUrl.value=store.state.url.BASEURL+response.data.cacheName;
                                                  item._this.a.state.uploadFlag.display="none";
                                                  console.log(item._this.a.state.uploadUrl.value);
                                             },function(response){
                                                  //恢复‘选择按钮’以及上传输入框
                                                 _this.uploadFlag = true;
                                                // alert(response.data.err);
                                                  item._this.a.state.uploadUrl.value="";
                                             });
                                          //console.log(e.path[0].currentSrc);
                                    };
                                    img.src = src;
                            };
                            // 创建 FileReader 对象 并调用 render 函数来完成渲染.
                            var reader = new FileReader();
                            // 绑定load事件自动回调函数
                            reader.onload = function(e){
                                // 调用前面的 render 函数
                                render(e.target.result);


                            };
                            // 读取文件内容
                            reader.readAsDataURL(document.getElementById(item.uuids).files[0]);

                      }

              }


         }
      },
       beforeDestroy:function(){


        },
       components: {input_default,btn,selector,tableListVideo}

}
</script>
<style>
    .alert56HolId {
        min-width:210px;
        min-height:100px;
        position:absolute;
        top:0;
        left:0;
        background:#4F66B3;

        opacity:0.8;

    }
</style>