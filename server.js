const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require("cookie-parser")
const filestore = require("session-file-store")(session)
const passport = require('passport')
const User = require('./app/model/auth.model')
//Import passport strategy 
//const authStrategies = require('./app/configs/auth.config')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//import cookie-parser
app.use(cookieParser())
app.use(express.json())

//Create session
app.use(
  session({
    secret: "sanni",
    store: new filestore(),
    resave: false,
    saveUninitialized: false
  })
)

// authStrategies.Localauth
require('./app/configs/auth.config').Localauth

//initialize passport
app.use(passport.initialize()) 
// init passport on every route call.
app.use(passport.session())    
// allow passport to use "express-session".



passport.serializeUser((user, done) => {
  // Store user information in the session
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  // Retrieve user information from the session
  User.login(email, (err, user) => {
    done(err, user);
  });
});

// define routes
const authRouter = require("./app/router/auth.router.js")
const customerRouter = require("./app/router/customer.router.js")

// Use imported routes
app.use('/customers', customerRouter);
app.use('/auth', authRouter);


app.get('/', (req, res)=>{
    res.send("###Welcome to my user API####")
})


const port =  process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})