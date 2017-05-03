<template>
<div class="box">
    <table class="tableList_table table-hover table-bordered">
        <thead>
            <tr>
                <th v-for="data in th_lists" v-bind:width="data.width" v-text="data.value"></th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="(data,index) in lists" v-bind:class="judge_oddOrevent(index)" v-bind:id="data.clickClass" v-on:click="classChang($event,data,index)">
                <td v-for="(da,ind) in th_lists" v-if="ind<th_lists.length-1" v-html="data[da.trueName]"></td>
                <td>
                      <button class="btn btn-default" @click="putawayData(data)"  v-if="data.putaway" v-text="data.putawayText">上架</button>
                      <button class="btn btn-default" @click="update($event,data)" v-if="data.edit">编辑</button>
                      <button class="btn btn-default" @click="deleteRow($event,data)" v-if="data.deleteButton">删除</button>
                      <button class="btn btn-default" style="width:60px" @click="stickData(data)" v-if="data.stick" v-text="data.stickText">置顶</button>
                      <button class="btn btn-default" @click="blocking(data)" v-if="data.blocking" v-text="data.status==='正常'?'冻结':'解冻'"></button>
                      <button class="btn btn-default" @click="addVideo(data)" v-if="data.add" >添加</button>
                </td>
            </tr>
            <tr>&nbsp;</tr>
            <tr>&nbsp;</tr>
            <tr>&nbsp;</tr>
        </tbody>
        <tfoot v-show="tfootShow">
            <tr>
                <td v-bind:colspan="th_lists.length" class="paging_class">
                    <div >
                        <ul class="">
                            <li>
                                <a  @click="onFirstClick()">
                                    <img src="../assets/first.png">
                                </a>
                            </li>
                            <li>
                                <a  @click="onPrevClick()">
                                     <img src="../assets/prev.png">
                                </a>
                            </li>
                            <li style="border:none;" >
                                    {{counts.value}}
                            </li>
                            <li>
                                <a  @click="onNextClick()">
                                     <img src="../assets/next.png">
                                </a>
                            </li>
                            <li>
                                <a  @click="onLastClick()">
                                     <img src="../assets/last.png">
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </tfoot>
    </table>
</div>
</template>

<script>
import paging from './paging.vue'

export default {
    data () {
        return {
            lenArr: [5, 50, 100], // 每页显示长度设置
            pageLen: 5, // 可显示的分页数
            url: '/bootpage/', // 请求路径
            param: {}, // 传递参数
           //调用组件时需传的数据
            tr_click_class:"tableList_table_tbody_tr_click",//控制列表行的点击样式
            th_lists:this.tableListData.th_lists,
            lists: this.tableListData.lists, // 表格加工后数据
            tfootShow:this.tableListData.btnList.tfootShow,//是否显示table的foot
            counts: this.tableListData.count,// 表格原始数据

        }
    },
     props:['tableListData','isComponent'],
    created:function(){//组件创建后初始化数据
                //this.getData();
    },
    mounted:function(){
        this.$forceUpdate();
    },
    components: {
        paging
    },
    methods: {
         getData:function(){//获取数据
                     this.$http({
                        url: "http://localhost:3000/"+this.database+"/show",
                        method: 'GET',
                        data: {}
                    })
                    .then(function (response) {
                        if (!response.data.data.length) {
                            alert("服务器异常");
                        }
                        this.lists=response.data.data;
                    })
        },
        addData:function(data){//添加数据


        },
        update:function(e,data){//编辑数据

            //如果提供了事件对象，则这是一个非IE浏览器
            if ( e && e.stopPropagation ){

                //因此它支持W3C的stopPropagation()方法
                e.stopPropagation();
            }else{
                //否则，我们需要使用IE的方式来取消事件冒泡
                window.event.cancelBubble = true;
            }
            if(this.tableListData.btnList.update){
                this.tableListData.btnList.update(data);
            }
        },
        deleteRow:function(e,data){//删除数据

            //如果提供了事件对象，则这是一个非IE浏览器
            if ( e && e.stopPropagation ){
                //因此它支持W3C的stopPropagation()方法
                e.stopPropagation();
            }else{
                //否则，我们需要使用IE的方式来取消事件冒泡
                window.event.cancelBubble = true;
            }
            if(this.tableListData.btnList.deleteRow){
                this.tableListData.btnList.deleteRow(data);
            }
        },
        blocking:function(data){//冻结处理
            if(this.tableListData.btnList.blocking){
                this.tableListData.btnList.blocking(data);
            }
        },
        addVideo:function(data){
            if(this.tableListData.btnList.addVideo){
                this.tableListData.btnList.addVideo(data);
            }
        },
        putawayData:function(data){//处理上下架
             if(this.tableListData.btnList.putawayData){
                this.tableListData.btnList.putawayData(data);
            }
        },
        stickData:function(data){//置顶与否
            if(this.tableListData.btnList.stickData){
                this.tableListData.btnList.stickData(data);
            }
        },
        judge_oddOrevent:function(num){//隔行样式
            if(num%2===1){
                return "tableList_tr_black";
            }
        },
        classChang:function(e,data,num){//鼠标hover行样式
            data.clickClass="tableList_table_tbody_tr_click";
            for(var i = 0;i<this.lists.length;i++){

                if(i!==num){this.lists[i].clickClass="";}
            }

            if(this.tableListData.btnList.clickRow){


                this.tableListData.btnList.clickRow(e,data,num);
            }
        },
        onNextClick:function(){
                this.tableListData.btnList.NextClick();
        },
        onPrevClick:function(){
                 this.tableListData.btnList.PrevClick();
        },
        onLastClick:function(){
                this.tableListData.btnList.LastClick();
        },
        onFirstClick:function(){
                this.tableListData.btnList.FirstClick();
        }
    },
    events: {
        // 分页组件传回的表格数据
        'data' (data) {
            this.tableList = data
        }
    }
}
</script>

<style>
.tableList_table {
    width:100%;
    height:400px;
    background-color:#FFFFFF;
    border-collapse:collapse;
}
.tableList_table thead tr{
    color:#666666;
    background-color:#EFEFEF;
    border:1px solid #C0C0C0;
    height:34px;
    font-size:13px;
}
.tableList_table tbody tr{
    height:34px;
    font-size:14px;
}
.tableList_table tbody tr td{
    height:34px;
    font-size:14px;
}
.tableList_table thead tr{
    border-right:none;
}
.tableList_table thead tr th{
    padding-left:10px;
    border-right:1px solid #C0C0C0;
}
.tableList_tr_black {
    background-color:#FAFAFA;
}
.tableList_table tbody tr:hover {
    background-color:#ECF4FF;
}
.tableList_table tbody button {
    margin:0;
    padding:0;
    list-style-type:none;
    color:blue;
    background:none;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: none;
    border-left-style: none;
    width:50px;
    height:30px;
    line-height:30px;
}
.tableList_table tbody button:hover{
    cursor:pointer;
}
#tableList_table_tbody_tr_click {
    border:1px solid #3892D3;
}
.tableList_table tfoot {
  width:100%;
}
.tableList_table tfoot tr {
    width:100%;
    height:30px;
    border:1px solid #C0C0C0;
}
.tableList_table tfoot tr td{
    height:30px;
}
.tableList_table tfoot tr td li{
    border:none;
}
.tableList_table tfoot tr td li img{
    vertical-align: bottom;
    margin-bottom:3px;
}
.tableList_table tfoot tr td li img:hover{
    cursor:pointer;
}
.paging_class {
    text-align:left;
}
.box {
    padding: 0;
}
</style>