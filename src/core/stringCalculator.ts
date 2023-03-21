export const add = (theOperation: string) => {
    const emptyOperation = "0"
    const theOperationIsNotEmpty = theOperation !== ""
    const theOperationToIterate = theOperation.split(",").map(number => parseInt(number))

    if(theOperationIsNotEmpty && theOperationToIterate.length > 0) {
        const sum = theOperationToIterate.reduce((allNumbersAdded, currentNumber) => allNumbersAdded += currentNumber, 0);
        return sum.toString()
    }
    return theOperationIsNotEmpty ? theOperation : emptyOperation
}
