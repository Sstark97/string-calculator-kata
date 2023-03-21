import {add} from "../core/stringCalculator";

describe("String Calculator", () => {
    it("should be '0' if received an empty parameter", () => {
        expect(add("")).toBe("0")
    })

    it("should be the same number if the parameter contains only one number", () => {
        expect(add("1")).toBe("1")
    })
})