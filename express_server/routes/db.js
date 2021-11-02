const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();

/* register */
router.post('/users/register', function (req, res, next) {

});

/* userinfo get */
router.get('/users/userinfo', function (req, res, next) {
    var success_response={
        seat_no: "1SA1",
        seat_available: 0,
        pc_available: 0,
        concent_available: 0,
        preferperson_no: 0
    };
    var resStr = JSON.stringify(success_response);
    res.render('test', { seat_no: success_response.seat_no,
        seat_available: success_response.seat_available,
        pc_available: success_response.pc_available,
        concent_available: success_response.concent_available,
        preferperson_no: success_response.preferperson_no
    });
});

/* seats state change */
router.post('/seats/change', function (req, res, next) {

});

/* seats info get */
router.get('/seats/get', function (req, res, next) {

});
module.exports = router;

