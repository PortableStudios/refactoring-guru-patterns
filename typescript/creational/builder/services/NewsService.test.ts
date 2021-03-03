import {NewsService} from "./NewsService";

describe("Test New Service", () => {
    const newsService = new NewsService()
    it("Returns all news", () => {
        expect(newsService.allNews().length).toEqual(10)
        console.log(newsService.allNews())
    })
    it("Returns news category", () => {
        expect(newsService.latestByCategory("Sports").length).toEqual(2)
        console.log(newsService.latestByCategory("Sports"))
    })
    it("Returns news search", () => {
        expect(newsService.search("Deep Dive").length).toEqual(1)
        console.log(newsService.search("Deep Dive"))
    })
})
