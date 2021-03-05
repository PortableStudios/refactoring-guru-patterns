import Order from '../models/Order'

import renderItem from './item'
import { doubleLineBreak } from '../helpers/formatting'

export default (order: Order): string => {
  return order.all().map(renderItem).join(doubleLineBreak)
}
