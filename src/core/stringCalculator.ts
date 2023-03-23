const getCustomSeparatorIn = (theOperation: string) => {
    const delimiterStart = theOperation.lastIndexOf("/") + 1
    const delimiterEnd = theOperation.indexOf("\n")
    return theOperation.substring(delimiterStart, delimiterEnd)
}

const getNumbersWithCustomSeparatorIn = (theOperation: string) => {
    const delimiterStart = theOperation.indexOf("\n") + 1
    return theOperation.substring(delimiterStart, theOperation.length)
}

const getNumbersIn = (theOperation: string) => {
    const haveCustomSeparator = theOperation.startsWith("//")
    const numbersInTheOperation = haveCustomSeparator ? getNumbersWithCustomSeparatorIn(theOperation) : theOperation
    const currentSeparator = haveCustomSeparator ? getCustomSeparatorIn(theOperation) : /[,\n]/

    return numbersInTheOperation.split(currentSeparator).map(number => Number(number))
}

const sumAllNumbersIn = (theOperationToIterate: number[]) => {
    const sumAll = (allNumbersAdded, currentNumber) => allNumbersAdded += currentNumber
    return theOperationToIterate.reduce(sumAll, 0)
}

const notAppearTwoSeparatorsTogetherIn = (theOperation: string) => {
    const theOperationToCheck = theOperation.split("")
    theOperationToCheck.forEach((char, index) => {
        const previousChar = theOperationToCheck[index - 1] ?? "0"
        const charIsSeparator = char.match(/[,\n]/)
        const previousCharIsSeparator = previousChar.match(/[,\n]/)

        if (charIsSeparator && previousCharIsSeparator) {
            throw new Error(`Number expected but '${char}' found at position ${index}.`)
        }
    })
}

const separatorNotAppearAtLastPositionIn = (theOperation: string) => {
    const charAtLast = theOperation[theOperation.length - 1] ?? ""
    const isLastCharacterASeparator = charAtLast.match(/[,\n]/)

    if (isLastCharacterASeparator) {
        throw new Error("Number expected but EOF found.")
    }
}

const isAnotherSeparatorIn = (theOperation: string) => {
    const customSeparator = getCustomSeparatorIn(theOperation)
    const numbers = getNumbersWithCustomSeparatorIn(theOperation).split(customSeparator)

    return numbers.some(number => isNaN(Number(number)))
}

const getAnotherSeparatorIn = (numbers: string, separator: string) => (
    numbers.split("").find(char => char !== separator && isNaN(Number(char)))
)

const customDelimiterAndGeneralNotTogetherIn = (theOperation: string) => {
    if (getCustomSeparatorIn(theOperation) !== "" && isAnotherSeparatorIn(theOperation)) {
        const numbers = getNumbersWithCustomSeparatorIn(theOperation)
        const customSeparator = getCustomSeparatorIn(theOperation)
        const anotherSeparator = getAnotherSeparatorIn(numbers, customSeparator)
        const anotherSeparatorPos = numbers.indexOf(anotherSeparator)
        throw new Error(`'${customSeparator}' expected but '${anotherSeparator}' found at position ${anotherSeparatorPos}.`)
    }
}

export const add = (theOperation: string) => {
    notAppearTwoSeparatorsTogetherIn(theOperation)
    separatorNotAppearAtLastPositionIn(theOperation)
    customDelimiterAndGeneralNotTogetherIn(theOperation)

    const emptyOperation = "0"
    const theOperationIsNotEmpty = theOperation !== ""
    const theOperationToIterate = getNumbersIn(theOperation)
    const isPossibleToSum = theOperationIsNotEmpty && theOperationToIterate.length > 0

    const negativeNumber = theOperationToIterate.find(number => number < 0)

    if(negativeNumber) {
        throw  new Error(`Negative not allowed : ${negativeNumber}`)
    }

    if(isPossibleToSum) {
        return sumAllNumbersIn(theOperationToIterate).toString()
    }

    return theOperationIsNotEmpty ? theOperation : emptyOperation
}
