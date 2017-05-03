<template>
  <div>
        <div>
            <fcheader></fcheader>
        </div>
        <div class="studentListContent">
            <span style="color:#2880E4">首页/</span> <span>用户管理/</span> <span>学员管理</span>
          <div class="student_fc_section_wrap">
            <ul>
                <li class="student_top_input">
                   <input_default width="150px" height="30px" v-bind:defaultObj="defaultObjs[0]"></input_default>&nbsp;
                   <input_default width="150px" height="30px" v-bind:defaultObj="defaultObjs[1]"></input_default>&nbsp;
                   <input_default width="150px" height="30px" v-bind:defaultObj="defaultObjs[2]"></input_default>&nbsp;
                   <btn v-bind:props_btn_data_obj='btnobj[0]'></btn>
                </li>
                <li class="student_top_input">
                     <input_default width="150px" height="30px" v-bind:defaultObj="defaultObjs[3]"></input_default>&nbsp;
                     <input_default width="150px" height="30px" v-bind:defaultObj="defaultObjs[4]"></input_default>&nbsp;
                     <input_default width="150px" height="30px" v-bind:defaultObj="defaultObjs[5]"></input_default>&nbsp;
                     <btn v-bind:props_btn_data_obj='btnobj[1]'></btn>
                </li>

            </ul>
          </div>
            <div class="functional_block">
                    <div class="student_functional_block_top">
                        <div class="student_functional_block_left"></div>
                        <div class="student_functional_block_right">系统人员列表</div>
                    </div>
                    <div class="student_functional_block_bottom">

                            <tables v-bind:tableListData="tableListDataStore"></tables>
                    </div>
                </div>

        </div>
  </div>
</template>
<script type="text/javascript">
import studentStore from '../vuex/studentListStore.js';
import fcheader from './fcheader.vue';
import btn_add from './btn_add.vue';
import btn from './btn.vue';
import input_default from './input_default.vue';
import tables from './tableList.vue';
export default {
      data () {
        return {

            addBtnClick:function(){//adminList弹窗控制按钮
                   studentStore.commit('setAddBtnFlag','block');

                   studentStore.state.AlertInputArr.list[0].defaultObj.defaultStr=" ";
                   studentStore.state.AlertInputArr.list[1].defaultObj.defaultStr=" ";
                   studentStore.state.AlertInputArr.list[2].defaultObj.defaultStr=" ";
                   studentStore.state.AlertInputArr.list[3].defaultStr.value=" ";

             },
            tableListDataStore:studentStore.state.tableList,
            btnobj:[{ background:'#449D44',
                   btn_click:function(){
                        studentStore.state.tableList.btnList.btn_search_click();

                   },
                   btn_text:"查询"},
                   { background:'#449D44',
                        btn_click:function(){
                       studentStore.state.tableList.btnList.btn_add_click();

                   },
                   btn_text:"添加"}],
             defaultObjs: [{
                    defaultStr:studentStore.state.searchText_userName,
                    bl:function(event){
                        var str = event.target.value;
                        if(!str){
                            event.target.value="用户名";
                        }else if(str==="用户名"){
                            return false;
                        }else{
                            studentStore.state.searchText_userName.value=str;
                        }
                    }
                },{
                      defaultStr:studentStore.state.searchText_email,
                      bl:function(event){
                           var str = event.target.value;
                          if(!str){
                              event.target.value="邮箱";
                          }else if(str==="邮箱"){
                              return false;
                          }else{
                              studentStore.state.searchText_email.value=str;
                          }
                      }
                  },{
                        defaultStr:studentStore.state.searchText_phone,
                        bl:function(event){
                            var str = event.target.value;
                          if(!str){
                              event.target.value="手机号";
                          }else if(str==="手机号"){
                              return false;
                          }else{
                              studentStore.state.searchText_phone.value=str;
                          }
                        }
                    },{
                      defaultStr:studentStore.state.addText_userName,
                      bl:function(event){
                          var str = event.target.value;
                          if(!str){
                              event.target.value="用户名";
                          }else if(str==="用户名"){
                              return false;
                          }else{
                              studentStore.state.addText_userName.value=str;
                          }
                      }
                  },
                  {
                      defaultStr:studentStore.state.addText_email,
                      bl:function(event){
                           var str = event.target.value;
                         if(!str){
                             event.target.value="邮箱";
                         }else if(str==="邮箱"){
                             return false;
                         }else{
                             studentStore.state.addText_email.value=str;
                         }
                      }
                   },
                  {
                      defaultStr:studentStore.state.addText_phone,
                      bl:function(event){
                             var str = event.target.value;
                              if(!str){
                                  event.target.value="手机号";
                              }else if(str==="手机号"){
                                  return false;
                              }else{
                                  studentStore.state.addText_phone.value=str;
                              }
                      }
                  }]

        }
      },
      computed:{

      },

      components:{fcheader,btn_add,btn,input_default,tables,studentStore},
      mounted:function(){

         document.body.setAttribute("style","background:url(./src/assets/images/body_bg.jpg) no-repeat;min-width:1100px;font-family:'宋体';margin:0;padding:0;background-size:100% 500px;");

      },
      methods:{

       },
       watch:{
             '$route': function () {
                    this.orders = []
                    this.fetchData()
                    this.orderId = this.$route.params.orderId
               }
       }
}
</script>

<style>
    .studentListContent{
        padding:10px;
        background:#F5F5F5;
        min-width:1100px;
        height:100%;
    }
    .student_fc_section_wrap {
        height:70px;
        padding:10px;
        border:1px solid #C0C0C0;
        background:#FFFFFF;
        margin-top:15px;
        margin-bottom:15px;
    }
    .student_fc_section_wrap ul {
            margin:0;
            padding:0;
    }
    .student_fc_section_wrap ul li{
                margin:0;
                margin:5px;
                padding:5;
     }
     .student_top_input {
        display:block;

     }
     .student_fc_section_wrap {
        display:block;
     }
     .student_functional_block_bottom{
                overflow:hidden;
        }
        .student_functional_block {
             width:100%;
             line-height:34px;
        	 background:#fff;
        	 text-align:left;
        	 margin-top:15px;
        	 border:1px solid #8FB4D7;
        }
        .student_functional_block_top{
            height:34px;
            position:relative;
             border-bottom:1px solid #8FB4D7;
        }
        .student_functional_block_left {
            position:absolute;
            width:34px;
             height:34px;
               border-right:1px solid #8FB4D7;
            background:url(../assets/functional_block.png) no-repeat center;
        }
        .student_functional_block_right{
            padding-left:40px;
        }
</style>
