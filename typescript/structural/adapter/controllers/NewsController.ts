import LocalNews from '../models/LocalNews'
import renderNewsItems from '../views/newsItems'
import { render } from '../helpers/rendering'

class NewsController {
  index() {
    render('Fetching articles...')
    const newsItems = LocalNews.all()

    // TODO: Implement an adapter so that you can combine Local and International News
    //const internationalNewsItems = InternationalNews.all()
    //
    // FIXME The line below won't compile until you can create an adapter for internationalNewsItems
    //newsItems.push(internationalNewsItems)

    render('Rendering articles...')
    const view = renderNewsItems(newsItems)

    render(view)
  }
}

export default NewsController
