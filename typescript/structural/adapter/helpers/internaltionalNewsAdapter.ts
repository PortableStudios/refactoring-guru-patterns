import InternationalNews from '../services/InternationalNews';
import LocalNews from '../models/LocalNews';

export class InternationalNewsAdapter {
  readonly headline
  readonly published_at
  readonly tagline

  constructor(internationalNews: InternationalNews) {
    this.headline = internationalNews.title
    this.published_at = internationalNews.date
    this.tagline = internationalNews.description
  }

  public getNewsItem(): LocalNews {
    const newLocalNewsItem = {
      headline: this.headline,
      published_at: this.published_at,
      tagline: this.tagline
    }
  
    return newLocalNewsItem;
  }
}
