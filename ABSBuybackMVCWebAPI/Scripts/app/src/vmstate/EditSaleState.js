export function EditSaleState() {
    var prototype = {
        allBuybacks: [],
        queriedBuybacks: [],
        shownBuybacks: [],
        buybacks: [],
        saleOptions: [],
        statuses: [],
        resultDescriptionId: null
    };
    return Object.create(prototype, {});
}