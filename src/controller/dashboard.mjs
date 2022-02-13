//@ts-check

import { Router } from 'express'
import ability from '../abilities/index.mjs'

const router = Router()

router.get('/', async (req, res) => {
    const role = res.locals.isAdmin ? 'admin' : 'student'
    const access = ability[role].can('create', 'dashboard')
    res.status(200).send(access)
})


export default router