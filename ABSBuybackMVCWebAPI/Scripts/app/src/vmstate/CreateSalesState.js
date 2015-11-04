export function CreateSalesState() {
    var prototype = {
        saleLocations: [],
        dealers: [],
        allVehicles: [],
        shownVehicles: [],
        queriedVehicles: [],
        reasons: [],
        saleOptions: [],
        saleLocationId: null,
        buyerId: null,
        vehicleIds: []
    };
    return Object.create(prototype, {});
}