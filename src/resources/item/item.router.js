import { Router } from 'express'
const controller = (req, res) => {
  res.send({ messagr: 'Hello' })
}

const router = Router()

router
  .route('/')
  .get(controller)
  .post(controller)

router
  .route('/:id')
  .get(controller)
  .put(controller)
  .delete(controller)

export default router
