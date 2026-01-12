import express from 'express'
import {LoginUser} from '../Controllers/AuthController.js'
const router = express.Router()

router.post('/login', LoginUser);


export default router