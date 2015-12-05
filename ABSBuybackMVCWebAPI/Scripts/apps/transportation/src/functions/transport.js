import {TransportNoteViewModel} from 'viewModels/TransportNoteViewModel';

export let transportFunctions = {
    get hasHeat() {
        return this.HeatID  !== null;
    },
    get isReleased()
    {
        return this.ReleaseDT !== null;
    },
    get isShipped()
    {
        return this.Shipped !== null;
    },
    get shipped() {
        return (new Date(this.Shipped)).toLocaleDateString();
    },
    get setupDate() {
        return (new Date(this.SetUPDate)).toLocaleDateString();
    },
    get released() {
        return (new Date(this.ReleaseDT)).toLocaleDateString();
    },
    createNote: function createNote() {
        var newNote = {
            VehicleID: this.VID,
            UserNote: this.newNote,
            CreatedDT: new Date(),
            CreatedBy: "someone"
        };
        return TransportNoteViewModel().create(newNote);
    }
}