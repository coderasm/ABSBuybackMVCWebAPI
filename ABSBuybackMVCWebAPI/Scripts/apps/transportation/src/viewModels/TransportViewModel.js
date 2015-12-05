import {Transport} from '../prototypes/transport';
import {TransportGetters} from '../prototypes/transportGetters';
import {TransportNoteVMToTransportNote} from '../utilities/mapping/TransportNoteVMToTransportNote';
import {RepositoryService} from 'services/RepositoryService';

function transportViewModel(repositoryService, transportNoteVMToTransportNote) {
    Object.assign(Transport.protoMembers, {
        repositoryService: repositoryService,
        mapper: transportNoteVMToTransportNote
                                                }
                    );
    let transportPrototype = Transport;
    let prototype = Object.assign({}, Transport.protoMembers);
    defineGetters();

    function defineGetters() {
        let hasHeat = Object.getOwnPropertyDescriptor(TransportGetters.protoMembers, "hasHeat");
        Object.defineProperty(prototype, "hasHeat", hasHeat);
        let isReleased = Object.getOwnPropertyDescriptor(TransportGetters.protoMembers, "isReleased");
        Object.defineProperty(prototype, "isReleased", isReleased);
        let isShipped = Object.getOwnPropertyDescriptor(TransportGetters.protoMembers, "isShipped");
        Object.defineProperty(prototype, "isShipped", isShipped);
        let shipped = Object.getOwnPropertyDescriptor(TransportGetters.protoMembers, "shipped");
        Object.defineProperty(prototype, "shipped", shipped);
        let setupDate = Object.getOwnPropertyDescriptor(TransportGetters.protoMembers, "setupDate");
        Object.defineProperty(prototype, "setupDate", setupDate);
        let released = Object.getOwnPropertyDescriptor(TransportGetters.protoMembers, "released");
        Object.defineProperty(prototype, "released", released);
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
transportViewModel.inject = [RepositoryService, TransportNoteVMToTransportNote];

export let TransportViewModel = transportViewModel;