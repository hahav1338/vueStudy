/**
 * Created by cena on 2016/4/22.
 */
var express = require('express'),
    router = express.Router(),
   // crypto = require('crypto'),
    Orders = require('../models/orders.js');

router.get('/orders', function (req, res) {
    Orders.getOrdersByUserId(req.param("id"),function(err,result){
        res.send(result);
    });
});
router.get('/ordersPaging', function (req, res) {
    var page=new Page({
        pageNum:req.param("pageNum"),
        pageSize: req.param("pageSize")
    });
    Orders.getOrdersByUserIdPaging(req.param("id"),page,function(err,result){
        res.send(result);
    });
});
router.get("/ordersToal", function (req, res) {
    Orders.getProByUserIdTotal(req.param("id"),function(err,result){
        res.send(result);
    });
});
router.post("/addorders", function (req, res) {
    var prders=new Orders({
        orderNum:req.body.orderNum,
        userId:req.body.userId,
        log:req.body.log,
        orderDate:req.body.orderDate,
        orderFkway:req.body.orderFkwa,
        orderFktype:req.body.orderFkty,
        orderState:req.body.orderStat
        });
    Carts.addCart(prders,function(err,result){
        res.send(result);
    });
});
module.exports=router;