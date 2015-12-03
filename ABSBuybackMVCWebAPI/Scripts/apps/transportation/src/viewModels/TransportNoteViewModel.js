import {TransportNote} from '../prototypes/transportNote';
import {TransportNoteGetters} from '../prototypes/transportNoteGetters';

function transportNoteViewModel() {

    let transportNotePrototype = TransportNote;
    let prototype = Object.assign({}, TransportNote.protoMembers);
    defineGetters();

    function defineGetters() {
        let created = Object.getOwnPropertyDescriptor(TransportNoteGetters.protoMembers, "created");
        Object.defineProperty(prototype, "created", created);
    }

    function create(data) {
        let instance = Object.assign(Object.create(prototype), data);
        transportPrototype.closures.forEach(function(closure) {
            closure.call(instance);
        });
        // Simple copy of state to the new instance
        for (var key in transportPrototype.instanceMembers) {
            instance[key] = transportPrototype.instanceMembers[key];
        }

        function initialize() {
            subscribeToEvents();
            setupValidation();
            setDefaultValues();
        }

        function subscribeToEvents()
        {
        }

        function setupValidation()
        {
        }

        function setDefaultValues()
        {
        }
        initialize();
        return instance;
    }
    return {create: create};
};

export let TransportNoteViewModel = transportNoteViewModel;