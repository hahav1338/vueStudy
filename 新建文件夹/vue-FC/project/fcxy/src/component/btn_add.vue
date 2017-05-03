<template>
    <button v-on:click="clickFns" class="xn_btn xn_btn_primary" style="float:right; margin-right: 20px;" id="" ><i class="icon icon-plus"></i>&nbsp;&nbsp;添加
     </button>
</template>
<script type="text/javascript">
export default {
     name: 'btn_add',
      data () {
        return {
          author: "微信公众号 jinkey-love"
        }
      },
      props:['clickFn'],
      methods:{
            clickFns:function(){
                this.clickFn();
            }
      }
}
</script>
<style>
    .xn_btn{
         width:113px;
         height:34px;
        position:relative;
    	line-height:34px;
    	border:none;
    	color:#fff;
    	text-align:center;
    	cursor:pointer;
    }
    .xn_btn_primary{
    	background:#4f66b3;
    }
    .xn_btn_primary:hover{
    	background:#4159a6;
    }
    .icon{
         font-family: FontAwesome;
          font-weight: normal;
          font-style: normal;
          text-decoration: inherit;
          display: inline;
          position:absolute;
          top:13px;
          width: auto;
          height: 10px;
          border-left:2px solid white;
          line-height: normal;
          vertical-align: baseline;
          background-image: none !important;
          background-position: 0% 0%;
          background-repeat: repeat;
    }
    .icon-plus:before{
        content: " ";
        position:absolute;
         width: 10px;
          border-top:2px solid white;
          left:-6px;
          top:4px;
    }

</style>