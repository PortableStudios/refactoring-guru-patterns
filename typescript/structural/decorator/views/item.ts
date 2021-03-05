import Coffee from '../models/Coffee'

import { singleLineBreak } from '../helpers/formatting'

const heading = (str: string): string => {
  return [ str, "=".repeat(str.length) ].join(singleLineBreak)
}

export default (coffee: Coffee): string => {
  return [ heading(coffee.description()), `$${coffee.cost()}` ].join(singleLineBreak)
}
