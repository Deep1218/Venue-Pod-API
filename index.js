const express = require('express')
require('./config/db-config')
const { userRouter, venueRouter } = require('./route')

const app = express()

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

app.use(express.json())
app.use("/users", userRouter)
app.use("/", venueRouter)


const User = require('./model/users')
const Venue = require('./model/venue')