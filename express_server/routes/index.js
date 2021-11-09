var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Library seat Recommendation System'});
});

router.get('/register', function(req,res, next){
  res.render('register', { title: 'Library seat Recommendation System', subtitle: 'Register'})
});

module.exports = router;
