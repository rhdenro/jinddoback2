var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var mysql = require('mysql2');
/* register */
router.post('/users/register', function (req, res, next){

});

/* userinfo get */
router.get('/users/userinfo', function (req, res, next) {

});

/* seats state change */
router.get('/seats/change', function (req, res, next) {
    var connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASES
    });
    connection.connect();
    connection.query('UPDATE seats SET seat_available=0 WHERE seat_code="1SA1"', function(err,results,fields){
        if(err) throw err;
        console.log('update successful');
    })
    connection.end();
});

/* seats info get */
router.post('/seats/get', function (req, res, next) {
    var connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASES
    });
    connection.connect();
    connection.query('SELECT * FROM seats WHERE seat_code="1SA1"', function(err,results,fields){
        if(err) throw err;
        console.log(results);
        console.log('load successful');
    })
    connection.end();
});

module.exports = router;
