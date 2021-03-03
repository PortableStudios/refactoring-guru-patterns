import {numCompare} from "./NewsAPI";

describe("Num Compare", () => {
    it("Return numbers between -1 and 1", () => {
        expect(numCompare(1, 5)).toEqual(-1)
        expect(numCompare(5, 1)).toEqual(1)
    })
})
