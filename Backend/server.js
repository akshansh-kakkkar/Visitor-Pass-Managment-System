import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import AuthRoute from './Routes/AuthRoute.js'
import cors from "cors"
import ProtectedRoutes from './Routes/ProtectedRoutes.js'
import AdminRoutes from './Routes/Adminoutes.js'
dotenv.config()
const app = express()
const Port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/auth',AuthRoute )
app.use('/api/test', ProtectedRoutes)
app.use('/api/register', AdminRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('mongodb database is connected')
}).catch((err)=>{
    console.log(err)
})


app.listen(Port, ()=>{
    console.log(`app is listening at http://localhost:${Port}`)
})