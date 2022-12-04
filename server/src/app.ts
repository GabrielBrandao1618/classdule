import 'express-async-errors'

import express from 'express'

import cookieParser from 'cookie-parser'
import cors from 'cors'

import { mainRoutes } from './routes/main.routes'
import { authRoutes } from './routes/auth.routes'
import { userRoutes } from './routes/user.routes'
import { academiesRoutes } from './routes/academies.routes'
import { classroomRoutes } from './routes/classroom.routes'

export function createServer(){
    const App = express()

    App.use(
        express.json(),
        express.raw(),
        cookieParser(),
        cors(),
        mainRoutes,
        authRoutes,
        userRoutes,
        academiesRoutes,
        classroomRoutes
    )
    return App
}
