import {buybackVehicleFunctions as bVF} from "../functions/buybackVehicle"

export let BuybackVehicle = {
    instanceMembers: {
        create: false
    },
    protoMembers: {
        doCreate: bVF.doCreate,
        createBuybackResult: bVF.createBuybackResult,
        createVehicleWithChoices: bVF.createVehicleWithChoices,
        createAbsBuyback: bVF.createAbsBuyback,
        isValid: bVF.isValid,
        validation: null,
        eventAggregator: null,
        repositoryService: null,
        textInputProperties: ["Reserve"]
    },
    closures: [
      function() {}
    ]
};