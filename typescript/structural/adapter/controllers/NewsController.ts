import LocalNews from '../models/LocalNews'
import InternationalNews from '../services/InternationalNews'
import renderNewsItems from '../views/newsItems'
import { render } from '../helpers/rendering'

// TODO: use generic type in place of LocalNews everywhere
// type News = {
//   headline: string;
//   published_at: string;
//   tagline: string;
// }

type InternationalNewsAll = { all: () => InternationalNews[]}
class InternationalNewsAdapter {
  constructor(private service: InternationalNewsAll) {}

  all(): LocalNews[] {
    return this.service.all().map(n => new LocalNews(n.title, n.date, n.description));
  }
}
class NewsController {
  index() {
    render('Fetching articles...')
    const newsItems: LocalNews[] = []
    const localNewsItems = LocalNews.all()
    // Use our adapter
    const internationalNewsItems = (new InternationalNewsAdapter(InternationalNews)).all()

    newsItems.push(...internationalNewsItems)
    newsItems.push(...localNewsItems)

    render('Rendering articles...')
    const view = renderNewsItems(newsItems)

    render(view)
  }
}

export default NewsController
