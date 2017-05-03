var mongo=require("mongodb");//@2.2.11
var url = require('url');
var host="localhost";
var port="27017";
var server=new mongo.Server(host,port,{auto_reconnect:true});//创建数据库所在的服务器服务器
var db=new mongo.Db("administor",server,{safe:true});//创建数据库对象

//主逻辑
module.exports = function(req,res,collections,selector,fn){
  db.open(function (err,db) {//连接数据库
    if(err)
       throw err;
    else{
        //添加一条数据的示范
        db.collection(collections, function (err,collection) {

            collection.insert(selector,function (err,docs) {
                db.close();
                fn(docs);
            });
        });
    }
  });
  db.on("close", function (err,db) {//关闭数据库
    if(err) throw err;
    else console.log("成功关闭数据库.");
  });
};

