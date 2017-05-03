<template>
  <div>
        <div>
            <fcheader></fcheader>
        </div>
        <div class="adminListContent">
            <span style="color:#2880E4">首页/</span> <span>用户管理/</span> <span>学员管理/</span>
          <div class="xn_section_wrap">
            <ul>
                <li class="admin_top_input">
                    <input_default width="200px" height="20px" v-bind:defaultObj="defaultObjs"></input_default>
                </li>
                <li class="admin_top_search">
                        <btn v-bind:props_btn_data_obj='btnobj'></btn>
                </li>
                <li class="admin_top_add">
                    <btn_add></btn_add>
                </li>
            </ul>
          </div>
            <div id="functional_block" class="functional_block">
                    <div class="functional_block_top">
                        <div class="functional_block_left"></div>
                        <div class="functional_block_right">789</div>
                    </div>
                    <div class="functional_block_bottom">

                            <tables></tables>
                    </div>
                </div>

        </div>
  </div>
</template>
<script type="text/javascript">
import fcheader from './fcheader.vue';
import btn_add from './btn_add.vue';
import btn from './btn.vue';
import input_default from './input_default.vue';
import tables from './tableList.vue';
export default {
      data () {
        return {

            btnobj:{ background:'#6EC131',
                   btn_click:function(){
                   },
                   btn_text:"查询"},
             defaultObjs: {
                    defaultStr:"",
                    bl:function(event){
                        var str = event.target.value;
                        var strs = event.target;
                        if(!str||str.length<6){

                            alert("密码不能为空且不能少于6位");
                            event.target.disabled = true;
                            setInterval(function (){
                                event.target.removeAttribute('disabled');
                            },10);
                        }else{
                            Vue.prototype.$safeAlert.state.newPwd=str;
                        }


                    }
                }

        }
      },
      components:{fcheader,btn_add,btn,input_default,tables},
      mounted:function(){
        document.body.setAttribute("style","background:url(./src/assets/images/body_bg.jpg) !important;min-width:1100px;font-family:'宋体';margin:0;padding:0");



      },
      methods:{

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
    .xn_section_wrap {
        height:66px;
        padding:10px;
        border:1px solid #C0C0C0;
        background:#FFFFFF;
        margin-top:15px;
        margin-botton:15px;
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
