var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('myinfo', { title: 'Library seat Recommendation System', session: req.session});
});

/* Register Page */
router.get('/register', function(req,res, next){
  res.render('register', { title: 'Library seat Recommendation System', subtitle: 'Register', session: req.session})
});

/* Login page */
router.get('/login', function(req,res,next){
  res.render('login', { title: 'Library seat Recommendation System', subtitle: 'Login', session: req.session})
});

/* recommendation page */
router.get('/recommendation', function(req,res,next){
  res.render('recommendation', { title: 'Library seat Recommendation System', subtitle: 'recommendation', session: req.session})
});

/* Logout function */
router.get('/logout', function(req,res,next){
  delete req.session.userid;
  delete req.session.name;
  delete req.session.isLogined;
  req.session.save(function(){
    res.send('<script> alert("로그아웃 완료"); location.href="/" </script>');
  })
})

module.exports = router;
