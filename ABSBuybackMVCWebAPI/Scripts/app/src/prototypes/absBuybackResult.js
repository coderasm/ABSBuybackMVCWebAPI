import {absbuybackResultFunctions as absBRF} from "../functions/absBuybackResult"

export let BuybackResult = {
    instanceMembers: {},
    protoMembers: {
        update: absBRF.update,
        saleFirstDate: absBRF.saleFirstDate,
        location: absBRF.location
    },
    closures: [
      function() {}
    ]
};