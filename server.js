const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const user = require("./app/model/auth.model")

//Import passport and passport session
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//Initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport and configure the strategy
app.use(passport.initialize());


passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Customize this based on your form field
    passwordField: 'password', // Customize this based on your form field
  },
  async (email, password, done) => {
    try {
      // Retrieve the user with the provided email from your database
      const user = await User.findOne({ email: email });

      if (!user) {
        // If the user doesn't exist, return a failure message
        return done(null, false, { message: 'Incorrect email.' });
      }

      // Check if the password matches the hashed password stored in the database
      const passwordMatches = await user.comparePassword(password);

      if (!passwordMatches) {
        // If the password doesn't match, return a failure message
        return done(null, false, { message: 'Incorrect password.' });
      }

      // If both email and password are valid, return the user object
      return done(null, user);
    } catch (error) {
      // Handle any errors that occur during the validation process
      return done(error);
    }
  }
));




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
    res.send("###Welcome to my user API####")
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})