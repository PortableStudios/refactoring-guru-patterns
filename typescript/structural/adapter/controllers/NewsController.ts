import LocalNews from '../models/LocalNews'
import InternationalNews from '../services/InternationalNews'
import renderNewsItems from '../views/newsItems'
import { render } from '../helpers/rendering'
import {InternationalNewsAdapter} from '../helpers/internaltionalNewsAdapter';

class NewsController {
  index() {
    render('Fetching articles...')
    const newsItems: (LocalNews)[] = []
    const localNewsItems = LocalNews.all()
    const internationalNewsItems = InternationalNews.all()

    
    // Use adapter to convert international news items to local new format
    const convertedInternationalNewsItems = internationalNewsItems.map((item) => {
      return new InternationalNewsAdapter(item).getNewsItem();
    })

    newsItems.push(...convertedInternationalNewsItems)
    newsItems.push(...localNewsItems)

    render('Rendering articles...')
    const view = renderNewsItems(newsItems)

    render(view)
  }
}

export default NewsController
