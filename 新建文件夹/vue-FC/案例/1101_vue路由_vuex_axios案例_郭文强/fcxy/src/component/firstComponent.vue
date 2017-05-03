
<template>
  <div >
    <h1>这相当于首页</h1>
    <a> 作者： {{ author}} </a><br>
    <button v-on:click="toSecond">跳转到第二页</button><br>
    <p>vuex管理下的count值为：{{count.value}}</p><br>
    <button v-on:click="countAdd">count值加1</button>
    <hr>
    <p>父子组件传值机制下的<span style="color:red">number</span>值为：<span style="color:red">{{ number }}</span></p>
    <div>这是引入的‘third’组件
        <third v-bind:countNum="number" v-on:countNumFn = "numberFn"></third>
    </div>
  </div>
</template>

<script type="text/javascript">
import third from './third.vue';
import store from '../vuex/store.js';
export default {

     props:['abc'],
      data () {
        return {
          author: "fcxy",
          count:"",
          number:0
        }
      },
      components:{third},
      mounted:function(){
        this.count=store.state.count;
      },
      methods:{
        toSecond:function(){
            window.location = "/second"
        },
        countAdd:function(){
            store.commit("add");
        },
        numberFn:function(){
            this.number++;
        }
      }
}
</script>

<style>
</style>
