import {NewsRequest} from "../models/NewsRequest";

export interface NewsRequestBuilderInterface {
    GenerateRequest(): NewsRequest
}

export class NewsRequestBuilder implements NewsRequestBuilderInterface {

    // TODO: Implement the builder here
    // To indicate to future developers that NewsRequests should use a builder there is a static create method that will call this classes constructor.
    // To make the builder easier to use consider making this a fluent builder where calls to builder methods can be chains together builder.doThing().doThing2().Generate()
    // Consider creating subclasses to separate distinct pieces of logic (faceted builder)

    GenerateRequest(): NewsRequest {
        return new NewsRequest()
    }
}
