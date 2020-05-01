import { Router } from 'express'
import controllers from './item.controllers'

const router = Router()

router.route('/me')
.get(controllers.getItem)
.post(controllers.createItem)

router.route('/me/:id')
.get(controllers.getItem)
.put(controllers.updateItem)
.delete(controllers.deleteItem)

export default router