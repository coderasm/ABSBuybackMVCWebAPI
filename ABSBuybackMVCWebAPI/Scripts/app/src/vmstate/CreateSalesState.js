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
        vehicleIds: [],
        reason: null,
        saleOption: null,
        absOptionLocations: [],
        absOptionLocationId: null,
        absOptionSaleLocationInstances: [{name:"Select",value:-1}],
        absOptionLocationInstanceId: -1
    };
    return Object.create(prototype, {});
}