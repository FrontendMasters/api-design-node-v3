import { Router } from 'express'
import { errorHandler } from '../errors'
import user from './controllers/user'
import product from './controllers/product'
import coupon from './controllers/coupon'

const api = Router({ mergeParams: true })
/** user */
api.get('/user', user.getMe)
api.put('/user', user.updateMe)

/** product */
api
  .route('/product')
  .get(product.getMany)
  .post(product.createOne)

api
  .route('/product/:id')
  .get(product.getOne)
  .put(product.updateOne)
  .delete(product.removeOne)

/** coupon */
api
  .route('/coupon')
  .get(coupon.getMany)
  .post(coupon.createOne)

api
  .route('/coupon/:id')
  .get(coupon.getOne)
  .put(coupon.updateOne)
  .delete(coupon.removeOne)

api.use(errorHandler)

export default api
