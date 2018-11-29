import { crudControllers } from '../crud'
import { Coupon } from '../../models'

export default {
  ...crudControllers(Coupon)
}
