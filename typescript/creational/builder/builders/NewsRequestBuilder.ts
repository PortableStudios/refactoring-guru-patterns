import {NewsRequest} from "../models/NewsRequest";

export interface NewsRequestBuilderInterface {
    GenerateRequest(): NewsRequest
}

export class NewsRequestBuilder implements NewsRequestBuilderInterface {

    GenerateRequest(): NewsRequest {
        return new NewsRequest()
    }
}
