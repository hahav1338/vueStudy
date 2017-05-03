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


//特殊图片请求，不由express的静态服务管理
app.get('/DownLoadPicHandler',function(req,res){
  console.log("6666");

});
app.post('/DownLoadPicHandler',function(req,res){
  console.log("6666");

});
//app.use('/', product);
app.use(express.static(__dirname));
//app.use('/', product);
//app.use('/', carts);
//app.use('/users', users);
app.listen(3000);


