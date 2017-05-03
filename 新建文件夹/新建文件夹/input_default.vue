<template>
  <input v-bind:style="input_default" v-bind:value="defaultObj.defaultStr" v-on:focus="fs" v-on:keyup="inp" v-on:blur="bl">
</template>
<script type="text/javascript">
import store from '../vuex/store.js';
 var arr = [];
export default {
      data () {
        return {
          input_default:{}
        }
      },
      props:['width','height','defaultObj'],
      mounted:function(){
        this.input_default={
            'display':'inline-block',
            'width':typeof this.width==="number"?this.width+"px":this.width?this.width:"100%",
            'height':this.height?this.height:"30px",
            'border':'1px solid #C0C0C0'
        }
      },
      methods:{
            fs: function(event) {
                if(this.defaultObj&&this.defaultObj.fs){
                    this.defaultObj.fs();
                }else{
                    return false;
                }
            },
            inp:function(){
                 if(this.defaultObj&&this.defaultObj.inp){
                    this.defaultObj.inp();
                }else{
                    return;
                }
            },
            bl:function(event){
                if(this.defaultObj&&this.defaultObj.bl){
                   this.defaultObj.bl(event.target.value);
               }else{
                   return;
               }
            }
       }
}
</script>

<style>

</style>
