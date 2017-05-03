<template>
    <div>

        <!--style给定宽度可以影响编辑器的最终宽度-->
        <textarea   id="myEditor" style="width:100%;height:240px;">{{contentTxt.value}}

        </textarea >


        <div class="clear"></div>
        <!--<div id="btns">
            <table>
                <tr>
                    <td>
                        <button class="btn" unselected="on" v-on:click="getAllHtml()">获得整个html的内容</button>&nbsp;
                        <button class="btn" v-on:click="getContent()">获得内容</button>
                        <button class="btn" v-on:click="setContent()">写入内容</button>
                        <button class="btn" v-on:click="setContent(true)">追加内容</button>
                        <button class="btn" v-on:click="getContentTxt()">获得纯文本</button>
                        <button class="btn" v-on:click="getPlainTxt()">获得带格式的纯文本</button>
                        <button class="btn" v-on:click="hasContent()">判断是否有内容</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button class="btn" v-on:click="setFocus()">编辑器获得焦点</button>&nbsp;
                        <button class="btn" v-on:mousedown="isFocus();return false;">编辑器是否获得焦点</button>
                        <button class="btn" v-on:click="doBlur()">编辑器取消焦点</button>&nbsp;
                        <button class="btn" v-on:click="insertHtml()">插入给定的内容</button>&nbsp;
                        <button class="btn" v-on:click="getContentTxt()">获得纯文本</button>&nbsp;
                        <button class="btn" id="enable" v-on:click="setEnabled()">可以编辑</button>&nbsp;
                        <button class="btn" v-on:click="setDisabled()">不可编辑</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button class="btn" v-on:click="UM.getEditor('myEditor').setHide()">隐藏编辑器</button>&nbsp;
                        <button class="btn" v-on:click="UM.getEditor('myEditor').setShow()">显示编辑器</button>&nbsp;
                        <button class="btn" v-on:click="UM.getEditor('myEditor').setHeight(300)">设置编辑器的高度为300</button>&nbsp;
                        <button class="btn" v-on:click="UM.getEditor('myEditor').setWidth(1200)">设置编辑器的宽度为1200</button>
                    </td>
                </tr>

            </table>
        </div>
        <table>
            <tr>
                <td>
                    <button class="btn" v-on:click="createEditor()"/>创建编辑器</button>
                    <button class="btn" v-on:click="deleteEditor()"/>删除编辑器</button>
                </td>
            </tr>
        </table>

        <div>
            <h3 id="focush2"></h3>
        </div>

-->
    </div>
