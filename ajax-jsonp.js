/**
 * Created by 飞 on 15-3-26.
 */

var express = require('express');
var app = express();
var data = [
    {"jobNumber":"0051","address":"四川","date":"2015.03.20","videoFile":"20150320083000.wmv"},
    {"jobNumber":"0051","address":"四川","date":"2015.03.19","videoFile":"20150319083000.wmv"},
    {"jobNumber":"0051","address":"四川","date":"2015.03.18","videoFile":"20150318083000.wmv"},
    {"jobNumber":"0051","address":"四川","date":"2015.03.17","videoFile":"20150317083000.wmv"},
    {"jobNumber":"0051","address":"四川","date":"2015.03.16","videoFile":"20150316083000.wmv"}
];
app.get('/',function(req, res){
    var callback = req.query.callback;
    res.send(callback + "(" + JSON.stringify(data)+")");
})
app.listen(8001);