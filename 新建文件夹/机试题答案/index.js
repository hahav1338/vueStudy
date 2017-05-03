var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var hbs  = require('express3-handlebars');
var mysqlHandler = require('./routes/mysqlHandler');
var mongodbHander = require('./routes/mongodbHandler');
var flash = require('connect-flash');
var http = require('http');
var url = require('url');
var mongo=require("mongodb");//@2.2.11
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(flash());
app.all("*", function(req, res, next) {
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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", contentType+";charset=utf-8");
    next();
});
app.use('/mysql', mysqlHandler);
app.use('/mongodb', mongodbHander);

app.use(express.static(__dirname));
app.listen(3000);

