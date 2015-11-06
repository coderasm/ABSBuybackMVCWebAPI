import {BuybackVehicle} from '../prototypes/buybackVehicle';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';

let buybackVehicleViewModel = {
    @inject(Validation, EventAggregator, RepositoryService)
    doInjection: function doInjection(validation, eventAggregator, repositoryService) {
        Object.assign(BuybackVehicle.protoMembers, {
                                                        validation: validation,
                                                        eventAggregator: eventAggregator,
                                                        repositoryService: repositoryService
                                                    }
                        );
        let prototype = BuybackVehicle;

        function nullTextInputProperties() {
            for(var property of prototype.protoMembers.textInputProperties)
                if (this.currentValues[property] === null)
                this.currentValues[property] = "";
        };

        function create(data) {
            let instance = Object.assign(Object.create(prototype.protoMembers), {currentValues: data}, data);
            prototype.closures.forEach(function(closure) {
                closure.call(instance);
            });

            // Simple copy of state to the new instance
            for (var key in prototype.instanceMembers) {
                instance[key] = prototype.instanceMembers[key];
            }
            function initialize() {
                instance.eventAggregator.subscribe("createBuyback", instance.doCreate.bind(instance));
                instance.validation = validation.on(instance)
                    .ensure('Reserve')
                        .containsOnly(/^[1-9]\d*$|^$/)
                    .onValidate( () => {
                        return {
                        }
                    },(onValidateError)=>{ alert("Fix errors.")});
                nullTextInputProperties.call(instance);
            }
            initialize();
            return instance;
        }
        return {create: create};
    }
};
export let BuybackVehicleViewModel = buybackVehicleViewModel.doInjection;