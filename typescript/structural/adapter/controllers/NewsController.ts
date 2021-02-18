import LocalNews from '../models/LocalNews'
import InternationalNews from '../services/InternationalNews'
import renderNewsItems from '../views/newsItems'
import { render } from '../helpers/rendering'

function adaptTheNews(internationalNews: InternationalNews) {
  return new LocalNews(internationalNews.title, internationalNews.date, internationalNews.description)
}

class NewsController {
  index() {
    render('Fetching articles...')
    const newsItems: (LocalNews)[] = []
    const localNewsItems = LocalNews.all()

    //Int News News
    // constructor(title: string, date: Date, description: string) {
    //Local News
    // constructor(headline: string, published_at: Date, tagline: string) {

    const internationalNewsItems = InternationalNews.all().map(adaptTheNews);

    newsItems.push(...internationalNewsItems)
    newsItems.push(...localNewsItems)

    render('Rendering articles...')
    const view = renderNewsItems(newsItems)

    render(view)
  }
}

export default NewsController
