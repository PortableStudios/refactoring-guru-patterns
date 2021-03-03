import {News, NewsDoRequest} from "./NewsAPI";

export abstract class AbstractNewsService {
    public abstract allNews(): News[]

    public abstract search(title: string): News[]

    public abstract latestByCategory(category: string): News[]
}

export class NewsService implements AbstractNewsService {
    allNews(): News[] {
        return NewsDoRequest({
            authentication: {key: 'abc123', secret: 'donttellanyone'},
            sort: [],
            filters: []
        });
    }

    latestByCategory(category: string): News[] {
        return NewsDoRequest({
            authentication: {key: 'abc123', secret: 'donttellanyone'},
            sort: [{field:"date", direction: "DESC"}],
            filters: [{field: "category", fieldType: "inSet", filterValue: [category]}]
        });
    }

    search(title: string): News[] {
        return NewsDoRequest({
            authentication: {key: 'abc123', secret: 'donttellanyone'},
            sort: [],
            filters: [{field: "title", fieldType: "match", filterValue: title}]
        });
    }
}
