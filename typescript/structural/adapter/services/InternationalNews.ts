// Assume this class is resonsible for interacting with a 3rd party JSON API.
//
// Assume that the `InternationalNews.all` function retrieves all articles from
// the JSON API and returns them as an array of already deserialised Typescript
// objects.

import dataJSON from '../data/international-news.json'

interface InternationalNewsJson {
  title: string
  description: string
  date: string
}

class InternationalNews {
  readonly title
  readonly date
  readonly description

  constructor(title: string, date: Date, description: string) {
    this.title = title
    this.date = date
    this.description = description
  }

  static all(): InternationalNews[] {
    return dataJSON.map(this.deserialise)
  }

  static deserialise(jsonObject: InternationalNewsJson): InternationalNews {
    const { title, description, date } = jsonObject
    return new InternationalNews(title, new Date(date), description)
  }
}

export default InternationalNews
