const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require("cookie-parser")
//Import the main Passport and Express-Session library
const passport = require('passport')

// define routes
const authRouter = require("./app/router/auth.router.js")
const customerRouter = require("./app/router/customer.router.js")

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//import cookie-parser
app.use("cookieParser")
app.use(express.json())

app.use(
  session({
    secret: "sanni",
    //store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 3600000 1 hour in milliseconds. The expiration time of the cookie to set it as a persistent cookie.
      sameSite: true
    }
  })
)

//initialize passport
app.use(passport.initialize()) 
// init passport on every route call.
app.use(passport.session())    
// allow passport to use "express-session".


const port =  process.env.PORT || 8080;




// Use imported routes
app.use('/customers', customerRouter);
app.use('/auth', authRouter);


app.get('/', (req, res)=>{
    res.send("###Welcome to my user API####")
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})