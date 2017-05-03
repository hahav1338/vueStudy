<template>
  <button class="btn_class" v-bind:style="props_class" v-text="btn_text" v-on:click="btn_click()"></button>
</template>
<script type="text/javascript">
import store from '../vuex/store.js';
 var arr = [];
export default {
    store:store,
     name: 'input_default',
      props:['props_btn_data_obj'],
      data () {
        return {
          props_class:{},
          btn_text:""
        }
      },
      mounted:function(){
        this.props_class={
            'background':this.props_btn_data_obj.background
        };
        this.btn_text=this.props_btn_data_obj.btn_text;
      },
      methods:{
            btn_click: function() {

                if(this.props_btn_data_obj&&this.props_btn_data_obj.btn_click){
                    this.props_btn_data_obj.btn_click();
                }else{
                    return false;
                }

            }
       }
}
</script>

<style>
    .btn_class{
        width:80px;
        height:32px;
        margin:0;
        padding:0;
        border:none;
        cursor:pointer;
        color:#fff;
        margin-right:10px;
    }
</style>
