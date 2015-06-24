/**
 * Created by 飞 on 2015/4/9.
 */
var express = require('express'),
    mysql = require('mysql'),
    http = require('http');
var app = express();
//  添加body解析中间件
app.use(express.bodyParser());
var CONNECT_STRING = {    user : "root",    password:""};
var conn = mysql.createConnection( CONNECT_STRING);
// 切换到test数据库
conn.query( 'use test');
// 向mysql插入数据// title 标题// author 作者// comment 摘要
function insertInfo(title , author , comment){
    conn.query("insert into info value(?,?,?)", [title, author , comment], function(err,result){
        if( err ){
            console.log( "error:" + err);
        }
    });
}
// query
function getInfoByTitle(title){
    var result = conn.query('select * from info where title=?' , [title] );
    return result;
}
//delete
function deleteByTitle(title){
    conn.query( 'delete from info where title = ?' , [title]);
}
// 查询指定的文章
app.get('/info/:title' , function(req,res) {
    console.log(req.params.title);
    var result = getInfoByTitle(req.params.title);
})