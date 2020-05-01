import { Router } from 'express'
import {getItem, createItem, updateItem, deleteItem} from './item.controllers'

const router = Router()

router.route('/item')
  .get(getItem)
  .post(createItem)

router.route('/item/:id')
  .get(getItem)
  .put(updateItem)
  .delete(deleteItem)

export default router