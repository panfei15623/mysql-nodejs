/**
 * Created by 飞 on 2015/4/16.
 */
app.post("/zhuce",function(req,res){
    var tel=req.body.usertel;
    var i=0;
    client.query('select * from t_user',function(err,results,fields){
        if (err) {
            throw err;
        }
        if(results){
            for(i; i < results.length; i++){
                if(results[i].tel==tel){
                    res.render('zhuce',{message:'此用户已注册！'});
                    break;
                }
            }
            if(i==results.length){
                var id='';
                var a=[req.body.usertel,req.body.userpassword,req.body.name,req.body.email];
                client.query('insert into t_user set tel=?,passwd=?,uname=?,email=?',a);
                client.query('select * from t_user',function(err,results){
                    if (err) {
                        throw err;
                    }
                    if(results){
                        for(var m=0;m<results.length;m++){
                            if(results[m].tel==req.body.usertel){
                                id=results[m].id;
                                break;
                            }
                        }
                    }
                });
                client.query('select * from t_user_additional',function(err,results,fields){
                    if (err) {
                        throw err;
                    }
                    if(results){
                        var b=[id,req.body.name];
                        client.query('insert into t_user_additional set id=?,name=?',b);
                    }

                });
                res.redirect('/denglu');
            }
        }
    });
});