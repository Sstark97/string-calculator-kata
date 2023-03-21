import {add} from "../core/stringCalculator";

describe("String Calculator", () => {
    it("should be '0' if received an empty parameter", () => {
        expect(add("")).toBe("0")
    })

    it("should be the same number if the parameter contains only one number", () => {
        expect(add("1")).toBe("1")
    })

    it("should add two numbers separated by commas", () => {
        expect(add("1,2")).toBe("3")
    })

    it("allow the add method to handle an unknow number of arguments", () => {
        expect(add("1,2,3")).toBe("6")
    })
})