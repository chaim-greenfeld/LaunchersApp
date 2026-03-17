import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

import {initMongo, getMongoConn} from './src/config/db.js'
import launchersRouter from './src/routers/launchersRouter.js'
import authRouter from './src/routers/authRouter.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cors({ credentials: true}))
app.use(morgan("tiny"))
app.use(cookieParser())

app.use(async (req, res, next) => {
    try {
        req.mongoConn = await getMongoConn()
        next()
    }catch(err){
        next(err)
    }
})
// =============================

app.use('/api/launchers', launchersRouter)
app.use('/api/auth', authRouter)

// =============================

app.listen(PORT, async () => {
    await initMongo()
    console.log(`The server is running, PORT ${PORT}...`)
})