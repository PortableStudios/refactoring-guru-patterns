import LocalNews from "../models/LocalNews";
import InternationalNews from "../services/InternationalNews";
import renderNewsItems from "../views/newsItems";
import { render } from "../helpers/rendering";

export class GenericNews {
  constructor(
    public readonly headline: string,
    public readonly publishDate: Date,
    public readonly tagline: string
  ) {}
}

class LocalNewsAdapter extends GenericNews {
  constructor(adaptee: LocalNews) {
    super(adaptee.headline, adaptee.published_at, adaptee.tagline);
  }
}

class InternationalNewsAdapter extends GenericNews {
  constructor(adaptee: InternationalNews) {
    super(adaptee.title, adaptee.date, adaptee.description);
  }
}

class NewsController {
  index() {
    render("Fetching articles...");
    const newsItems: GenericNews[] = [];
    const localNewsItems = LocalNews.all();
    const internationalNewsItems = InternationalNews.all();

    newsItems.push(
      ...internationalNewsItems.map((i) => new InternationalNewsAdapter(i))
    );
    newsItems.push(...localNewsItems.map((i) => new LocalNewsAdapter(i)));

    render("Rendering articles...");
    const view = renderNewsItems(newsItems);

    render(view);
  }
}

export default NewsController;
