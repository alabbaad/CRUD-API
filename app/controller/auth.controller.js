const user = require("../model/auth.model")



//create a new user and add to the database
exports.signup = (req, res)=>{
    const {fname, lname, email, phone, pass} = req.body

    console.log
    if (!req.body){
        res.status(400).send({
            message: "Fields cannot be empty"
        })
    }else if (!req.body.phone){
        res.status(400).send({
            message: "phone field is missing"
    })
}else if (!req.body.fname){
        res.status(400).send({
            message: "First name field is missing"
    })
}else if (!req.body.lname){
    res.status(400).send({
        message: "Last name field is missing"
    });
} else if (!req.body.email){
    res.status(400).send({
        message: "Email field is missing"
      });
} else if (!req.body.pass){
    res.status(400).send({
        message: "Password missing"
    })
} else {
    user.create(req.body)

    res.status(200).send({
        message: "Registration successful!!",
        data: req.body
    })
    console.log("Registration successful");
}
}

//use passport to login into the application
exports.login = (req, res, next)=>{
    const {email, pass} = req.body

    if (!req.body){
        res.status(400).send({
            message: "body cannot be empty"
        })
    } else if (!req.body.email){
        res.status(400).send({
            message: "email missing, please include email."
        }) 
    } else if (!req.body.pass){
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