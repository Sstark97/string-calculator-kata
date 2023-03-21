export const add = (theOperation: string) => {
    const emptyOperation = "0"
    const theOperationIsNotEmpty = theOperation !== ""
    const firstOperating = theOperation[0]
    const secondOperating = theOperation[2]
    if(firstOperating && secondOperating) {
        const sum = parseInt(firstOperating) + parseInt(secondOperating);
        return sum.toString()
    }
    return theOperationIsNotEmpty ? theOperation : emptyOperation
}
