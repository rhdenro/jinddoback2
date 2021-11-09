var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10; //Hashing Rounds

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

/* userinfo get */
router.get('/users/userinfo', function (req, res, next) {

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
    pool.query('SELECT * FROM seats WHERE seat_code="1JA1"', function(err, result, fields){
        if(err) throw err;
        console.log('load successful');
        res.json(result);
    })
});

module.exports = router;
