/**
 * Created by guowenqiang on 2016/10/22.
 */
//实现功能接口
var express = require('express'),
    router = express.Router(),
    handler = require('./dbmongodbhandler.js'),
    formidable = require('formidable'),
    crypto = require('crypto');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var Q = require('q');
var images = require("images");
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;

//列表(show,delete)
router.get('/show',function(req,res){
    req.query.action='show';
    handler(req, res, "users",null ,function(data){
        console.log(data);
        if(data.length==0){
            res.end('{"err":"抱歉，无数据"}');
        }else{
            // {id: 1, userName: 'luozh', passWord: 'BootPage是一款支持静态数据和服务器数据的表格分页组件', remark: '编辑',disabled:"true",delete:true},
            var list = [];
            for(var i = 0;i < data.length;i++){
                var obj = {};
                obj.ID=data[i].ID;
                obj.userName=data[i].userName;
                obj.passWord=data[i].passWord;
                obj.remark=data[i].remark;
                obj.disabled=data[i].disabled;
                obj.delete=data[i].delete;
                list.push(obj);
            }
            var obj = {
                "data":list
            }
            var str = JSON.stringify(obj);
            res.end(str);
        }
    });
});
//迭代处理删除后的users列表的ID
var recUpdate = function(req, res, collections,data){
    if(data.length===0){
        res.end('{"success":"删除成功"}');
    }else{
        var selectors = [
            {"userName":data[0].userName},
            {$set:
                {
                    "ID":data[0].ID-1
                }
            }

        ];

        req.query.action = 'update';
        handler(req, res, collections, selectors,function(dat){

            data.shift();
            if(dat.length==0){
                res.end('{"err":"抱歉，更新失败"}');
            }else if(data.length!=0){
                //console.log(data);
                recUpdate(req, res, collections,data);
            }else{
                res.end('{"success":"更新成功"}');
            }
        });
    }
}
//列表删除delete
router.get('/delete',function(req,res){
    req.query.action='delete';

        //删除操作
        handler(req, res, "users",{ID:parseInt(req.query.ID)},function(data){
            //console.log(data);
            if(data.result.n==0){
                res.end('{"err":"删除失败"}');
            }else{
                req.query.action='show';
                handler(req, res, "users",{ID:{$gt:parseInt(req.query.ID)}},function(dat){
                    console.log("7898989");
                    console.log(dat);
                    recUpdate(req, res, "users",dat);
                });
            }
        });

});

//列表add
router.post('/add',function(req,res){
    req.query.action='add';
    console.log("999");
    console.log(req.body);
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
            handler(req, res, "users",userInfos,function(data){
                //console.log(data);
                if(data.length==0){
                    res.end('{"err":"抱歉，添加失败"}');
                }else{

                    res.end('{"success":"添加成功"}');
                }
            });

});
//列表update
router.post('/update',function(req,res){
    req.query.action='update';
        var selectors = [
            {"ID":parseInt(req.body.ID)},
            {$set:
                {//remark: '添加',disabled:false,delete:true
                    "userName":req.body.userName,
                    "passWord":req.body.passWord,
                    "remark":"编辑",
                    "disabled":false,
                    "delete":true
                }
            }

        ];
        //console.log(selectors);
        handler(req, res, "users", selectors,function(data){
            if(data.length==0){
                res.end('{"err":"抱歉，更新失败"}');
            }else{
                res.end('{"success":"更新成功"}');
            }
        });

        //登入后返回当前用户的详细信息


});
module.exports = router;
