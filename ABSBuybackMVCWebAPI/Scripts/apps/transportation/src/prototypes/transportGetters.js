import {transportFunctions as transFuncs} from "../functions/transport"

let transportGetters = {
    instanceMembers: {},
    protoMembers: {},
    closures: [
      function() {}
    ]
};

setGetters();

function setGetters() {
    let hasHeat = Object.getOwnPropertyDescriptor(transFuncs, "hasHeat");
    Object.defineProperty(transportGetters.protoMembers, "hasHeat", hasHeat);
    let isReleased = Object.getOwnPropertyDescriptor(transFuncs, "isReleased");
    Object.defineProperty(transportGetters.protoMembers, "isReleased", isReleased);
    let shipped = Object.getOwnPropertyDescriptor(transFuncs, "shipped");
    Object.defineProperty(transportGetters.protoMembers, "shipped", shipped);
    let isShipped = Object.getOwnPropertyDescriptor(transFuncs, "isShipped");
    Object.defineProperty(transportGetters.protoMembers, "isShipped", isShipped);
    let setupDate = Object.getOwnPropertyDescriptor(transFuncs, "setupDate");
    Object.defineProperty(transportGetters.protoMembers, "setupDate", setupDate);
    let released = Object.getOwnPropertyDescriptor(transFuncs, "released");
    Object.defineProperty(transportGetters.protoMembers, "released", released);
}

export let TransportGetters = transportGetters;