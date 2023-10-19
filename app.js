const express = require("express")
const app = express()

const taskRoutes = require('./routes/taskRoutes')

const connectDB = require("./db/connect")
require('dotenv').config()

app.use(express.json())

app.use('/api/v1/tasks', taskRoutes)


const port = 3000

const start = async()=>{
    try {
        // eslint-disable-next-line no-undef
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()