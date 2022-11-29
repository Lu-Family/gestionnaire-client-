const express = require('express')
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcrypt')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login');



/*
const initializePassport = require('../passport-config')

initializePassport(
  passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
*/




router.get('/',  connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render('index.ejs', { user: req.user })
  

})
 



module.exports = router












