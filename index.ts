import express from 'express'

import {mainRoutes} from './src/routes/main.routes'

const App = express()

App.use(express.json())
App.use(mainRoutes)

const PORT = process.env.PORT || 3000

App.listen(PORT, ()=> {
    console.log(`App running on http://localhost:${PORT}`)
})

console.log('Hello world')