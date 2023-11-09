const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require("cookie-parser")
const filestore = require("session-file-store")(session)

//Import the main Passport and Express-Session library
const passport = require('passport')



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
    saveUninitialized: false,
  })
)

//initialize passport
app.use(passport.initialize()) 
// init passport on every route call.
app.use(passport.session())    
// allow passport to use "express-session".


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