//@ts-check

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import ability from './abilities/index.mjs'
import { AuthService, DashboardService } from './controller/index.mjs'

import './dbContext/mongo.mjs'
import auth from './middlewares/auth.mjs'

const app = express()

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: false }))

app.use(helmet())
app.use(cors())

app.use('/', AuthService)

app.use('/api', auth)
app.use('/api/dashboard', DashboardService)

app.listen(3000, () => console.log('App listening at port 3000'))