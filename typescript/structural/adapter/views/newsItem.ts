import LocalNews from '../models/LocalNews'

import { singleLineBreak } from '../helpers/formatting'

const heading = (str: string): string => {
  return [ str, "=".repeat(str.length) ].join(singleLineBreak)
}

const date = (date: Date): string => {
  return date.toLocaleString()
}

const view = (newsItem: LocalNews): string => {
  const { headline, published_at, tagline } = newsItem

  return [ heading(headline), tagline, date(published_at) ].join(singleLineBreak)
}

export default view
