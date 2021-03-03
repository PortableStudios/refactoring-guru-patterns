import {Filter, isCategoryMatch, isDateMatch, isTitleMatch, numCompare, SortNews} from "./NewsAPI";
import {NewsRequestFilterCategory, NewsRequestFilterTitle} from "../models/NewsRequest";

describe("Num Compare", () => {
    it("Return numbers between -1 and 1", () => {
        expect(numCompare(1, 5)).toEqual(-1)
        expect(numCompare(5, 1)).toEqual(1)
    })
})

describe('API Filters', () => {

    const titleTestItem = {title:"Test", date:"", category:""}
    const titleTestFilter: NewsRequestFilterTitle = {field: "title", fieldType: "match", filterValue: 'Test'};

    const categoryTitleTestItem = {title:"Test", date:"", category:"test"}
    const categoryTestFilter: NewsRequestFilterCategory = {field: "category", fieldType: "inSet", filterValue: ['test']};

    it("Matches Titles", () => {
        expect(isTitleMatch(titleTestItem, titleTestFilter)).toEqual(true)
        expect(isTitleMatch({...titleTestItem,title:"Something else"}, titleTestFilter)).toEqual(false)
    })
    it("True if not correct Filter", () => {
        expect(isDateMatch(titleTestItem, titleTestFilter)).toEqual(true)
        expect(isCategoryMatch(titleTestItem, titleTestFilter)).toEqual(true)
    })
    it("True if Filters tests are combined", () => {
        expect(isDateMatch(titleTestItem, titleTestFilter)
        && isCategoryMatch(titleTestItem, titleTestFilter)
        && isTitleMatch(titleTestItem, titleTestFilter)).toEqual(true)
    })

    it("Matches on no filters", () => {
        expect(Filter([], titleTestItem)).toEqual(true)
    })

    it("Matches 1 filter", () => {
        expect(Filter([titleTestFilter], titleTestItem)).toEqual(true)
    })
    it("Matches 2 filter", () => {
        expect(Filter([titleTestFilter, categoryTestFilter], categoryTitleTestItem)).toEqual(true)
    })
})

describe("API Sort", () => {
    const aa1 = {title: "A something", category: "A category", date: "2020-01-01T00:00:00.000Z"}
    const ba1 = {title: "B something", category: "A category", date: "2020-01-01T00:00:00.000Z"}
    const ab1 = {title: "A something", category: "B category", date: "2020-01-01T00:00:00.000Z"}
    const bb1 = {title: "B something", category: "B category", date: "2020-01-01T00:00:00.000Z"}
    const bb2 = {title: "B something", category: "B category", date: "2020-02-01T00:00:00.000Z"}
    const bb3 = {title: "B something", category: "B category", date: "2020-03-01T00:00:00.000Z"}

    it("sorts by title", () => {
        expect([ba1,aa1].sort((a, b) => SortNews(a,b,[{field:'title', direction:'ASC'}]))).toEqual([aa1,ba1])
    })

    it("convert string to date", () => {
        expect(new Date(bb3.date).getSeconds()).toEqual(new Date(2020,2, 1, 0, 0, 0, 0).getSeconds())
    })
    it("sorts by date", () => {
        expect([bb3,bb2].sort((a, b) => SortNews(a,b,[{field:'date', direction:'ASC'}]))).toEqual([bb2,bb3])
    })

    it("sorts by title and category", () => {
        expect([bb1, ab1, ba1,aa1].sort((a, b) => SortNews(a,b,[{field:'title', direction:'ASC'},{field:'category', direction:'ASC'}]))).toEqual([aa1,ab1,ba1,bb1])
    })

})
