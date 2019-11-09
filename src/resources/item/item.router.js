import { Router } from 'express'

//mock controller
const controller = (req, res, next) => {
  res.send({ message: 'hello' })
}

const router = Router()

// /api/otem
router
  .route('/')
  .get(controller)
  .post(controller)

// /api/item
router
  .route('/:id')
  .get(controller)
  .put(controller)
  .delete(controller)

export default router
