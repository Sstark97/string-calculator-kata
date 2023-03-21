import {add} from "../core/stringCalculator";

describe("String Calculator", () => {
    it("should be '0' if received an empty parameter", () => {
        expect(add("")).toBe("0")
    })
})