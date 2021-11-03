var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var mysql = require('mysql2');

/* register */
router.post('/users/register', function (req, res, next) {

});

/* userinfo get */
router.get('/users/userinfo', function (req, res, next) {

});

/* seats state change */
router.post('/seats/change', function (req, res, next) {
    var seatinfo="";
    var connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASES
    });
    connection.connect();
    var sql = 'UPDATE seats SET seat_available=0 WHERE seat_code=?'
    connection.query(sql,[req.body.seat_code], function(err, result, fields){
        if(err) throw(err)
        console.log('update successful');
        res.json(result);
    })
});

/* seats info get */
router.get('/seats/get', function (req, res, next) {
    console.log(process.env.MYSQL_TABLES);
    var connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASES
    });
    connection.connect();
    connection.query('SELECT * FROM seats WHERE seat_code="1JA1"', function(err, result, fields){
        if(err) throw err;
        console.log('load successful');
        res.json(result);
    })
    connection.end();
});

module.exports = router;
