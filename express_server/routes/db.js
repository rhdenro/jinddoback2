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

/* login */
router.post('/login', function(req,resp,next){
    var sql = 'SELECT * FROM users WHERE student_no=?';
    var params = [req.body.userid];
    pool.query(sql,params, function(err,result,fields){
        if(err) resp.send('<script> alert("로그인 에러"); location.href="/login"</script>');
        else{
            if(result.length > 0){
                bcrypt.compare(req.body.userpassword, result[0].password, (err,res) => {
                    if(err) throw(err);
                    else if(res){
                        req.session.isLogined = true;
                        req.session.userid = result[0].student_no;
                        req.session.name = result[0].name;
                        req.session.save(function(){
                            resp.redirect('/')
                        })
                    }
                    else{
                        resp.send('<script> alert("비밀번호가 일치하지 않습니다."); location.href="/login"</script>')
                    }
                })
            }
            else{
                resp.send('<script> alert("가입되지 않은 학번입니다."); location.href="/login"</script>');
            }
        }
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
