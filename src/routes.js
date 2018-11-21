import { Router } from 'express'
const restApi = Router({ mergeParams: true })
restApi
  .route('/user')
  .get()
  .put()

restApi
  .route('/task')
  .get()
  .post()

restApi
  .route('/task/:id')
  .get()
  .put()
  .delete()
export default restApi
