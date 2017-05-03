var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session    = require('express-session');
var hbs  = require('express3-handlebars');
var index = require('./routes/index');
var handler = require('./routes/handler');
var flash = require('connect-flash');
var http = require('http');
var url = require('url');
var mongo=require("mongodb");//@2.2.11
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(flash());
app.all('*', function(req, res, next) {
  var oriRefer;
  if(req.headers.referer){
    oriRefer= req.headers.referer.substring(0,req.headers.referer.indexOf("/",10));
  }
  var MIME_TYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
  };
  var filePath;
  if(req.url==="/"){
    filePath =  "index.html";
  } else if(req.url==="/www/"){
    filePath =  "index.html";
  }else{
    filePath = "./" + url.parse(req.url).pathname;
  }
  var ext = path.extname(filePath);
  ext = ext?ext.slice(1) : 'unknown';
  var contentType = MIME_TYPE[ext] || "text/plain";
  res.header("Access-Control-Allow-Origin", oriRefer?oriRefer:"*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", contentType+";charset=utf-8");
  next();
});
app.use(session({
    secret: 'FCXUHT',
    name: 'FCXUHT',
    cookie: {maxAge: 800000000000},
    resave: false,//每次请求都重新设置session cookie
    saveUninitialized: true//每次请求都设置个session cookie
}));

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var error = req.flash('error');
    res.locals.error = error.length ? error : null;

    var success = req.flash('success');
    res.locals.success = success.length ? success : null;
    next();
});
app.use('/', index);
app.use('/Handler', handler);

//特殊图片请求，不由express的静态服务管理
app.get('/DownLoadPicHandler',function(request,response){
  var arr = request.originalUrl.split("=");
  console.log(arr);
  var host="localhost";
  var port="27017";
  var server=new mongo.Server(host,port,{auto_reconnect:true});//创建数据库所在的服务器服务器
  var db=new mongo.Db("administor",server,{safe:true});//创建数据库对象
  db.open(function (err,db) {//连接数据库
    if(err)
     console.log(err);
    else{
      db.collection('coverList', function (err,collection) {
        if (err){  response.end('{"err":"抱歉，上传图片失败"}');}
        else {
          collection.find({pathName:arr[arr.length-1]}).toArray(function (err, docs) {

            if (err||!docs[0]){

              console.log('234566');
              response.end('{"err":"抱歉，上传图片失败"}');
            }
            else {
              db.close();
              response.end(docs[0].contents.buffer);

            }

          });
        }

      });


    }
  });
  db.on("close", function (err,db) {//关闭数据库
    if(err) throw err;
    else console.log("成功关闭数据库.");
  });

});

//app.use('/', product);
app.use(express.static(__dirname));
//app.use('/', product);
//app.use('/', carts);
//app.use('/users', users);
app.listen(3000);

