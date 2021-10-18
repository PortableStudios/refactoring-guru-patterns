import { shuffle } from "../helpers/arrays"

export class NewsService {
  private lastUpdated: Date
  private fakeNewsItems = [
    'Latest News Item 1',
    'Some other news items here',
    'Maybe something here',
    'and one more for luck!'
  ]

  constructor() {
    this.lastUpdated = new Date()
  }

  lastUpdatedAt() {
    return this.shouldUpdate() ? new Date() : this.lastUpdated
  }

  async latestNews(): Promise<string[]> {
    const latestNews = this.shouldUpdate() ? shuffle(this.fakeNewsItems) : this.fakeNewsItems
    await new Promise(resolve => setTimeout(resolve, 5000));
    return latestNews
  }

  private shouldUpdate(): boolean {
    const now = new Date()
    return now >= new Date(this.lastUpdated.getTime() + 11000)
  }
}