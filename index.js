require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoDB = require("./db")

const authroutes = require('./routes/auth')
const blogroutes = require('./routes/blog')


const app = express();
app.use(cors())
app.use(express.json())
mongoDB();



app.listen(process.env.PORT, () => {
    console.log("running on 4000")
})

app.use('/api/auth/', authroutes)
app.use('/api/blog/', blogroutes)
