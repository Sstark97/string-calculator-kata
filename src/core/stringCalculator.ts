const getNumbersIn = (theOperation: string) => (
    theOperation.split(/[,\n]/).map(number => parseFloat(number))
)

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

export const add = (theOperation: string) => {
    notAppearTwoSeparatorsTogetherIn(theOperation)

    const emptyOperation = "0"
    const theOperationIsNotEmpty = theOperation !== ""
    const theOperationToIterate = getNumbersIn(theOperation)
    const isPossibleToSum = theOperationIsNotEmpty && theOperationToIterate.length > 0

    if(isPossibleToSum) {
        return sumAllNumbersIn(theOperationToIterate).toString()
    }

    return theOperationIsNotEmpty ? theOperation : emptyOperation
}
