import LocalNews from '../models/LocalNews'
import InternationalNews from '../services/InternationalNews'
import renderNewsItems from '../views/newsItems'
import { render } from '../helpers/rendering'

class NewsController {
  index() {
    render('Fetching articles...')
    const newsItems: (LocalNews | InternationalNews)[] = []
    const localNewsItems = LocalNews.all()
    const internationalNewsItems = InternationalNews.all()

    newsItems.push(...internationalNewsItems)
    newsItems.push(...localNewsItems)

    render('Rendering articles...')
    const view = renderNewsItems(newsItems)

    render(view)
  }
}

export default NewsController
