import dataJSON from '../data/international-news.json'
import {
    NewsRequestFilter,
    NewsRequestFilterCategory,
    NewsRequestFilterDate,
    NewsRequestFilterTitle,
    NewsRequestInterface, NewsRequestSort
} from "../models/NewsRequest";

type NewsData = {
    title: string
    date: string
    category: string
}

function isCategoryFilter(filter: NewsRequestFilter): filter is NewsRequestFilterCategory {
    return filter.field === "category"
}

export function isCategoryMatch(item: NewsData, filter: NewsRequestFilter ) {
    if(!isCategoryFilter(filter)) return true;
    switch (filter.fieldType) {
        case "match":
            return item.category === filter.filterValue;
        case "inSet":
            return (filter.filterValue as string[]).indexOf(item.category) !== -1
        default:
            return false
    }
}

function isTitleFilter(filter: NewsRequestFilter): filter is NewsRequestFilterTitle {
    return filter.field == "title";
}


export function isTitleMatch(item: NewsData, filter: NewsRequestFilter) {
    if(!isTitleFilter(filter)) return true;
    switch (filter.fieldType) {
        case "match":
            return item.title.indexOf(filter.filterValue) !== -1;
        default:
            return false
    }
}

function isDateFilter(filter: NewsRequestFilter): filter is NewsRequestFilterDate {
    return filter.field == "date";
}

// Return a number between -1 and 1
export function numCompare(a: number, b: number) {
    return Math.min(Math.max(-1, a - b), 1);
}

export function isDateMatch(newsItem: NewsData, filter: NewsRequestFilter) {
    if(!isDateFilter(filter)) return true;
    switch (filter.fieldType) {
        case "afterDate":
            return (new Date(newsItem.date).getSeconds() > filter.filterValue.getSeconds())
        case "beforeDate":
            return (new Date(newsItem.date).getSeconds() < filter.filterValue.getSeconds())
        default:
            return false
    }
}

export function Filter(filters: NewsRequestFilter[], newsItem: NewsData): Boolean {
    return filters.filter((filter) => {
        return isCategoryMatch(newsItem, filter)
          && isTitleMatch(newsItem, filter)
          && isDateMatch(newsItem, filter)
    }).length > 0 || filters.length === 0;
}

export function SortNews(a: NewsData, b: NewsData, sort: NewsRequestSort[]) {
    return sort.reduce((res, sort) => {
        switch (sort.field) {
            case "category":
                return (res*10) + (a.category.localeCompare(b.category) * (sort.direction == "ASC" ? 1 : -1))
            case "date":
                return (res*10) + (numCompare(new Date(a.date).getSeconds(), new Date(b.date).getSeconds()) * (sort.direction == "ASC" ? 1 : -1))
            case "title":
                return (res*10) + (a.title.localeCompare(b.title) * (sort.direction == "ASC" ? 1 : -1))
        }
    }, 0)
}

export type News = {
    title: string
    date: Date
}
export const newNews = (title: string, date: Date): News => ({title, date});
export const NewsDoRequest = (request: NewsRequestInterface): News[] => {
    if (!request.authentication.secret) throw new Error("Access Denied");
    return (dataJSON as unknown as NewsData[])
        .filter((newsItem) => Filter(request.filters, newsItem))
        .sort((a,b) => SortNews(a,b, request.sort))
        .map(item => newNews(item.title, new Date(item.date)))
}
