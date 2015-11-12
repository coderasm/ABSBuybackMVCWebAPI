import {BuybackResult} from '../prototypes/BuybackResult';
import {NonAbsBuybackResult} from '../prototypes/NonAbsBuybackResult';
import {BuybackResultVMToBuybackResult} from '../utilities/mapping/BuybackResultVMToBuybackResult';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';

function buybackResultViewModel(validation, eventAggregator, repositoryService, buybackResultVMToBuybackResult) {
    Object.assign(BuybackResult.protoMembers, {
                                                    validation: validation,
                                                    eventAggregator: eventAggregator,
                                                    repositoryService: repositoryService,
                                                    mapper: buybackResultVMToBuybackResult
                                                }
                    );
    let buybackPrototype = BuybackResult;
    let prototype = Object.assign({}, BuybackResult.protoMembers, NonAbsBuybackResult.protoMembers);

    function nullTextInputProperties() {
        for(var property of buybackPrototype.protoMembers.textInputProperties)
            if (this.currentValues[property] === null)
            this.currentValues[property] = "";
    };

    function create(data) {
        let instance = Object.assign(Object.create(prototype), {currentValues: data}, data);
        buybackPrototype.closures.forEach(function(closure) {
            closure.call(instance);
        });
        // Simple copy of state to the new instance
        for (var key in buybackPrototype.instanceMembers) {
            instance[key] = buybackPrototype.instanceMembers[key];
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
            instance.validation = validation.on(instance)
                .ensure('Reserve')
                    .containsOnly(/^[1-9]\d*$|^$/)
                .ensure('HighBid')
                    .containsOnly(/^[1-9]\d*$|^$/)
                .onValidate( () => {
                    return {
                    }
                },(onValidateError)=>{ alert("Fix errors.")});
        }

        function setDefaultValues()
        {
            nullTextInputProperties.call(instance);
        }
        initialize();
        return instance;
    }
    return {create: create};
};
buybackResultViewModel.inject = [Validation, EventAggregator, RepositoryService, BuybackResultVMToBuybackResult];

export let BuybackResultViewModel = buybackResultViewModel;