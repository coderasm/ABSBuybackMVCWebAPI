export function EnterReservesState() {
    var prototype = {
        allBuybacks: [],
        queriedBuybacks: [],
        shownBuybacks: [],
        saleOptions: [],
        saleLocations: [],
        resultDescriptionId: null,
        statusDescriptionId: 0,
        reserve: 0
    };
    return Object.create(prototype, {});
}