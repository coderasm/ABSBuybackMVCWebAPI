import {MapperFactory} from "./MapperFactory";
import {TransportNoteFactory} from "../../models/TransportNoteFactory";

export function TransportNoteVMToTransportNote() {
    let instanceObject = {
        map: function(transportNoteVM) {
            let toObject = this.toFactory();
            toObject.UserNoteID = transportNoteVM.UserNoteID === undefined ? null : transportNoteVM.UserNoteID;
            toObject.VehicleID = transportNoteVM.VehicleID === undefined ? null : transportNoteVM.VehicleID;
            toObject.UserNote = transportNoteVM.UserNote === undefined ? null : transportNoteVM.UserNote;
            toObject.CreatedDT = transportNoteVM.CreatedDT === undefined ? null : transportNoteVM.CreatedDT;
            toObject.CreatedBy = transportNoteVM.CreatedBy === undefined ? null : transportNoteVM.CreatedBy;
            return toObject;
        },
        toFactory: function() {
            return TransportNoteFactory();
        }

    }
    return Object.assign(Object.create(MapperFactory(), {}), instanceObject);
}