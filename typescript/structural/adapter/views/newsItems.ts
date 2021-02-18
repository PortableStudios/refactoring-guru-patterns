import renderNewsItem from './newsItem'
import { doubleLineBreak } from '../helpers/formatting'
import ViewableNews from '../interface/ViewableNews'

const view = (newsItems: (ViewableNews)[]): string => {
  return newsItems.map(renderNewsItem).join(doubleLineBreak)
}

export default view