</template>
<script type="text/javascript">
import store from '../vuex/store.js';
import courseEditListStore from '../vuex/courseEditListStore.js';
    export default {
          props:['contentTxt'],
          data () {
            return {
              props_class:{},
              btn_text:"",
              um:""
            }
          },
          mounted:function(){
                 //实例化编辑器
                   /* var _this = this;
                    console.log(this);
                    this.$nextTick(function(){
                         console.log(_this);
                         _this.um = UM.getEditor('myEditor');
                         console.log(_this.um);
                        _this.um.addListener('blur',function(){

                           console.log(_this.getContentTxt());
                        });
                    });*/
                        this.$nextTick(function f1() {
                            // 保证 this.$el 已经插入文档

                            //this.$refs.editor.id = this.id;
                            this.um = UM.getEditor('myEditor');

                            this.um.ready(function f2() {
                              //this.um.setContent(this.value);

                              this.um.addListener("contentChange", function () {
                                //const wordCount = this.editor.getContentLength(true);
                               // const content = this.editor.getContent();
                                //const plainTxt = this.editor.getPlainTxt();
                                //this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt });
                                console.log("123");
                                courseEditListStore.state.courseDtail.value = this.getContentTxt();
                                 console.log(this.contentTxt.value);
                              }.bind(this));

                              this.$emit('ready', this.um);
                            }.bind(this));
                          });

          },
          desdoryed:function(){
                //实例化编辑器
                                    var _this = this;
                                    this.um = UM.getEditor('myEditor');
                                    this.um.addListener('blur',function(){

                                       console.log(_this.getContentTxt());
                                    });
                                    this.um.addListener('focus',function(){
                                        $('#focush2').html('55555')
                                    });
          },
          methods:{
                    insertHtml:function() {
                        var value = prompt('插入html代码', '');
                        this.um.execCommand('insertHtml', value)
                    },
                    isFocus:function(){
                        alert(this.um.isFocus())
                    },
                    doBlur:function(){
                        this.um.blur()
                    },
                    createEditor:function () {
                        enableBtn();
                        this.um = UM.getEditor('myEditor');
                    },
                    getAllHtml:function () {
                        alert(UM.getEditor('myEditor').getAllHtml())
                    },
                    getContent:function () {
                        var arr = [];
                        arr.push("使用editor.getContent()方法可以获得编辑器的内容");
                        arr.push("内容为：");
                        arr.push(UM.getEditor('myEditor').getContent());
                        return arr.join("\n");
                    },
                    getPlainTxt:function () {
                        var arr = [];
                        arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
                        arr.push("内容为：");
                        arr.push(UM.getEditor('myEditor').getPlainTxt());
                        alert(arr.join('\n'))
                    },
                    setContent:function (isAppendTo) {
                        var arr = [];
                        arr.push("使用editor.setContent('欢迎使用umeditor')方法可以设置编辑器的内容");
                        UM.getEditor('myEditor').setContent('欢迎使用umeditor', isAppendTo);
                        alert(arr.join("\n"));
                    },
                    setDisabled:function () {
                        UM.getEditor('myEditor').setDisabled('fullscreen');
                        disableBtn("enable");
                    },

                    setEnabled:function () {
                        UM.getEditor('myEditor').setEnabled();
                        enableBtn();
                    },

                    getText:function () {
                        //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
                        var range = UM.getEditor('myEditor').selection.getRange();
                        range.select();
                        var txt = UM.getEditor('myEditor').selection.getText();
                        alert(txt)
                    },

                    getContentTxt:function () {
                        var arr = [];
                        arr.push(UM.getEditor('myEditor').getContentTxt());
                        return arr.join("\n");
                    },
                    hasContent:function () {
                        var arr = [];
                        arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
                        arr.push("判断结果为：");
                        arr.push(UM.getEditor('myEditor').hasContents());
                        alert(arr.join("\n"));
                    },
                    setFocus:function () {
                        UM.getEditor('myEditor').focus();
                    },
                    deleteEditor:function () {
                        disableBtn();
                        UM.getEditor('myEditor').destroy();
                    },
                    disableBtn:function (str) {
                        var div = document.getElementById('btns');
                        var btns = domUtils.getElementsByTagName(div, "button");
                        for (var i = 0, btn; btn = btns[i++];) {
                            if (btn.id == str) {
                                domUtils.removeAttributes(btn, ["disabled"]);
                            } else {
                                btn.setAttribute("disabled", "true");
                            }
                        }
                    },
                    enableBtn:function () {
                        var div = document.getElementById('btns');
                        var btns = domUtils.getElementsByTagName(div, "button");
                        for (var i = 0, btn; btn = btns[i++];) {
                            domUtils.removeAttributes(btn, ["disabled"]);
                        }
                    }
           }
    }


</script>

<style>
    h1{
        font-family: "微软雅黑";
        font-weight: normal;
    }
    .btn {
        display: inline-block;
        *display: inline;
        padding: 4px 12px;
        margin-bottom: 0;
        *margin-left: .3em;
        font-size: 14px;
        line-height: 20px;
        color: #333333;
        text-align: center;
        text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
        vertical-align: middle;
        cursor: pointer;
        background-color: #f5f5f5;
        *background-color: #e6e6e6;
        background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
        background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
        background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
        background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
        background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
        background-repeat: repeat-x;
        border: 1px solid #cccccc;
        *border: 0;
        border-color: #e6e6e6 #e6e6e6 #bfbfbf;
        border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
        border-bottom-color: #b3b3b3;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);
        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
        *zoom: 1;
        -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .btn:hover,
    .btn:focus,
    .btn:active,
    .btn.active,
    .btn.disabled,
    .btn[disabled] {
        color: #333333;
        background-color: #e6e6e6;
        *background-color: #d9d9d9;
    }

    .btn:active,
    .btn.active {
        background-color: #cccccc \9;
    }

    .btn:first-child {
        *margin-left: 0;
    }

    .btn:hover,
    .btn:focus {
        color: #333333;
        text-decoration: none;
        background-position: 0 -15px;
        -webkit-transition: background-position 0.1s linear;
        -moz-transition: background-position 0.1s linear;
        -o-transition: background-position 0.1s linear;
        transition: background-position 0.1s linear;
    }

    .btn:focus {
        outline: thin dotted #333;
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
    }

    .btn.active,
    .btn:active {
        background-image: none;
        outline: 0;
        -webkit-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .btn.disabled,
    .btn[disabled] {
        cursor: default;
        background-image: none;
        opacity: 0.65;
        filter: alpha(opacity=65);
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }
</style>





