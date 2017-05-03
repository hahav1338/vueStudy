var mysql=require('mysql');

var poll=mysql.createPool({
// 连接池
    host:'localhost',
    user:'root',
    password:'84053437',
    database:'mysql'

});

var connectionEx = {};
connectionEx.query=function(){
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
/*
* userInfos.remark = '编辑';
 userInfos.disabled = true;
 userInfos.delete = true;
* */
function Users(users){
    this.ID=users.ID;
    this.userName=users.userName;
    this.passWord=users.passWord;
    this.remark = users.remark;
    this.disabled = users.disabled;
    this.isDelete = users.delete
}
// 插入
Users.saveUser=function(user,callback){
    //准备ID
    var saverSql='INSERT INTO users (ID,userName,passWord,remark,disabled,isDelete) VALUES(?,?,?,?,?,?)';
    connectionEx.query(saverSql,[user.ID,user.userName,user.passWord,user.remark,user.disabled,user.delete],function(err,res){
        if(err){
            console.log(err);
            return;
        }

        callback(err,res);
    });
}
//Users.saveUser({id:5,name:"maik",idd:12});

//删除方法
Users.deletUserByid=function(id,callback){
    var delSql='DELETE FROM users WHERE id=?';
    connectionEx.query(delSql,[id],function(err,res){
        if(err) {
            console.log(err);return
        }
        callback(err,res);

    })
};
//Users.deletUserByid({id:9});
// 查询
Users.getUsers=function(callback){
    var selectSQL='SELECT * FROM users';
    connectionEx.query(selectSQL,[],function(err,res){
        if(err) {
            console.log(err);return
        }
        //console.log('get user success'+res);

// console.log()  取代alert document.write(), 打印出信息
// console.dir()  可以显示出来一个对象的所有属性和方法
        //console.dir(res)
        callback(err,res);
    })
};
//Users.getUserByid(7)
//修改ID
Users.updateID=function(id,callback){
    var delSql='UPDATE users  SET ID=ID-1 WHERE ID>?';
    connectionEx.query(delSql,[id],function(err,res){
        if(err){
            console.log(err);
            return;
        }
        callback(err,res)

    })
};
//修改
Users.updateUserByid=function(user,callback){
    var delSql='UPDATE users  SET userName=?,passWord=? WHERE ID=?';
    connectionEx.query(delSql,[user.userName,user.passWord,user.ID],function(err,res){
        if(err){
            console.log(err);
            return;
        }
        callback(err,res)

    })
};

//Users.updateUserByid({name:"zz",id:7})


module.exports=Users;