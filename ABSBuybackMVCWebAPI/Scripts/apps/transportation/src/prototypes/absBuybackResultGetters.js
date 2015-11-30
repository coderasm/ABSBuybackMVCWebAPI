import {absBuybackResultFunctions as absBRF} from "../functions/absBuybackResult"

let absBuybackResultGetters = {
    instanceMembers: {},
    protoMembers: {},
    closures: [
      function() {}
    ]
};

defineGetters();

function defineGetters() {
    let saleFirstDateGetter = Object.getOwnPropertyDescriptor(absBRF, "saleFirstDate");
    Object.defineProperty(absBuybackResultGetters.protoMembers, "saleFirstDate", saleFirstDateGetter);
}

export let AbsBuybackResultGetters = absBuybackResultGetters;