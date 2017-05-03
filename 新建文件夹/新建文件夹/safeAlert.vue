<template>
    <div  v-bind:style = "alertClass">
        <div v-bind:style ="alertHol">
                <div  style=" height:30px;background:#4F66B3;margin-bottom:10px">
                        <span style="display:inline-block;float:left;color:white;line-height:30px;font-size:14px">修改密码</span><img style="display:inline-block;float:right;margin-top:5px;margin-right:5px"  src="../assets/images/x.png">
                </div>
                <ul>
                    <li v-for="item in this.AlertInputArr.list" style="display:block;margin-bottom:10px">
                        <span style="display:inline-block;width:15%">{{item.rowName}}:</span><input_default width="80%" height="20px"></input_default>
                    </li>
                </ul>
                <div></div>
        </div>

    </div>
</template>
<script type="text/javascript">
import input_default from "./input_default.vue";
export default {
     name: 'btn_add',
      data () {
        return {
          alertClass: {
            'width':window.screen.width+"px",
            'height':window.screen.height+"px",
            background:"white",
            'z-index':1050,
            'position':'absolute',
            'top':0,
            'left':0,
            'opacity':0.9
          },
          alertHol:{},
          alertHolTop:{},
          AlertInputArr:{
            list:[{
                rowName:"用户名",
                width:500
            },{
                rowName:"密码",
                width:50
            },{
                rowName:"邮    箱",
                width:110
            }],
            btn:[]
          }
        }
      },
      computed:{

      },
      mounted:function(){
                            var width = (function(arr){
                                              for(var i = 1;i<arr.length;i++){
                                               console.log(arr[i].width);
                                                  if(arr[i-1].width>arr[i].width){
                                                          var temp = arr[i-1].width;
                                                          arr[i-1].width = arr[i].width;
                                                          arr[i].width = temp;

                                                  }
                                              };
                                              console.log(arr[arr.length-1].width);
                                              return arr[arr.length-1].width;

                                        })(this.AlertInputArr.list);
                            var height = this.AlertInputArr.list.length*30+60+30;
                            console.log(window.screen.height/2-height/2);
                            this.alertHol = {
                                   'padding-top':0,
                                    'position':'relative',
                                    'background':'#FFFFFF',
                                    'border':'5px solid #4F66B3',
                                    'border-top':'none',
                                    'width':width+'px',
                                    'height':height+"px",
                                    'top':window.screen.height/2-height/2+'px',
                                    'left':window.screen.width/2-width/2+'px'
                                 }
                            this.alertHolTop = {
                                'height':"30px",
                            }

      },
       beforeDestroy:function(){
            console.log($("#alertHolId").width() );

        },
       components: {input_default}
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