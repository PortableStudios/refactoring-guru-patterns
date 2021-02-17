import LocalNews from '../models/LocalNews'

import { singleLineBreak } from '../helpers/formatting'

const heading = (str: string): string => {
  return [ str, "=".repeat(str.length) ].join(singleLineBreak)
}

const formatDate = (date: Date): string => {
  return date.toLocaleString()
}

// TODO: Implement the adapter pattern so that:
// * this view function only has to receive a LocalNews type in the parameters
// * the if/else statement in the view function is removed
// * change all upstream type signatures to reflect the change
// * create an adapter to turn InternationalNews into LocalNews
// * plug that adapter into the appropriate place
const view = (newsItem: LocalNews ): string => {
    const { headline, published_at, tagline } = newsItem
    return [ heading(headline), tagline, formatDate(published_at) ].join(singleLineBreak)
}

export default view
