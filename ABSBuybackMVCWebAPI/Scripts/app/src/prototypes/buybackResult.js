import {buybackResultFunctions as bRF} from "../functions/buybackResult"

export let BuybackResult = {
    instanceMembers: {},
    protoMembers: {
        isAbsSale: bRF.isAbsSale,
        isNonAbsSale: bRF.isNonAbsSale,
        lastSixOfVIN: bRF.lastSixOfVIN,
        sale: bRF.sale,
        update: bRF.update,
        updateIfChanged: bRF.updateIfChanged,
        doUpdate: bRF.doUpdate,
        updateCurrentValues: bRF.updateCurrentValues,
        validation: null,
        eventAggregator: null,
        repositoryService: null,
        mapper: null,
        textInputProperties: ["Reserve", "HighBid"],
    },
    closures: [
      function() {}
    ]
};