const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
  
// Use express-session to manage sessions
app.use(
    session({
      secret: 'test',
      resave: false,
      saveUninitialized: false,
    })
  );

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// define routes
const authRouter = require("./app/router/auth.router.js")
const customerRouter = require("./app/router/customer.router.js")

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const port =  process.env.PORT || 8080;




// Use imported routes
app.use('/customers', customerRouter);
app.use('/auth', authRouter);


app.get('/', (req, res)=>{
    res.send("###Welcome to the user API####")
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})