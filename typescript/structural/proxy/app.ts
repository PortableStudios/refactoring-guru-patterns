import { NewsService } from "./services/NewsService"

export default class Application {
  async run() {
    // TODO: Replace this NewsService, with a ProxyNewsService that you will
    // create, that ensures that the other results are returned immediately if
    // the news hasn't changed. 
    // Hint: You will need to make use of the `lastUpdatedAt` function in the
    // real news service to help with this as it's response time is immediate.
    // Hint 2: You may also want to create an interface to make sure the public
    // interfaces are the same.
    const newsService = new NewsService
    const results1 = await newsService.latestNews()
    console.log(results1)
    const results2 = await newsService.latestNews()
    console.log(results2)
    const results3 = await newsService.latestNews()
    console.log(results3)
  }
}

