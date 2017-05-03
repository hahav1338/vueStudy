<template>
<div class="box">
    <table class="tableList_table table-hover table-bordered">
        <thead>
            <tr>
                <th v-for="data in th_lists" v-bind:width="data.width" v-text="data.value"></th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="(data,index) in lists" v-bind:class="judge_oddOrevent(index)" v-bind:id="data.clickClass" v-on:click="classChang(data,index)">
                <td v-text="data.ID"></td>
                <td v-text="data.userName"></td>
                <td v-text="data.passWord"></td>
                <td    >
                      <button class="btn btn-default" @click="putawayData(data)"  v-if="data.putaway">上架</button>
                      <button class="btn btn-default" @click="update(data)">编辑</button>
                      <button class="btn btn-default" @click="deleteRow(data)">删除</button>
                      <button class="btn btn-default" @click="stickData(data)" v-if="data.stick">置顶</button>
                </td>
            </tr>
        </tbody>
        <tfoot>
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
                            <li style="border:none;" v-text="">
                                0
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
            props:['selectorData'],//调用组件时需传的数据
            tr_click_class:"tableList_table_tbody_tr_click",//控制列表行的点击样式
            th_lists:[{value:"唯一",width:"20%"},{value:"userName",width:"40%"},{value:"passWord",width:"20%"},{value:"operation",width:"20%"}],//列表头项数组
            lists: [
                {ID: 1, userName: 'luozh', passWord: 'BootPage', operation: 'dsds',clickClass:""},
                {ID: 2, userName: 'luozh', passWord: '支持ap', operation: 'dsds',clickClass:""},
                {ID: 3, userName: 'luozh', passWord: '<bootfalse为否', operation: 'dsds',clickClass:""},
                {ID: 4, userName: 'luozh', passWord: 'data为静组；', operation: 'dsds',clickClass:""},
                {ID: 5, userName: 'luozh', passWord: 'lens为每的数组', operation: 'dsds',clickClass:""},
                {ID: 6, userName: 'luozh', passWord: 'page-le显示的页码数', operation: 'dsds',clickClass:""},
                {ID: 7, userName: 'luozh', passWord: '服务器回传参数为总页数', operation: 'dsds',clickClass:""},
                {ID: 8, userName: 'luozh', passWord: '可以格数据', operation: 'dsds',clickClass:""}
            ], // 表格加工后数据
            tableList: [] // 表格原始数据
        }
    },
    created:function(){//组件创建后初始化数据
                //this.getData();
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

             this.$http({
                url: "http://localhost:3000/"+this.database+"/add",
                method: 'POST',
                data: data
            })
            .then(function (response) {
                console.log("654321"+response);
                data.remark='编辑';
                this.getData();
            })
        },
        update:function(data){//编辑数据
            if(data.remark=="编辑"){
                data.disabled=false
                 data.remark="确定"
            }else{
                data.disabled=true
                this.$http({
                    url: "http://localhost:3000/"+this.database+"/update",
                    method: 'POST',
                    data: data
                })
                .then(function (response) {
                    this.getData();
                })
            }

        },
        deleteRow:function(data){//删除数据
            if(data.delete){
                data.delete=false;
                this.$http({
                    url: "http://localhost:3000/"+this.database+"/delete",
                    method: 'GET',
                    data: data
                })
                .then(function (response) {

                        this.getData();


                })
            }
        },
        judge_oddOrevent:function(num){//隔行样式
            if(num%2===1){
                return "tableList_tr_black";
            }
        },
        classChang:function(data,num){//鼠标hover行样式
            data.clickClass="tableList_table_tbody_tr_click";

            for(var i = 0;i<this.lists.length;i++){

                if(i!==num){this.lists[i].clickClass="";}
            }
        }
    },
    events: {

        // 分页组件传回的表格数据
        'data' (data) {

            console.log("6666");
            this.tableList = data
        }
    }
}
</script>

<style>
.tableList_table {
    width:100%;
    height:100%;
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
    border:1px solid #C0C0C0;
}
.tableList_table tfoot tr td li img{
    vertical-align: bottom;
}
.tableList_table tfoot tr td li img:hover{
    cursor:pointer;
}
.paging_class {
    text-align:left;
}
.box {
    padding: 100px;
}
</style>