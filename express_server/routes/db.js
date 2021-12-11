var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10; //Hashing Rounds
const request = require('request');
const API_Call = require('../public/javascripts/API_Call');
const parseModule = require('../public/javascripts/Parse.js');

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
             next();
         }
     });
 })
});

router.post('/register', function (req, res) {
    let Date = new Date();
    var param = [req.body.student_no];
    var seat_no = ["1SA1", "1JA1", "2SA1", "3JA1", "4SA1"]
    setDefault(Date, seat_no, student_no)
        .then(result => {
            res.json({result: "success"});
        })
    function setDefault(Date, Array, student_no) {
        return new Promise(async function (resolve, reject) {
            const promises = Array.map((row) => query(Date, row, student_no));
            await Promise.all(promises)
                .then(responses => {
                    resolve(responses);
                })
        })
    }
    function query(Date, seat_no, student_no){
        return new Promise(function(resolve,reject){
            let params = [student_no, seat_no, Date, 2, 0]
            let sql = "INSERT INTO preference_table(reservation_user, seat_code, date, score) VALUES(?, ?, ?, ?);";
            pool.query(sql, params, function(err,result,fields){
                if(err){
                    reject(err);
                }
                else{
                    resolve("success");
                }
            })
        })
    }
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

//예약 기록 초기화
router.post('/seats/setDefaultValue', function(req,res,next){
    let sql = "UPDATE preference_table SET score=2 WHERE reservation_user=?";
    let params = [req.body.userid];
    pool.query(sql, params, function(err,result,fields){
        if(err){
            console.log(err);
            res.json({result: "예약 기록 초기화 실패"});
        }
        else{
            next();
        }
    })
})

router.post('/seats/setDefaultValue', function(req,res,next){
    let sql = "SELECT seat_code, DATE_FORMAT(date, '%Y-%m-%d') AS date, score FROM preference_table WHERE reservation_user=?";
    let params = [req.body.userid]
    pool.query(sql, params, function(err,result,fields){
        if(err){
            console.log(err);
            res.json({result: "후 조회 실패"});
        }
        else{
            parseModule.repeatPreferLog(result)
                .then(responses => {
                    res.send(responses);
                })
        }
    })
})
//예약 기록 얻어오기
router.post('/users/getMyPrefer', function(req,res,next){
    let sql = "SELECT seat_code, DATE_FORMAT(date, '%Y-%m-%d') AS date, score FROM preference_table WHERE reservation_user=?";
    let params = [req.body.userid]
    pool.query(sql, params, function(err,result,fields){
        if(err){
            console.log(err);
            res.json({result: "후 조회 실패"});
        }
        else{
            parseModule.repeatPreferLog(result)
                .then(responses => {
                    res.send(responses);
                })
        }
    })
})
// 좌석코드 파싱
router.post('/seats/getSeats', function(req,res,next){
    pool.query('SELECT seat_code from preference_table WHERE reservation_user = ?', req.body.userId, function(err,result,fields){
        if(err){
            res.json({ result: "fail"});
        }
        else{
            console.log(result);
            repeat(result)
                .then(result => res.send(result));
        }
    });
    function parse(seat_code){
        return new Promise(function (resolve,reject){
            let result = new Object();
            result.floor = "";
            result.form  = "";
            result.sector = "";
            result.sectorNum = "";
            //층수 파싱
            switch (seat_code[0]){
                case '1':
                    result.floor = "1층";
                    break;
                case '2':
                    result.floor = "2층";
                    break;
                case '3':
                    result.floor = "3층";
                    break;
                case '4':
                    result.floor = "4층";
                    break;
            };
            //좌석 형태 파싱
            switch (seat_code[1]){
                case 'S':
                    result.form = "스마트";
                    break;
                case 'J':
                    result.form = "조망형";
                    break;
                case 'P':
                    result.form = "PC룸";
                    break;
                case 'N':
                    result.form = "노트북 전용";
                    break;
            };
            //섹터 파싱
            switch(seat_code[2]){
                case 'A':
                    result.sector = "A섹터";
                    break;
                case 'B':
                    result.sector = "B섹터";
                    break;
                case 'C':
                    result.sector = "C섹터";
                    break;
            };
            //좌석번호 파싱
            if(seat_code[4]){
                result.sectorNum = ((seat_code[3] - '0') * 10) + (seat_code[4] - '0');
            }
            else{
                result.sectorNum = seat_code[3] - '0';
            }
            resolve(result);
        })
    }
    function repeat(Array){
        return new Promise(async function(resolve,reject){
            const promises = Array.map((row) => parse(row.seat_code));
            await Promise.all(promises)
                .then(responses => {
                    resolve(responses);
                })
        })
    }
})

/* 예약 갱신 -> 초기 3회 예약 판별*/
router.post('/seats/reservation_con', function(req,res,next){
    pool.query('SELECT count FROM reservation_log WHERE available = 1 AND reservation_user=?', req.body.userid, function(err,rows,fields){
        if(rows[0].count == 2){
            res.json({ result: "예약 가능 횟수 초과"})
        }
        else{
            next();
        }
    })
})

router.post('/seats/reservation_con', function(req,res,next){
    //예약 횟수 추가
    pool.query('UPDATE reservation_log SET count = count + 1 WHERE available=1 AND reservation_user=?', req.body.userid, function(err,rows,fields){
        if(err){
            res.json({result: "쿼리문 오류"})
        }
        else{
            next();
        }
    })
})

router.post('/seats/reservation_con', function(req,res,next){
    //시간 연장
    pool.query('UPDATE reservation_log SET end_time = DATE_ADD(end_time, INTERVAL 2 HOUR) WHERE available=1 AND reservation_user=?', req.body.userid, function(err,rows,fields){
        if(err){
            res.json({result: "쿼리문 오류"});
        }
        else{
            res.json({result: "연장 성공"});
        }
    })
})

//예약 중복확인
router.post('/reservation', async function(req,res,next){
    req.seat_code = req.body.seat_code.split(',');
    if(req.seat_code.length != 1){
        repeatQuery2(req.seat_code)
            .then(result => {
                next();
            })
            .catch(result => {
                res.json({result: "이미 예약중인 좌석입니다."});
            })
    } else {
        let params = [req.seat_code[0]]
        let sql = "SELECT COUNT(*) AS count FROM reservation_log WHERE seat_code = ? AND available=true";
        pool.query(sql, params, function (err, result, fields) {
            if (result[0].count) {
                console.error(err);
                res.json({result: "이미 예약중인 좌석입니다."});
            } else {
                next();
            }
        })
    }
    function repeatQuery2(Array) {
        return new Promise(async function (resolve, reject) {
            const promises = Array.map((row) => query2(row));
            await Promise.all(promises)
                .then(responses => {
                    resolve(responses);
                })
                .catch(error => {
                    reject(error);
                })
        })
    };
    function query2(seat_code){
        return new Promise(function(resolve,reject) {
            let params = [seat_code]
            let sql = "SELECT COUNT(*) AS count FROM reservation_log WHERE seat_code = ? AND available=true";
            pool.query(sql, params, function (err, result, fields) {
                if (result[0].count) {
                    reject("중복된 예약이 있습니다.")
                } else {
                    resolve("중복 없음");
                }
            })
        });
    }
});

// create Reservation
router.post('/reservation', function(req,res,next){
    let now = new Date();
    let end = new Date();
    end.setMinutes(end.getMinutes() +30);
    req.seat_code = req.body.seat_code.split(',');
    if(req.seat_code.length != 1){
        repeatQuery(req.seat_code, req.body.userid, now, end)
            .then(result => {
                next();
            }).catch((err)=>{
                console.error(err);
        })
    } else {
        let params = [req.body.userid, req.body.seat_code, now, end, 0]
        let sql = "Insert INTO reservation_log(reservation_user, seat_code, start_time, end_time, count) VALUES(?,?,?,?,?)";
        pool.query(sql, params, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.json({result: "예약 실패"});
            } else {
                next();
            }
        })
    }
    function repeatQuery(Array, userid, now, end) {
        return new Promise(async function (resolve, reject) {
            const promises = Array.map((row) => query(row, userid, now, end));
            await Promise.all(promises)
                .then(responses => {
                    resolve(responses);
                })
                .catch(error => {
                    reject(error);
                })
        })
    };
    function query(seat_code,userid, now, end){
        return new Promise(function(resolve,reject) {
            let params = [userid, seat_code, now, end, 0]
            let sql = "Insert INTO reservation_log(reservation_user, seat_code, start_time, end_time, count) VALUES(?,?,?,?,?)";
            pool.query(sql, params, function (err, result, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve("success")
                }
            })
        });
    }
});

