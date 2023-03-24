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

const sumAllNumbersIn = (theOperation: string) => {
    const theOperationToIterate = getNumbersIn(theOperation)
    const sumAll = (allNumbersAdded, currentNumber) => allNumbersAdded += currentNumber
    return theOperationToIterate.reduce(sumAll, 0)
}

const notAppearTwoSeparatorsTogetherIn = (theOperation: string) => {
    const theOperationToCheck = theOperation.split("")
    let error = ""
    theOperationToCheck.forEach((char, index) => {
        const previousChar = theOperationToCheck[index - 1] ?? "0"
        const charIsSeparator = char.match(/[,\n]/)
        const previousCharIsSeparator = previousChar.match(/[,\n]/)

        if (charIsSeparator && previousCharIsSeparator) {
            error += `Number expected but '${char}' found at position ${index}.\n`
        }
    })

    return error
}

const separatorNotAppearAtLastPositionIn = (theOperation: string) => {
    const charAtLast = theOperation[theOperation.length - 1] ?? ""
    const isLastCharacterASeparator = charAtLast.match(/[,\n]/)

    return isLastCharacterASeparator ? "Number expected but EOF found.\n" : ""
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
    const haveCustomSeparator = theOperation.startsWith("//")
    let error = ""

    if (haveCustomSeparator && isAnotherSeparatorIn(theOperation)) {
        const numbers = getNumbersWithCustomSeparatorIn(theOperation)
        const customSeparator = getCustomSeparatorIn(theOperation)
        const anotherSeparator = getAnotherSeparatorIn(numbers, customSeparator)
        const anotherSeparatorPos = numbers.indexOf(anotherSeparator)
        error += `'${customSeparator}' expected but '${anotherSeparator}' found at position ${anotherSeparatorPos}.\n`
    }

    return error
}

const checkIfThereAreNegativeNumbersFrom = (theOperation: string) => {
    const theOperationToIterate = getNumbersIn(theOperation)
    const negativeNumbers = theOperationToIterate.filter(number => number < 0)
    const haveNegativeNumbers = negativeNumbers.length > 0
    let error = ""

    if (haveNegativeNumbers) {
        const negativeNumbersJoinedByCommas = negativeNumbers.join(", ")
        error += `Negative not allowed : ${negativeNumbersJoinedByCommas}\n`
    }

    return error
}

const haveAnyErrorInThe = (theOperation: string) => {
    let error = ""
    error += checkIfThereAreNegativeNumbersFrom(theOperation)
    error += notAppearTwoSeparatorsTogetherIn(theOperation)
    error += separatorNotAppearAtLastPositionIn(theOperation)
    error += customDelimiterAndGeneralNotTogetherIn(theOperation)

    if (error !== "") {
        throw new Error(error.substring(0, error.length - 1))
    }
}

export const add = (theOperation: string) => {
    haveAnyErrorInThe(theOperation)

    const emptyOperation = "0"
    const theOperationIsNotEmpty = theOperation !== ""

    if(theOperationIsNotEmpty) {
        return sumAllNumbersIn(theOperation).toString()
    }

    return theOperationIsNotEmpty ? theOperation : emptyOperation
}
