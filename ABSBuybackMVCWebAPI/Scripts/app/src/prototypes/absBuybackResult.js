import {absBuybackResultFunctions as absBRF} from "../functions/absBuybackResult"

export let AbsBuybackResult = {
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