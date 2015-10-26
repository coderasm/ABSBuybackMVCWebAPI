export function EditSaleState() {
    var prototype = {
        allBuybacks: [],
        queriedBuybacks: [],
        shownBuybacks: [],
        saleOptions: [],
        statuses: [],
        saleLocations: [],
        resultDescriptionId: null
    };
    return Object.create(prototype, {});
}