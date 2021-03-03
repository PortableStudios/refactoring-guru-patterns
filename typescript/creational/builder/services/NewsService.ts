import {News} from "./NewsAPI";

export abstract class AbstractNewsService {
    public abstract allNews(): News[]

    public abstract search(title: string): News[]

    public abstract latestByCategory(category: string): News[]
}

export class NewsService implements AbstractNewsService {
    allNews(): News[] {
        return [];
    }

    latestByCategory(category: string): News[] {
        return [];
    }

    search(title: string): News[] {
        return [];
    }
}
