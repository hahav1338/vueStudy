<template>
  <div>
        <div>
            <fcheader></fcheader>
        </div>
        <div class="adminListContent">
            <span style="color:#2880E4">首页/</span> <span>用户管理/</span> <span>系统人员66</span>
          <div class="fc_section_wrap">
            <ul>
                <li class="admin_top_input">
                   <input_default width="500px" height="30px" v-bind:defaultObj="defaultObjs"></input_default>
                </li>
                <li class="admin_top_search">
                        <btn v-bind:props_btn_data_obj='btnobj'></btn>
                </li>
                <li class="admin_top_add">
                    <btn_add v-bind:clickFn="addBtnClick"></btn_add>
                </li>
            </ul>
          </div>
            <div class="functional_block">
                    <div class="functional_block_top">
                        <div class="functional_block_left"></div>
                        <div class="functional_block_right">系统人员列表</div>
                    </div>
                    <div class="functional_block_bottom">

                            <tables v-bind:tableListData="tableListDataStore"></tables>
                    </div>
                    <div v-bind:style="addBtnFlag">
                        <addAlert  v-bind:AlertDatas = "adminAlertDatas"></addAlert>
                    </div>
                </div>

        </div>
  </div>
</template>
<script type="text/javascript">
import adminStore from '../vuex/adminListStore.js';
import fcheader from './fcheader.vue';
import btn_add from './btn_add.vue';
import btn from './btn.vue';
import input_default from './input_default.vue';
import tables from './tableList.vue';
import addAlert from './addAlert.vue';
export default {
      data () {
        return {
            adminAlertDatas:adminStore.state.AlertInputArr,
            addBtnClick:function(){//adminList弹窗控制按钮
                   adminStore.commit('setAddBtnFlag','block');

                   adminStore.state.AlertInputArr.list[0].defaultObj.defaultStr=" ";
                    adminStore.state.AlertInputArr.list[1].defaultObj.defaultStr=" ";
                     adminStore.state.AlertInputArr.list[2].defaultObj.defaultStr=" ";
                      adminStore.state.AlertInputArr.list[3].defaultStr.value=" ";

             },
            addBtnFlag:adminStore.state.addBtnFlag,
            tableListDataStore:adminStore.state.tableList,
            btnobj:{ background:'#449D44',
                   btn_click:function(){
                        adminStore.state.tableList.btnList.btn_click();

                   },
                   btn_text:"查询"},
             defaultObjs: {
                    defaultStr:"模糊查找：姓名",
                    bl:function(event){
                        var str = event.target.value;
                        var strs = event.target;
                        if(!str){

                            alert("查询条件不能为空");
                            event.target.disabled = true;
                            setInterval(function (){
                                event.target.removeAttribute('disabled');
                            },10);
                        }else{
                            adminStore.state.searchText=str;
                        }


                    }
                }

        }
      },
      computed:{
        addBtnFlag:function(){

                return adminStore.state.addBtnFlag;
        }
      },

      components:{fcheader,btn_add,btn,input_default,tables,addAlert,adminStore},
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
    .adminListContent{
        padding-top:10px;
        padding-left:10px;
        padding-right:10px;
        background:#F5F5F5;
        min-width:1100px;
        height:100%;
    }
    .fc_section_wrap {
        height:35px;
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
                overflow:hidden;
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
