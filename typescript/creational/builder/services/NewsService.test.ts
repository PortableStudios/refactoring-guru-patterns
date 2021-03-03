import {NewsService} from "./NewsService";

describe("Test New Service", () => {
    const newsService = new NewsService()
    it("Returns all news", () => {
        expect(newsService.allNews().length).toEqual(10)
    })
    it("Returns news category", () => {
        expect(newsService.latestByCategory("Sports").length).toEqual(2)
    })
    it("Returns news search", () => {
        expect(newsService.search("Deep Dive").length).toEqual(1)
    })
})
