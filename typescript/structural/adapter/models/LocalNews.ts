// Assume this class is linked to your application database, which contains a
// list of local news items that a group of news curators are adding to.
//
// Assume that the `LocalNews.all` function retrieves all articles from the
// database and gives them back to you as an array of Typescript objects

import dataJSON from '../data/local-news.json'

interface LocalNewsJson {
  headline: string
  tagline: string
  publishedAt: string
}

class LocalNews {
  readonly headline
  readonly published_at
  readonly tagline

  constructor(headline: string, published_at: Date, tagline: string) {
    this.headline = headline
    this.published_at = published_at
    this.tagline = tagline
  }
  
  static all(): LocalNews[] {
    return dataJSON.map(this.deserialise)
  }

  static deserialise(jsonObject: LocalNewsJson): LocalNews {
    const { headline, tagline, publishedAt } = jsonObject
    return new LocalNews(headline, new Date(publishedAt), tagline)
  }
}

export default LocalNews
