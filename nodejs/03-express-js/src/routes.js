import { Router } from 'express'
import ContactController from './app/controllers/ContactController.js'

const router = Router()

router.get('/contacts', ContactController.index)


export default router
