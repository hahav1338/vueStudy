<template>
  <div >
    <h1>这是第二页</h1>
    <a> written by {{ author }} </a><br>
    <p>axios发请求示例</p>
    <p>get请求
        <button v-on:click="getAxios">get数据申请</button>
    </p>
    <p>post请求
            <button v-on:click="postAxios">post数据申请</button>
    </p>
  </div>
</template>

<script>
import store from '../vuex/store.js';
//引入axios模块
import axios from 'axios';
//允许跨域请求携带cookie
axios.defaults.withCredentials = true;
export default {

     props:[],
      data () {
        return {
          author: "fcxy"
        }
      },
      methods:{
        getAxios:function(){

             //在main.js中将axios绑定到了Vue的原型属性$reqs上,使用axios时后端需设置跨域
                  this.$reqs({//b22b79dbba018aa0928cf6dbff4f05e4
                    method: 'get',
                    url: 'http://127.0.0.1:3000/Handler/CourseHandler?action=getpower'
                  }).then(function (response) {
                    console.log(response.data);
                  });
                  //this.$http.get('/CourseHandler?action=getpower');

        } ,
        postAxios:function(){
                    console.log("789");
                    //在main.js中将axios绑定到了Vue的原型属性$reqs上，使用axios时后端需设置跨域
                    this.$reqs({
                      method: 'post',
                      url: 'http://127.0.0.1:3000/Handler/CourseHandler?action=show',
                      data:{

                      }
                    }).then(function (response) {
                       console.log(response.data);
                    },function(){
                      console.log("123");
                    });
         }
      }
}
</script>

<style>
</style>
