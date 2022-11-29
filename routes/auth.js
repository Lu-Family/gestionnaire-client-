var passport = require('passport');
const User = require('../models/user');
const router = require('express').Router();




router.get('/login', function(req, res) {
  res.render('login', {user: req.user, message: req.flash('error')});
});

router.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  
  }))


router.get('/register', function(req, res) {
    res.render('register', {});
  });
  


  router.post('/register', function(req, res, next) {
    console.log('registering user');
    User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, function(err) {
      if (err) {
        console.log('error while user register!', err);
        return next(err);
      }
  
      console.log('user registered!');
      console.log(new User);
      console.log(req.body);
  
      res.redirect('/');
    });
  });
  
  
  router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
 


module.exports = router;