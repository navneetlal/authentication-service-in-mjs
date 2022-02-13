//@ts-check

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import ability from './abilities/index.mjs'
import { AuthService } from './controller/index.mjs'

import './dbContext/mongo.mjs'

const app = express()

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: false }))

app.use(helmet())
app.use(cors())

app.use('/api', AuthService)

app.get('/:role', (req, res) => {
    const role = req.params.role
    const access = ability[role].can('create', 'post')
    console.log(access)
    res.status(200).send(access)
})


app.listen(3000, () => console.log('App listening at port 3000'))