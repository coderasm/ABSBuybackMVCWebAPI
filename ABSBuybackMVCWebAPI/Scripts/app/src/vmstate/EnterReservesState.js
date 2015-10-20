export function EnterReservesState() {
    var prototype = {
        buybacks: [],
        saleOptions: [],
        resultDescriptionId: null,
        statusDescriptionId: 0,
        reserve: 0
    };
    return Object.create(prototype, {});
}