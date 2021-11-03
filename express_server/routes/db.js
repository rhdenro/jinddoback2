var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
export default(db_client) =>
{
    /* register */
    router.post('/users/register', function (req, res, next) {

    });

    /* userinfo get */
    router.get('/users/userinfo', function (req, res, next) {

    });

    /* seats state change */
    router.post('/seats/change', function (req, res, next) {

    });

    /* seats info get */
    router.get('/seats/get', function (req, res, next) {

    });
    return router;
}
