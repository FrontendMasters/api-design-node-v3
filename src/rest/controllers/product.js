import { crudControllers } from '../crud'
import { Product } from '../../models'

export default {
  ...crudControllers(Product)
}
