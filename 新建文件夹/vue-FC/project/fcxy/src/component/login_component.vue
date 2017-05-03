<template>
    <div class="containner">
        <bgcavas></bgcavas>
        <div class="login_wrap">
          <img class="logo" src="../assets/back_logo.png"/>
          <form>
            <div class="oneinput_box">
              <span class="icon"><i class="icon-user"></i></span>
              <input ref="loginId_inp" type="text" placeholder="用户名"/>
            </div>
            <div class="oneinput_box">
              <span class="icon"><i class="icon-lock"></i></span>
              <input ref="userPwd_pwd" type="password" placeholder="密码"/>
            </div>
            <div class="oneinput_box" onselectstart="return false;" >
              <span class="icon"><i class="icon-lock"></i></span>
              <input ref="validCode_vali"  type="text" style="width:310px" placeholder="验证码"/>

                    <vercavas ref="veriCodeId" ></vercavas>
            </div>
          </form>
          <button class="btn btn-info" v-on:click="findBackPwd();">忘记密码?</button>
          <button ref="loginButton" class="btn btn-success" v-on:click="login();">登录</button>
        </div>

    </div>
</template>

<script>
import bgcavas from './bgCanvas.vue';
import vercavas from './verification.vue';
export default {
  name: 'login',
  data () {
    return {
      msg: ""
    }
  },
  mounted:function(){
        this.$refs.loginId_inp.focus();
        //点击键盘登录
        var  _this=this;
        document.onkeypress=function (e) {
          if (e.keyCode == 13) {
            _this.login();
          }
        };
        document.body.setAttribute("style","background: #0d1953");

  },
  destoryed:function(){
         document.body.setAttribute("style","background: ");
  },
  computed: {
      count:function() {
  	    return store.state.count++
      }
    },
    methods:{
        checkVerification:function(){

        },
        login: function() {  //登录方法
                        var _this=this;
                      this.$reqs({//180.76.156.148
                        method: 'get',
                        url:  this.$store.state.url.BASEURL+ this.$store.state.url.CHECKVERICODE+'&veri='+this.$refs.validCode_vali.value
                      }).then(function (response) {
                                  if(response.data.success){
                                        var loginId = _this.$refs.loginId_inp.value.trim(),
                                            userPwd = _this.$refs.userPwd_pwd.value.trim(),
                                            validCode = _this.$refs.validCode_vali.value.trim();

                                          if (loginId && userPwd && validCode) {
                                            _this.$refs.loginButton.setAttribute('disabled', true)
                                            _this.$refs.loginButton.innerText='登录中……';
                                            _this.$reqs({//180.76.156.148
                                              method: 'post',
                                              url: _this.$store.state.url.BASEURL+_this.$store.state.url.ADMINLOGIN,

                                              data:{
                                                userName:loginId,
                                                password:userPwd
                                              }
                                            }).then(function (response) {
                                                window.location.href="/second";
                                            });
                                          }
                                  }else{
                                     _this.$refs.veriCodeId.changVer();
                                    alert(response.data.err);
                                  }

                      });

                },

          findBackPwd:function () {//忘记密码，找回密码
            alert("暂未开通！");
          }
    },
   components: {bgcavas,vercavas}
};



</script>

  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .containner{
        background: #0d1953;
        overflow: hidden;
        width:100%;
        height:100%;
    }
    .containner img {
      border: none;
    }

    .containner canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }

    .login_wrap {
      width: 560px;
      height: 320px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -180px;
      margin-left: -280px;
      z-index: 3;
      color: #fff;
    }

    .login_wrap .logo {
      margin-left: 140px;
      margin-bottom: 29px;
    }

    .login_wrap input {
      background: #0d1953;
      width: 413px;
      height: 34px;
      line-height: 34px;
      border: 1px solid #3c498a;
      margin-left: 29px;
      padding-left:5px;
      color: #fff;
    }

    input:focus {
      outline: none;
    }

    .oneinput_box {
      position:relative;
      margin-bottom: 25px;
      overflow: hidden;
      width: 457px;
      padding-left: 10px;
    }

    .oneinput_box * {
      float: left;
    }

    .oneinput_box span {
      background: #0d1953;
      border: 1px solid #3c498a;
      padding: 11px 9px;
      border-right: none 0;
      height: 12px;
      width: 10px;
      padding-left: 10px;
      overflow: hidden;

    }

    .oneinput_box .icon {
      top:0;
      left:10px;
      font-size: 10px;
      width: 9px;
      height: 12px;
    }
    .oneinput_box .icon-lock {
          top:0;
          left:10px;
          font-size: 10px;
          width: 9px;
          height: 12px;
          z-index:1000000000;
        }
    .erwei_code {
      width: 91px;
      height: 34px;
      float: right;
      cursor: pointer;
    }

    .btn {
      width: 113px;
      height: 34px;
      line-height: 34px;
      border: none;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }

    .btn-info {
      background: #3cadcf;
      float: left;
    }

    .btn-info:hover {
      background: #1f8fb0;
    }

    .btn-success {
      background: #5cb85c;
      float: right;
    }

    .btn-success:hover {
      background: #449d44;
    }

  </style>
