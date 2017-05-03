<template>
    <div class="out_parent"  v-bind:style="selectorStyle">
        <i style="height:10px" v-on:click="powerClickBtn">▼</i>
       <input style="width:100%;height:100%" v-on:click="powerClickBtn($event)" v-bind:value="powerInputValue.value"/>
       <ul v-bind:style="ulDisplay" style="width:100%">
          <li v-for="(item,index) in options" style="width:100%" v-on:click="liClick($event,item)" v-on:mouseenter="liMouseenter()" v-text="item.power">111</li>
       </ul>
    </div>

</template>

<script>
  export default {
    name:'selector',

    data() {
      return {
        ulDisplay:{'display':'none','position':'absolute','z-index':'1001'},
        powerInputValue:this.selectorData.defaultStr,
        selectorStyle:this.selectorData.selectorStyle,
        options:this.selectorData.options
      }
    },
    props:['selectorData'],
    computed:{

    },
    mounted:function(){

        this.$forceUpdate();


    },
    methods:{
        mousedownFn:function(){
            this.ulDisplay.display="none";
        },
        powerClickBtn:function(event){//下拉框样式控制
            //下拉框有数据的话执行
            if(this.selectorData.options.length){
                this.ulDisplay.display="block";
                event.target.blur();
                var fn=this.mousedownFn;
                document.addEventListener("mousedown",fn, true)
            }

        },
        liClick:function(event,item){
            this.selectorData.defaultStr.value=event.target.innerText;
            //clickFn
            if(this.selectorData.clickFn){
                this.selectorData.clickFn(event,item);
            }
            this.ulDisplay.display="none";
        },
        liMouseenter:function(){
             var fn=this.mousedownFn;
            document.removeEventListener('mousedown',fn,true);
        }
    }
  }

</script>
<style>
    .out_parent{
        margin:0;
        padding:0;
        position:relative;
        width:100%;
        top:0;
        left:0;
    }
    .out_parent i {
        position:absolute;
        top:50%;
        margin-top:-5px;
        right:0;
       font-size:8px;
       color:#777;
    }
    .out_parent i:hover {
            cursor:pointer;
           position:absolute;
           top:50%;
           margin-top:-5px;
           right:0;
          font-size:8px;
          color:#777;
        }
        .out_parent input {

        }
      .out_parent ul {
        margin-top:-5px !important;
        border:1px solid #666;
        background:#fff;


      }
        .out_parent ul li{
                   margin:0;
                   padding:0;
             }
       .out_parent ul li:hover{
              background:#C1DDF1;
       }
</style>