<template>
     <div id = "panel" class="cla_panel">{{panelName}}</div>
</template>
<script type="text/javascript">
export default {
     name: 'panel',
     props:['panelName'],
      data () {
        return {
          author: ""
        }
      }
}
</script>
<style>
    .cla_panel{
         width:100%;
         height:34px;
         line-height:34px;
         padding-left:10px;
    	 color:#fff;
    	 background:#157FCC;
    	 text-align:left;
    }

</style>