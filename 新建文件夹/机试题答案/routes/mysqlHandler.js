//实现功能接口
var express = require('express'),
    router = express.Router(),
    userDo=require('./dbmysqldbhandler.js'),
    formidable = require('formidable'),
    crypto = require('crypto');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var Q = require('q');
var images = require("images");
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;

//列表(show)
router.get('/show',function(req,res){
    userDo.getUsers(function(err,result){
            result?result:[];
        var list = [];
        for(var i = 0;i < result.length;i++){
            var obj = {};
            obj.ID=result[i].ID;
            obj.userName=result[i].userName;
            obj.passWord=result[i].passWord;
            obj.remark=result[i].remark;
            obj.disabled=result[i].disabled;
            obj.delete=result[i].isDelete;
            list.push(obj);
        }
        var obj = {
            "data":list
        }
        var str = JSON.stringify(obj);
        res.end(str);

    });
});

//列表删除delete
router.get('/delete',function(req,res){
    //删除操作
    userDo.deletUserByid(parseInt(req.query.ID),function(err,result){
        userDo.updateID(parseInt(req.query.ID),function(){

            res.end('{"success":"更新成功"}');
        });
        res.end('{"success":"更新成功"}');
    });

});

//列表add
router.post('/add',function(req,res){
    //组织学员信息并作一些校验
    // {id: 1, userName: 'luozh', passWord: 'BootPage是一款支持静态数据和服务器数据的表格分页组件', remark: '编辑',disabled:"true",delete:true},
    var userInfos = {};
    userInfos.ID = parseInt(req.body.ID);
    userInfos.userName = req.body.userName;
    userInfos.passWord = req.body.passWord;
    userInfos.remark = '编辑';
    userInfos.disabled = true;
    userInfos.delete = true;
    //增加操作
    userDo.saveUser(userInfos,function(err,result){
        //console.log(result);
        res.end('{"success":"添加成功"}');
    })

});
//列表update
router.post('/update',function(req,res){
    var selectors = {
                "ID":parseInt(req.body.ID),
                "userName":req.body.userName,
                "passWord":req.body.passWord,
                "remark":"编辑",
                "disabled":false,
                "delete":true
            }

    userDo.updateUserByid(selectors,function(err,result){
        res.end('{"success":"更新成功"}');

    });


});
module.exports = router;