//좌석 비활성화
router.post('/reservation', function(req,res){
    if(req.seat_code.length != 1){
        repeatQuery1(req.seat_code)
            .then(result => {
                res.json({result: "success"});
            }).catch((err)=>{
            res.json({result: "fail"});
        })
    } else {
        let sql = "UPDATE seats SET seat_available=false WHERE seat_code=?";
        let params = [req.body.seat_code]
        pool.query(sql, params, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.json({result: "예약 실패"});
            } else {
                res.json({result: "success"});
            }
        })
    }
    function repeatQuery1(Array) {
        return new Promise(async function (resolve, reject) {
            const promises = Array.map((row) => query1(row));
            await Promise.all(promises)
                .then(responses => {
                    resolve(responses);
                })
                .catch(error => {
                    reject(error);
                })
        })
    };
    function query1(seat_code){
        return new Promise(function(resolve,reject) {
            let sql = "UPDATE seats SET seat_available=false WHERE seat_code=?";
            let params = [seat_code]
            pool.query(sql, params, function (err, result, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve("success");
                }
            })
        });
    }
});

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
    console.log(req.body);
    if(req.body.isPreference){
        API_Call().recommendation_preference(req.body.userid, req.body.isPreference, req.body.text, req.preferInfo, function(err, result){
            if(!err){
                parseModule.repeatPrefer(result)
                    .then((result) => res.json({result: result, text:req.body.text}));
            } else{
                res.send(result);
            }
        });
    }
    else{
        API_Call().recommendation(req.body.userid, req.body.isPc, req.body.isConcent, req.body.isEdge, req.preferInfo, req.body.isPreference, function(err, result){
            if(!err){
                parseModule.repeatNonPrefer(result)
                    .then(result => res.send(result));
            } else{
                res.json(result);
            }
        })
    }
});

