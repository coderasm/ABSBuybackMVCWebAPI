import {BuybackVehicle} from '../prototypes/buybackVehicle';
import {BuybackVehicleVMToBuybackVehicle} from '../utilities/mapping/BuybackVehicleVMToBuybackVehicle';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';

function buybackVehicleViewModel(validation, eventAggregator, repositoryService, buybackVehicleVMToBuybackVehicle) {
    Object.assign(BuybackVehicle.protoMembers, {
                                                    validation: validation,
                                                    eventAggregator: eventAggregator,
                                                    repositoryService: repositoryService,
                                                    mapper: buybackVehicleVMToBuybackVehicle
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
            subscribeToEvents();
            setupValidation();
            setDefaultValues();
        }

        subscribeToEvents()
        {
            instance.eventAggregator.subscribe("createBuyback", instance.doCreate.bind(instance));
            instance.eventAggregator.subscribe("reasonSelected", instance.setReason.bind(instance));
            instance.eventAggregator.subscribe("saleOptionSelected", instance.setSaleOption.bind(instance));
            instance.eventAggregator.subscribe("absSaleLocationSelected", instance.setAbsSaleLocation.bind(instance));
            instance.eventAggregator.subscribe("absSaleInstanceSelected", instance.setAbsSaleInstance.bind(instance));
        }

        setUpValidation()
        {
            instance.validation = validation.on(instance)
                .ensure('Reserve')
                    .containsOnly(/^[1-9]\d*$|^$/)
                .onValidate( () => {
                    return {
                    }
                },(onValidateError)=>{ alert("Fix errors.")});
        }

        setDefaultValues()
        {
            instance.SaleInstanceId = -1;
            nullTextInputProperties.call(instance);
        }
        initialize();
        return instance;
    }
    return {create: create};
};
buybackVehicleViewModel.inject = [Validation, EventAggregator, RepositoryService, BuybackVehicleVMToBuybackVehicle];

export let BuybackVehicleViewModel = buybackVehicleViewModel;