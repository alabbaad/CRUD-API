const user = require("../model/auth.model")

const bcrypt = require('bcryptjs')
const saltRounds = 5

//create a new user and add to the database
exports.signup = (req, res)=>{
        if (req.body) {
        //const {fname, lname, email, phone, pass} = req.body
        
          bcrypt.hash(req.body.pass, saltRounds, (err, hash) => {
            if (err) {
              console.error(err)
            }
            // use the index of the password value to pass to bcrypt
            // Store hash in your password DB.
            req.body.pass = hash // replace plain text password with hash
            // console.log(userData)

            user.create(req.body, (error, results)=>{
                res.status(200).json({ 
                    message: "User created",
                    user: results })
            })
            
          })
        } else {
          res.status(400).send("Error")
        }
}

//use passport to login into the application
exports.login = (req, res, next)=>{
    const {email, pass} = req.body

    if (!req.body){
        res.status(400).send({
            message: "body cannot be empty"
        })
    } else if (!email){
        res.status(400).send({
            message: "email missing, please include email."
        }) 
    } else if (!pass){
        res.status(400).send({
            message: "passwaord missing, please include password"
        })
    } else {
        user.login(req.body, (error, results) =>{
            res.status(200).send({
                data: "Login successful",
                //message: `${user.login.result} found`
                message: results
            })
            res.send(results[0])
        })

     
    }
}


exports.trial = (req, res, next)=>{
    res.send("not authenticated")
}