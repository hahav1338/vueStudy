<template>
<div class="box">
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th width="10%">数据序号</th>
                <th width="30%">name</th>
                <th width="40%">password</th>
                <th width="20%">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="data in lists" v-show="data.delete">
                <td v-text="data.ID">
                </td>
                <td>
                    <input v-model="data.userName"   v-if="data.disabled" disabled>
                    <input v-model="data.userName" v-else >
                </td>
                <td>
                    <input v-model="data.passWord" v-if="data.disabled" disabled>
                    <input v-model="data.passWord" v-else >
                </td>

                <td >
                    <button class="btn btn-default" @click="update(data)" v-text="data.remark" v-if="data.remark!='添加'"></button>
                     <button class="btn btn-default" @click="addData(data)" v-text="data.remark" v-else></button>
                    <button class="btn btn-default" @click="deleteRow(data)">删除</button>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4">
                    <div class="pull-left">
                        <button class="btn btn-default" @click="addrow()">添加</button>当前数据库为{{database}}
                         <button class="btn btn-default" @click="switchover">数据库切换成{{newDatabase}}</button>
                    </div>
                    <div class="pull-right">

                    </div>
                </td>
            </tr>
        </tfoot>
    </table>
</div>
</template>

<script>


export default {
    data () {
        return {
            lenArr: [5, 50, 100], // 每页显示长度设置
            pageLen: 5, // 可显示的分页数
            // url: '/bootpage/', // 请求路径
            database:"mongodb",
            newDatabase:"mysql",
            param: {}, // 传递参数
            updatetext:"编辑",
            lists: [

            ], // 表格原始数据
            tableList: [] // 分页组件传回的分页后数据
        }
    },
    created:function(){
                this.getData();
            },
    methods: {
        getData:function(){
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
        addData:function(data){

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
        update:function(data){
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
        deleteRow:function(data){
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
        switchover:function(){
            console.log("5555");
            if(this.database=="mongodb"){
                this.database="mysql";
                this.getData();
            }else{
                this.database="mongodb"
                this.getData();
            };
            if(this.newDatabase=="mongodb"){
                this.newDatabase="mysql"
            }else{
                this.newDatabase="mongodb"
            };
        },
        addrow:function(){
            var addObj = {ID: this.lists.length+1, userName: ' ', passWord: ' ', remark: '添加',disabled:false,delete:true};
            this.lists.push(addObj);
        }
    },
    events: {

        // 分页组件传回的表格数据
        'data' (data) {
            this.tableList = data
        },

        // 刷新数据
        'refresh' () {
            this.refresh()
        }
    }
}
</script>

<style>
@import url('./assets/css/bootstrap.min.css');

.box {
    padding: 100px;
}
.table>tbody>tr>td{
    height:100%;
    padding:0;
}
input {
    display:block;
    width:100%;
    height:100%;
    border:none;
    outline:none;
}
input:hover {
    background:#F5F5F5;
}
</style>