var mongo=require("mongodb");//@2.2.11
var url = require('url');
var host="localhost";
var port="27017";
var server=new mongo.Server(host,port,{auto_reconnect:true});//创建数据库所在的服务器服务器
var db=new mongo.Db("administor",server,{safe:true});//创建数据库对象
//add一条数据
var add = function(collections,selector,fn){
    db.collection(collections, function (err,collection) {
        if(err){
            console.log(err);
            throw err}
        else{
            collection.insert(selector,function (err,docs) {
                db.close();
                fn(docs);
            });

        }


    });
}
//delete
var deletes = function(collections,selector,fn){
    db.collection(collections, function (err,collection) {
        if (err){throw err;}
        else {
            console.log(selector);
            collection.remove(selector,function(err,result){
                if (err){

                    throw  err;
                }
                else {
                    //res.end('{"success":"true"}');
                    db.close();
                    fn(result);

                }
            });



        }

    });
};
//find
var find = function(collections,selector,fn){
    db.collection(collections, function (err,collection) {
        if (err){throw err;}
        else {
            collection.find(selector).sort({tokenId:-1}).toArray(function (err, docs) {

                if (err){

                    throw  err;
                }
                else {
                    //res.end('{"success":"true"}');
                    db.close();
                    fn(docs);

                }

            });
        }

    });
}
//update
var updates = function(collections,selector,fn){
    db.collection(collections, function (err,collection) {
        if (err){throw err;}
        else {
            collection.update(selector[0],selector[1],{"upsert": true, "new": false},function(err, result){

                if (err){

                    throw  err;
                }
                else {
                    //res.end('{"success":"true"}');
                    db.close();
                    fn(result);

                }
            });
        }

    });
}
var methodType = {
    show:find,
    add:add,
    update:updates,
    delete:deletes
};
//主逻辑
module.exports = function(req,res,collections,selector,fn){
    db.open(function (err,db) {//连接数据库
        if(err)
            throw err;
        else{
            methodType[req.query.action](collections,selector,fn);
        }
    });
    db.on("close", function (err,db) {//关闭数据库
        if(err) throw err;
        else console.log("成功关闭数据库.");
    });
};

