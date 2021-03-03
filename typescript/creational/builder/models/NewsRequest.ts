import {NewsRequestBuilder, NewsRequestBuilderInterface} from "../builders/NewsRequestBuilder";

export type NewsRequestFilterDate = {
    field: 'date'
    fieldType: 'beforeDate'|'afterDate'
    filterValue: Date
}
export type NewsRequestFilterTitle = {
    field: 'title'
    fieldType: 'match'
    filterValue: string
}
export type NewsRequestFilterCategory = {
    field: 'category'
    fieldType: 'match'|'inSet'
    filterValue: string|string[]
}

export type NewsRequestFilter = NewsRequestFilterDate | NewsRequestFilterTitle | NewsRequestFilterCategory

export type NewsRequestSort = {
    field: 'category'|'title'|'date'
    direction: 'ASC'|'DESC'
}

export interface NewsRequestInterface {
    authentication: {
        key: string,
        secret: string
    }
    filters: NewsRequestFilter[]
    sort: NewsRequestSort[]
}

export class NewsRequest implements NewsRequestInterface {
    authentication = { key: "", secret: "" }
    filters = []
    sort = []
    public static Create(builder = NewsRequestBuilder): NewsRequestBuilderInterface {
        return new builder()
    }
}
