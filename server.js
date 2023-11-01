const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const authRouter = require("./app/router/auth.router.js")
const customerRouter = require("./app/router/customer.router.js")

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const port =  process.env.PORT || 8080;


app.use('/customers', customerRouter);
app.use('/auth', authRouter);

app.get('/', (req, res)=>{
    res.send("###Welcome to the user API####")
})

app.get('/login', (req, res)=>{
    res.send("Provide login detail")
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})