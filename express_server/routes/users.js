var express = require('express');
var router = express.Router();
var dbRouter = require('./db.js');

router.use('/register', dbRouter);
router.use('/userinfo', dbRouter);

module.exports = router;