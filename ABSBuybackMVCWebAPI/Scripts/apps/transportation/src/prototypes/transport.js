import {transportFunctions as transFuncs} from "../functions/transport";

export let Transport = {
    instanceMembers: {
        newNote: ""
    },
    protoMembers: {
        addNote: function addNote() {
            var note = transFuncs.createNote.call(this);
            var dataNote = this.mapper.map(note);
            this.repositoryService.TransportNoteRepository.insert(dataNote);
            this.Notes.unshift(note);
        }
    },
    closures: [
      function() {}
    ]
};