import {transportNoteFunctions as transNoteFuncs} from "../functions/transportNote"

let transportNoteGetters = {
    instanceMembers: {},
    protoMembers: {},
    closures: [
      function() {}
    ]
};

setGetters();

function setGetters() {
    let created = Object.getOwnPropertyDescriptor(transNoteFuncs, "created");
    Object.defineProperty(transportNoteGetters.protoMembers, "created", created);
}

export let TransportNoteGetters = transportNoteGetters;