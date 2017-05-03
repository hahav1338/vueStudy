<template>
    <div  v-bind:style = "alertClass">
        <div v-bind:style ="alertHol">
                <div  style=" height:30px;background:#4F66B3;margin-bottom:10px">
                        <span style="display:inline-block;float:left;color:white;line-height:30px;font-size:14px">管理员添加</span><img v-on:click="AlertInputArr.btn[1].btn_click" style="display:inline-block;float:right;margin-top:5px;margin-right:5px"  src="../assets/images/x.png">
                </div>
                <ul>
                    <template v-for="item in this.AlertInputArr.list">
                        <li v-if ="item.type==='input'" style="display:block;margin-bottom:10px">
                                                <span style="display:inline-block;width:80px;text-align:right">{{item.rowName}}:</span><input_default v-bind:width="item.width"  height="20px" v-bind:defaultObj="item.defaultObj"></input_default>
                        </li>
                        <li v-if = "item.type==='selector'" style="display:block;height:30px;margin-bottom:10px;position:relative">
                                                   <span style="display:inline-block;width:80px;height:20px;line-height:20px;text-align:right;">权限选择:</span><div  style="position:absolute;top:-10px;;right:0"><selector v-bind:selectorData="item"></selector></div>
                        </li>
                    </template>


                </ul>

                <div style="text-align:center">
                    <btn v-bind:props_btn_data_obj="AlertInputArr.btn[0]"></btn><btn v-bind:props_btn_data_obj="AlertInputArr.btn[1]"></btn>
                </div>
        </div>

    </div>
</template>
<script type="text/javascript">
import input_default from "./input_default.vue";
import btn from "./btn.vue";
import selector from "./powerSelector.vue";
import adminListStore from "../vuex/adminListStore.js";
import store from "../vuex/store.js";
export default {
     name: 'btn_add',
      data () {
        return {
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
          AlertInputArr:adminListStore.state.AlertInputArr
        }
      },
      computed:{

      },
      mounted:function(){
                            var width = (function(arr){
                                              for(var i = 1;i<arr.length;i++){

                                                  if(arr[i-1].width>arr[i].width){
                                                          var temp = arr[i-1].width;
                                                          arr[i-1].width = arr[i].width;
                                                          arr[i].width = temp;

                                                  }
                                              };

                                              return arr[arr.length-1].width;

                                        })(this.AlertInputArr.list)+110;
                            var height = this.AlertInputArr.list.length*30+60+30+100;

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
       beforeDestroy:function(){


        },
       components: {input_default,btn,selector}
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