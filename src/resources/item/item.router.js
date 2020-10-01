import { Router } from 'express'

const router = Router()
const testController = (res, req) => {
  res.send({ dummy: "Data." })
};

//  This is /api/item
router
  .route('/')
  .get(testController)
  .post(testController)

//  This is /api/item/:id
router
  .route('/:id')
  .put(testController)
  .delete(testController)
  .get(testController)

export default router
