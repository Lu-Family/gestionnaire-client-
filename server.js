if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
//const path = require("path")
//const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const User = require('./models/user');

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth');
const partnerRouter = require('./routes/partners')
const cookieParser = require('cookie-parser');
var flash = require('connect-flash');

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')


app.use(expressLayouts)
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended:true}))
//app.use(cors())




passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/partners', partnerRouter)



app.listen(process.env.PORT || 3000) 