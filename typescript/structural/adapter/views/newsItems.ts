import LocalNews from '../models/LocalNews'

import renderNewsItem from './newsItem'
import { doubleLineBreak } from '../helpers/formatting'

const view = (newsItems: (LocalNews)[]): string => {
  return newsItems.map(renderNewsItem).join(doubleLineBreak)
}

export default view
