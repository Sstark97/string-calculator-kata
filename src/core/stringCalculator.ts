const getNumbersIn = (theOperation: string) => {
    if(theOperation.startsWith("//")) {
        const customSeparator = theOperation[theOperation.lastIndexOf("/") + 1]
        const operation = theOperation.substring(theOperation.lastIndexOf("\n") + 1, theOperation.length)

        return operation.split(customSeparator).map(number => parseFloat(number))
    }

    return theOperation.split(/[,\n]/).map(number => parseFloat(number))
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
    const lastCharIsSeparator = charAtLast.match(/[,\n]/)
    const theOperationIsNotEmpty = theOperation !== ""

    if (theOperationIsNotEmpty && lastCharIsSeparator) {
        throw new Error("Number expected but EOF found.")
    }
}

export const add = (theOperation: string) => {
    notAppearTwoSeparatorsTogetherIn(theOperation)
    separatorNotAppearAtLastPositionIn(theOperation)

    const emptyOperation = "0"
    const theOperationIsNotEmpty = theOperation !== ""
    const theOperationToIterate = getNumbersIn(theOperation)
    const isPossibleToSum = theOperationIsNotEmpty && theOperationToIterate.length > 0

    if(isPossibleToSum) {
        return sumAllNumbersIn(theOperationToIterate).toString()
    }

    return theOperationIsNotEmpty ? theOperation : emptyOperation
}
