import { add } from "../core/stringCalculator";

describe("String Calculator first steps", () => {
    it("should be '0' if received an empty parameter", () => {
        expect(add("")).toBe("0")
    })

    it("should be the same number if the parameter contains only one number", () => {
        expect(add("1")).toBe("1")
    })

    it("should add two numbers separated by commas", () => {
        expect(add("1,2")).toBe("3")
    })
})

describe("String Calculator with many numbers", () => {
    it("allow the add method to handle an unknow number of arguments", () => {
        expect(add("1,2,3")).toBe("6")
    })

    it("allow to sum numbers with decimals", () => {
        expect(add("1.5,2.5")).toBe("4")
    })
})

describe("String Calculator with also have newLine as separator", () => {
    it("allow newLine as a separator", () => {
        expect(add("1\n2,3")).toBe("6")
    })

    it("should show an error if two separators together", () => {
        expect(() => add("175.2,\n35")).toThrow("Number expected but '\n' found at position 6.")
    })
})

describe("String Calculator", () => {
    it("don’t allow the input to end in a separator", () => {
        expect(() => add("1,3,")).toThrow("Number expected but EOF found.")
    })
})