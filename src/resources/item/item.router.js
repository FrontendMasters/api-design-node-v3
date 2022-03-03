import { Router } from 'express'

const controllers = (req, res) => {
  res.send({ message: 'hello' })
}

const router = Router()

//  /api/item
router
  .route('/')
  .get(controllers)
  .post(controllers)

//  /api/item/:id
router
  .route('/:id')
  .get(controllers)
  .put(controllers)
  .delete(controllers)

export default router
