//@ts-check

import { Router } from 'express'
import mongoose from '../dbContext/mongo.mjs'
import User from '../models/user.mjs'

import UserSecrets from '../models/userSecrets.mjs'
import { hashPassword, verifyPassword } from '../services/auth.mjs'
import { sign } from '../services/token.mjs'

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email && !password) return res.status(400).send({ status: false, message: 'Email or password not provided' })
        const hash = await hashPassword(password)
        const session = await mongoose.startSession()
        await session.withTransaction(async () => {
            await UserSecrets.create({
                email,
                password: hash
            })
            await User.create({
                email
            })
        })
        return res.status(201).send({ status: true, message: 'User registered' })
    } catch (error) {
        // MongoServerError -> Duplicate Key
        if (error.code === 11000) {
            return res.status(409).send({ status: false, message: 'EmailId already in use' })
        } else return res.status(500).send({ status: false, message: 'Internal server error' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await UserSecrets.findOne({ email })
    if (!user) return res.status(404).send({ status: false, message: 'Invalid email or password' })
    const isValid = await verifyPassword(user.password, password)
    if (isValid) {
        const userDetail = await User.findOne({ email })
        const token = await sign(userDetail)
        return res.status(200).send({ status: true, message: 'Login successful', result: { token } })
    } else {
        return res.status(401).send({ status: false, message: 'Invalid email or password' })
    }
})

export default router