<template>
    <div class="out_parent">
       <div v-bind:class = "selector_input_parent">
         <span class = "selector_input_right" v-on:mouseup="selector_function_up" v-bind="focus"></span>
         <input v-on:input="input_fun" v-on:focus="selector_function_focus" v-on:blur="selector_function_blur" v-model="input_fun_value" class="selector_input" id="input_btn">
       </div>
       <ul class="selector_input_ul"  v-bind:style="selector_input_ul_visibility">
         <li v-for="data in options" v-on:mousedown="selector_input_ul_li(data.label)" v-text="data.label"></li>
       </ul>
    </div>

</template>

<script>
  export default {
    name:'selector',
     props:['selectorData'],
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        input_fun_value: '',
        selector_input_parent:"selector_input_parent",
        selector_input_ul_visibility:"visibility:hidden",
        focus:false
      }
    },
    methods:{
        input_fun:function(){
            this.input_fun_value="";
        },
        selector_function_blur:function(){
              this.selector_input_parent = "selector_input_parent";
              this.selector_input_ul_visibility="visibility:hidden";

        },
        selector_function_focus:function(){
                  this.selector_input_parent = "selector_input_parent_focus"
                  this.selector_input_ul_visibility="visibility:visible";
        },
        selector_function_up:function(){
             if(this.selector_input_parent=="selector_input_parent"&&!this.focus){
                            this.selector_function_focus();
                            this.focus=true;
                        }else{
                            this.selector_function_blur();
                            this.focus=false;
                        }

        },
        selector_input_ul_li:function(str){
              this.input_fun_value=str;
        }
    }
  }

</script>
<style>
  .out_parent {
    width:105px;
    height:30px;
    margin:10px;
  }
  .selector_input {
          width:105px;
          height:28px;
          position:absolute;
          right:0;
          top:0;
          border:none;
          outline:medium;
      }
      .selector_input_parent {
          width:100px;
          height:30px;
          overflow: hidden;
          position:relative;
          border:1px solid #C0C0C0;
      }
      .selector_input_parent_focus {
        width:100px;
        height:30px;
        overflow: hidden;
        position:relative;
        border:1px solid #3892D3;
      }
      .selector_input_ul {
        width:100px;
        position:absolute;
        border:1px solid #C0C0C0;
        font-size:13px;
        margin:0;
        padding:0;
        z-index: 1000;
      }
      .selector_input_ul li{
        height:30px;
        background-color: #fff;
        list-style: none;
      }
    .selector_input_right{
      position:absolute;
      right:0;
      width:10px;
      height:100%;
      background-color:#3892D3;
      z-index:100;
    }
      .selector_input_right:hover{
        background-image: url("../assets/logo.png");
        background-size:cover;
        backgrond-attachment:fixed;
        background-position:50% 5px;
      }
</style>