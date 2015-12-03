import {buybackResultFunctions as bRF} from "../functions/buybackResult"

let transportGetters = {
    instanceMembers: {},
    protoMembers: {},
    closures: [
      function() {}
    ]
};

setGetters();

function setGetters() {
    let isAbsSaleGetter = Object.getOwnPropertyDescriptor(bRF, "isAbsSale");
    Object.defineProperty(transportGetters.protoMembers, "isAbsSale", isAbsSaleGetter);
    let isNonAbsSaleGetter = Object.getOwnPropertyDescriptor(bRF, "isNonAbsSale");
    Object.defineProperty(transportGetters.protoMembers, "isNonAbsSale", isNonAbsSaleGetter);
}

export let BuybackResultGetters = transportGetters;