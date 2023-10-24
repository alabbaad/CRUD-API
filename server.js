const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const customerRouter = require("./app/router/customer.router.js")

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const port =  process.env.PORT || 8080;


app.use('/customers', customerRouter)


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})