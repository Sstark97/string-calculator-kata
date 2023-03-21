export const add = (theOperation: string) => {
    const emptyOperation = "0";
    const theOperationIsNotEmpty = theOperation !== "";
    return theOperationIsNotEmpty ? theOperation : emptyOperation
}
