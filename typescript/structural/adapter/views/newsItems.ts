import { GenericNews } from '../controllers/NewsController'; 

import renderNewsItem from './newsItem'
import { doubleLineBreak } from '../helpers/formatting'

const view = (newsItems: GenericNews[]): string => {
  return newsItems.map(renderNewsItem).join(doubleLineBreak)
}

export default view
