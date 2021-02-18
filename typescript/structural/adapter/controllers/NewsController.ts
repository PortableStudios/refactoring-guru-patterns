import LocalNews from '../models/LocalNews'
import InternationalNews from '../services/InternationalNews'
import renderNewsItems from '../views/newsItems'
import { render } from '../helpers/rendering'
import ViewableNews from '../interface/ViewableNews'

class InternationalNewsAdapter implements ViewableNews {
  constructor(private news: InternationalNews) {}
  get headline(): string { return this.news.title }
  get published_at(): Date { return this.news.date }
  get tagline(): string { return this.news.description }
}

function adaptTheNews(internationalNews: InternationalNews): ViewableNews {
  return new InternationalNewsAdapter(internationalNews);
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
