/**
 * Created by cena on 2016/4/21.
 */
var express = require('express'),
    router = express.Router(),
    crypto = require('crypto'),
    Carts = require('../models/carts.js');
    Page = require('../models/page.js');
router.get("/carts", function (req, res) {
    Carts.getProByUserId(req.param("id"),function(err,result){
        res.send(result);
    });
});
router.get("/cartsPaging", function (req, res) {
    var page=new Page({
        pageNum:req.param("pageNum"),
        pageSize: req.param("pageSize")
    });

    Carts.getProByUserIdPaging(req.param("id"),page,function(err,result){
        res.send(result);
    });
});
router.get("/cartsToal", function (req, res) {
    Carts.getProByUserIdTotal(req.param("id"),function(err,result){
        res.send(result);
    });
});
router.post("/addCart", function (req, res) {
    var carts=new Carts({
        "userId" : req.body.userId,
        "proId" : req.body.proId
    });
    Carts.addCart(carts,function(err,result){
        res.send(result);
    });
});
router.post("/deleteCart", function (req, res) {
    var proIdList = req.body.proIdList;
    Carts.deleteCart(proIdList,function(err,result){
        res.send(result);
    });
});


module.exports = router;
