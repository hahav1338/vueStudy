<template>
  <button class="xn_btn xn_btn_success" id="btn_search">查&nbsp;&nbsp;询</button>
</template>
<script type="text/javascript">
export default {
     name: 'btn_search',
      data () {
        return {
          author: "微信公众号 jinkey-love"
        }
      }
}
</script>

<style>
    .xn_btn{

    	line-height:34px;
    	border:none;
    	color:#fff;
    	text-align:center;
    	cursor:pointer;
    }
    .xn_btn_success{
    	background:#5cb85c;
    }
    .xn_btn_success:hover{
    	background:#449d44;
    }
    @media screen and (max-width: 980px) {
        #btn_search {
            width:113px;
            height:34px;
        }
    }
    @media screen and (max-width: 630px) {
            #btn_search {
                width:50px;
                height:17px;
                font-size:8px;
                line-height:17px;
            }
        }
</style>
