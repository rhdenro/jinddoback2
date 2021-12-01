var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10; //Hashing Rounds
const request = require('request');
const API_Call= require('../public/javascripts/API_Call');
//Pool 생성(For MySQL)
var pool = mysql.createPool({
    host: process.env.MySQL_URL,
    user: process.env.MySQL_ID,
    password: process.env.MySQL_PW,
    database: process.env.MySQL_DATABASES,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//암호화 모듈 이용 생성
/* register */
router.post('/register', function (req, res, next) {
 var param = [req.body.username, req.body.student_no, req.body.password];
 var sql = "INSERT INTO users VALUES (?,?,?)";
 bcrypt.hash(param[2], saltRounds, (error,hash) => {
     if(error) throw error
     param[2] = hash;
     pool.query(sql,param, function(err,rows,fields){
         if(err){
             console.error(err);
             res.json({
                 success: 0
             })
         } else{
             res.json({
                 success: 1
             });
         }
     });
 })
});

/* login */
router.post('/login', function(req,resp,next){
    var sql = 'SELECT * FROM users WHERE student_no=?';
    var params = [req.body.userid];
    pool.query(sql,params, function(err,result,fields){
        if(err) resp.json({success: 3});
        else{
            if(result.length > 0){
                bcrypt.compare(req.body.userpassword, result[0].password, (err,res) => {
                    if(err) throw(err);
                    else if(res){
                        resp.json({
                            success: 0,
                            isLoggedIn: true,
                            userId: result[0].student_no,
                            userName: result[0].name
                        })
                    }
                    else{
                        resp.json({success: 1})
                    }
                })
            }
            else{
                resp.json({success: 2})
            }
        }
    })
});

/* seats state change */
router.post('/seats/change', function (req, res, next) {
    var sql = 'UPDATE seats SET seat_available=0 WHERE seat_code=?'
    pool.query(sql,[req.body.seat_code], function(err, result, fields){
        if(err) throw(err)
        console.log('update successful');
        res.json(result);
    })
});

/* seats info get */
router.get('/seats/get', function (req, res, next) {
    pool.query('SELECT * FROM seats ORDER BY seat_code ', function(err, result, fields){
        if(err) throw err;
        console.log('load successful');
        res.json(result);
    })
});

/* 예약 갱신 -> 초기 3회 예약 판별*/
router.post('/seats/reservation_con', function(req,res,next){
    pool.query('SELECT count FROM reservation_log WHERE available = 1 AND seat_code=?', req.body.seat_code, function(err,rows,fields){
        if(rows[0] == 2){
            res.json({ result: "fail"})
        }
        else{
            next();
        }
    })
})

/* 예약 갱신 -> 예약횟수 추가 */
router.post('/seats/reservation_con', function(req,res,next){
    pool.query('UPDATE reservation_log SET count = count + 1 WHERE seat_code = ? AND available=1', req.body.seat_code, function(err, rows, fields){
       if(err){
           res.json({ result: "fail" });
       }
       else{
           res.json({ result: "success" });
       }
    });
})

/* 예약 취소 및 종료 */
router.post('/seats/reservation_can', function(req,res){
    pool.query('UPDATE reservation_log SET available=0 WHERE seat_code=? AND available=1', req.body.seat_code, function(err,rows,fields){
        if(err){
            res.json({ result: "fail" });
        }
        else{
            res.json({ result: "success"});
        }
    })
})

//recommendation Server 통신
//추천값 받아오기
router.post('/recommendation', function(req,res,next){
    let sql = "SELECT * FROM preference_table WHERE reservation_user=?";
    let param = [req.body.userid];
    pool.query(sql, param, function(err, rows, fields){
        if(err) throw err;
        else{
            req.preferInfo = rows;
            next();
        }
    })
});

router.post('/recommendation', function(req,res){
    if(req.body.isPreference){
        API_Call().recommendation_preference(req.body.userid, req.body.isPreference, req.body.person, req.body.isEdge, req.preferInfo, function(err, result){
            if(!err){
                console.log(result[0]);
                res.send(result);
            } else{
                res.send(result);
            }
        });
    }
    else{
        API_Call().recommendation(req.body.userid, req.body.isPc, req.body.isConcent, req.body.isEdge, req.preferInfo, function(err, result){
            if(!err){
                res.json(result);
            } else{
                res.send(result);
            }
        })
    }
});

module.exports = router;
