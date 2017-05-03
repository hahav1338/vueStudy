<template>
  <div>
    <h1>这是第一页中引入的组件</h1>
    <a> 从父级组件传来的’number‘值是<span style="color:red">{{ countNum }}</span> </a><br>
    <p>下面是子组件'third'中的按钮，点击使父组件中的"number"值加1</p>
    <button v-on:click = "addNumber">number的值加1</button>
  </div>
</template>

<script>
import store from '../vuex/store.js';
export default {
     name: 'secondComponent',
     props:['countNum','countNumFn'],
      data () {
        return {
          author: "fcxy"
        }
      },
      methods:{
        addNumber:function(){
            this.$emit('countNumFn');
        }
      }

}
</script>

<style>
</style>