<template>
    <div id="functional_block" class="functional_block">
        <div class="functional_block_top">
            <div class="functional_block_left"></div>
            <div class="functional_block_right">{{functionalBlockName}}</div>
        </div>
        <div class="functional_block_bottom" v-if="functionalBlockName==='搜索框示例'">
            <add></add>
            <div style="width:100px;display:inline-block">
                    <input_default :defaultStr="author"></input_default>
            </div>
            <div style="width:150px;display:inline-block;margin-left:15px">
                    <input_default :defaultStr="author2"></input_default>
            </div>
            <div style="width:300px;display:inline-block;margin-left:15px">
                     <input_default  :defaultStr="author2"></input_default>
            </div>
            <br>
            <div style="width:500px">
                    <input id="five" v-model:value="author2" type="hidden">
                     <input_default :defaultStr="author2"></input_default>
            </div>
        </div>
    </div>

</template>
<script type="text/javascript">
import add from './btn_add.vue';
import input_default from './input_default.vue'
export default {
     name: 'functional_block',
     props:['functionalBlockName'],
      data () {
        return {
          author: "用户名",
          author2:"课程名"
        }
      },
      methods:{
        change:function(){
            console.log(this.author2+"6666");
        }
      },
      watch:{
        'author2':'change'
      },
      components: {add,input_default}
}
</script>
<style>
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