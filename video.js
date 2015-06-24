/**
 * Created by 飞 on 2015/4/9.
 */
var express = require('express');
var app = express();
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'video_monitor',
    port: 3306
});
conn.connect();
function connQuery(sql,param,res){
   /* conn.query(sql,param,function (err, rows, fields) {
        if (err) throw err;
        res.send(callback + "(" + JSON.stringify(rows) + ")");
    });*/
    conn.query(sql,param,function (err, rows, fields) {
        if (err) throw err;
        //res.send(callback + "(" + JSON.stringify(rows) + ")");
        res.jsonp(rows);
    });
}
app.get('/display',function(req, res) {
    var callback = req.query.callback;

    connQuery('select * from video_infor',[],res);
})
app.get('/insert',function(req, res) {
    var callback = req.query.callback;
    var jobNumber = req.query.jobNumber;
    var address = req.query.address;
    var date = req.query.date;
    var videoFile = req.query.videoFile;
//conn.query("insert into video_infor values('" + jobNumber + "','" + address + "','" + date + "','" + videoFile + "')",function(err, rows, fields){
    //    if (err) throw err;
    //});
    connQuery("insert into video_infor values(?,?,?,?)",[jobNumber, address, date, videoFile],res);
})
app.get('/query',function(req, res) {
    var callback = req.query.callback;
    var jobNumber = req.query.jobNumber;

    connQuery("select * from video_infor where jobNumber = ?",[jobNumber],res);
})
app.get('/delete',function(req, res) {
    var callback = req.query.callback;
    var jobNumber = req.query.jobNumber;

    connQuery("delete from video_infor where jobNumber = ?",[jobNumber],res);
})
app.get('/edit',function(req, res) {
    var callback = req.query.callback;
    var jobNumber = req.query.jobNumber;
    var address = req.query.address;
    var date = req.query.date;
    var videoFile = req.query.videoFile;

    connQuery("update video_infor set jobNumber = ?,address = ?,date = ?,videoFile = ? where jobNumber = ?",[jobNumber,address,date,videoFile,jobNumber],res);
})
app.listen(8001);


