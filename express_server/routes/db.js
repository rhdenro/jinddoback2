var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10; //Hashing Rounds
const request = require('request');
var API_Call = require('../public/javascripts/API_Call');
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
         } else{
             res.send('<script> alert("Register Success"); location.href="/" </script>');
         }
     });
 })
});

/* login */
router.post('/login', function(req,resp,next){
    var sql = 'SELECT * FROM users WHERE student_no=?';
    var params = [req.body.userid];
    pool.query(sql,params, function(err,result,fields){
        if(err) resp.send('<script> alert("로그인 에러"); location.href="/localhost/login"</script>');
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

//recommendation Server 통신
router.post('/recommendation', function(req,res){
    if(req.body.isPreference){
        API_Call.recommendation_preference(req.session.userid, req.body.isPreference, req.body.person, req.body.isEdge, function(err, result){
            if(!err){
                res.json(result);
            } else{
                res.json(err);
            }
        });
    }
    else{
        API_Call.recommendation(req.sesion.userid, req.body.isPc, req.body.isConcent, req.body.isEdge, function(err, result){
            if(!err){
                res.json(result);
            } else{
                res.json(err);
            }
        })
    }
});

module.exports = router;
