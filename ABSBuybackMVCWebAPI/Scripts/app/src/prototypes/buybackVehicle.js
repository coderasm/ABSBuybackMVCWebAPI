import {buybackVehicleFunctions as bVF} from "../functions/buybackVehicle"

export let
BuybackVehicle = {
    instanceMembers: {
        create: false,
        reasonId: null,
        resultDescriptionId: null,
        saleId: null,
        saleInstanceId: -1
    },
    protoMembers: {
        doCreate: bVF.doCreate,
        createBuybackResult: bVF.createBuybackResult,
        createVehicleWithChoices: bVF.createVehicleWithChoices,
        createAbsBuyback: bVF.createAbsBuyback,
        isValid: bVF.isValid,
        setReason: bVF.setReason,
        setSaleOption: bVF.setSaleOption,
        setAbsSaleLocation: bVF.setAbsSaleLocation,
        setAbsSaleInstance: bVF.setAbsSaleInstance,
        validation: null,
        eventAggregator: null,
        repositoryService: null,
        mapper: null,
        textInputProperties: ["Reserve"]
    },
    closures: [
      function() {}
    ]
};