var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs  = require('express3-handlebars');
var flash = require('connect-flash');
var http = require('http');
var url = require('url');
var mongo=require("mongodb");//@2.2.11
var mysql=require('mysql');
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(flash());



app.listen(3000);

