<template>
  <input class="input_default" v-model:value="defStr" v-on:focus="fs()" v-on:keyup="inp()" v-on:blur="bl">
</template>
<script type="text/javascript">
 var arr = [];
export default {
     name: 'input_default',
      props:['defaultStr'],
      data () {
        return {
          defStr: this.defaultStr
        }
      },
      methods:{
            fs: function() {

                arr.push(this.defaultStr);
                this.defStr="";

            },
            inp:function(){
                if(!this.defStr){
                    this.defStr = arr[0];

                    this.$el.blur();

                }


            },
            bl:function(){

                if(!this.defStr){
                     this.defStr = arr[0];

                }

            }
       }
}
</script>

<style>
    .input_default{
        display:inline-lock;
        width:100%;
        height:28px;
        margin:10px;
        border:1px solid #C0C0C0;
    }
</style>
