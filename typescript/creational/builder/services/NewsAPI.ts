import dataJSON from '../data/international-news.json'
import {
    NewsRequestFilter,
    NewsRequestFilterCategory,
    NewsRequestFilterDate,
    NewsRequestFilterTitle,
    NewsRequestInterface
} from "../models/NewsRequest";

type NewsData = {
    title: string
    date: string
    category: string
}

function isCategoryFilter(filter: NewsRequestFilter): filter is NewsRequestFilterCategory {
    return filter.field == "category"
}

function isCategoryMatch(item: NewsData, filter: NewsRequestFilterCategory ) {
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


function isTitleMatch(item: NewsData, filter: NewsRequestFilterTitle) {
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

function isDateMatch(newsItem: NewsData, filter: NewsRequestFilterDate) {
    switch (filter.fieldType) {
        case "afterDate":
            return (new Date(newsItem.date).getSeconds() > filter.filterValue.getSeconds())
        case "beforeDate":
            return (new Date(newsItem.date).getSeconds() < filter.filterValue.getSeconds())
        default:
            return false
    }
}

function Filter(request: NewsRequestInterface, newsItem: NewsData): Boolean {
    return request.filters.filter((filter) => {
        if(isCategoryFilter(filter) && !isCategoryMatch(newsItem, filter)) {
            return false;
        }
        if(isTitleFilter(filter) && !isTitleMatch(newsItem, filter)) {
            return false;
        }
        if(isDateFilter(filter) && !isDateMatch(newsItem, filter)) {
            return false;
        }
        return true
    }).length > 1
}

function SortNews(a: NewsData, b: NewsData, request: NewsRequestInterface) {
    return request.sort.reduce((res, sort) => {
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
}
export const newNews = (title: string): News => ({title});
export const NewsDoRequest = (request: NewsRequestInterface): News[] => {
    if (request.authentication.secret) throw new Error("Access Denied");
    return (dataJSON as unknown as NewsData[])
        .filter((newsItem) => Filter(request, newsItem))
        .sort((a,b) => SortNews(a,b, request))
        .map(item => newNews(item.title))
}
