export const add = (theOperation: string) => {
    const emptyOperation = "0";
    const theOperationIsNotEmpty = theOperation !== "";
    if(theOperation[0] && theOperation[2]) {
        return (parseInt(theOperation[0]) + parseInt(theOperation[2])).toString()
    }
    return theOperationIsNotEmpty ? theOperation : emptyOperation
}
