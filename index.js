const express = require('express')
require('./config/db-config')
const { userRouter } = require('./route')

const app = express()

const port = process.env.PORT || 8000

app.use(express.json())
app.use(userRouter)



const User = require('./model/users')

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})