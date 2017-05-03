var mysql=require('mysql');

var poll=mysql.createPool({
// 连接池
    host:'localhost',
    user:'yuhao3213',
    password:'yu5515818',
    database:'fcxy'

});

//
exports.query=function(){
    var args=arguments;
    var sqlStr=args[0];
    var params=[];
    var callback;
// 传递参数 如果传递两个 第一个是 SQL的操作字符串  第二个是回调函数
// 传递三个参数  第一个是操作字符串，第二个是数组，第三个是回调函数
    if(args.length===2 && typeof args[1]==='function'){
        callback=args[1];
    }else if(args.length===3 && Array.isArray(args[1]) && typeof args[2]== 'function'){
        params = args[1];
        callback=args[2];
    }else{
        throw new Error ('参数不匹配');
    }

//  获取与数据库连接
    poll.getConnection(function(err,connection){
        //与数据库连接
        if(err){
            callback(err);
        }
        //执行SQL语句
        connection.query(sqlStr,params,function(err, rows){
            //.query
            if(err){
                callback(err);
            }
            //释放链接
            connection.release();
            callback.apply(null,arguments);

        });

    });


};
