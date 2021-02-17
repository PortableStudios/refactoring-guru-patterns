import LocalNews from '../models/LocalNews'
import InternationalNews from '../services/InternationalNews'

import renderNewsItem from './newsItem'
import { doubleLineBreak } from '../helpers/formatting'

const view = (newsItems: (LocalNews | InternationalNews)[]): string => {
  return newsItems.map(renderNewsItem).join(doubleLineBreak)
}

export default view