//예약 종료
router.post('/seats/reservation_fin', function(req,res,next){
    //시작 시간, 종료 시간, 좌석 코드 얻어오기
    let sql = "SELECT start_time, date_format(end_time, '%Y-%m-%d %H:%i:%S') AS end_time , seat_code FROM reservation_log WHERE reservation_user=? AND available = true;"
    let params = [req.body.userid]
    pool.query(sql, params, function(err, result, fields){
        if(err){
            console.error(err);
            res.json({result: "fail"});
        }
        else{
            req.timeSeatInfo = result[0];
            next();
        }
    });
})

router.post('/seats/reservation_fin', function(req,res,next){
    //예약기록에서 예약기록 비활성화
    let sql = "UPDATE reservation_log SET available=false WHERE reservation_user=? AND available=true;"
    pool.query(sql, req.body.userid, function(err,result,fields){
        if(err){
            console.error(err);
            res.json({result: "fail"})
        }
        else{
            next();
        }
    })
});

router.post('/seats/reservation_fin', function(req,res,next) {
    //좌석 재활성화
    let sql = "UPDATE seats SET seat_available=true WHERE seat_code=?"
    let params = [req.timeSeatInfo.seat_code]
    pool.query(sql, params, function(err,result,fields){
        if(err){
            console.error(err);
            res.json({result:"fail"})
        }
        else{
            next();
        }
    })

});
router.post('/seats/reservation_fin', function(req,res,){
    //선호좌석 사용여부에 따른 분기점
    console.log(req.body.rating);
    if(!(req.body.isPrefer)){
        //Django 통신
        API_Call().reservation(req.body.userid, req.timeSeatInfo.seat_code, req.body.rating, req.timeSeatInfo.end_time,function(err, result){
            if(!err){
                res.json(result);
            } else{
                console.log(result);
                res.send(result);
            }
        })
    }
    else{
        res.json({result:"success"})
    }
});

module.exports = router;
