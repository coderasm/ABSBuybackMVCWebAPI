import {buybackResultFunctions as bRF} from "../functions/buybackResult"

let buybackResultGetters = {
    instanceMembers: {},
    protoMembers: {},
    closures: [
      function() {}
    ]
};

setGetters();

function setGetters() {
    let isAbsSaleGetter = Object.getOwnPropertyDescriptor(bRF, "isAbsSale");
    Object.defineProperty(buybackResultGetters.protoMembers, "isAbsSale", isAbsSaleGetter);
    let isNonAbsSaleGetter = Object.getOwnPropertyDescriptor(bRF, "isNonAbsSale");
    Object.defineProperty(buybackResultGetters.protoMembers, "isNonAbsSale", isNonAbsSaleGetter);
}

export let BuybackResultGetters = buybackResultGetters;