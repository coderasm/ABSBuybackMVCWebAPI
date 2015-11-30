import {BuybackResult} from '../prototypes/buybackResult';
import {AbsBuybackResult} from '../prototypes/absBuybackResult';
import {AbsBuybackResultGetters} from '../prototypes/absBuybackResultGetters';
import {BuybackResultGetters} from '../prototypes/buybackResultGetters';
import {DialogService} from 'aurelia-dialog';
import {AbsBuybackResultVMToAbsBuybackResult} from '../utilities/mapping/AbsBuybackResultVMToAbsBuybackResult';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';

function absBuybackResultViewModel(validation, eventAggregator, repositoryService, dialogService, absBuybackResultVMToAbsBuybackResult) {
    Object.assign(BuybackResult.protoMembers, {
        validation: validation,
        eventAggregator: eventAggregator,
        repositoryService: repositoryService,
        mapper: absBuybackResultVMToAbsBuybackResult,
        dialogService: dialogService
    }
                    );
    let buybackPrototype = BuybackResult;
    let prototype = Object.assign({}, BuybackResult.protoMembers, AbsBuybackResult.protoMembers);
    defineGetters();

    function defineGetters() {
        let isAbsSaleGetter = Object.getOwnPropertyDescriptor(BuybackResultGetters.protoMembers, "isAbsSale");
        Object.defineProperty(prototype, "isAbsSale", isAbsSaleGetter);
        let isNonAbsSaleGetter = Object.getOwnPropertyDescriptor(BuybackResultGetters.protoMembers, "isNonAbsSale");
        Object.defineProperty(prototype, "isNonAbsSale", isNonAbsSaleGetter);
        let saleFirstDateGetter = Object.getOwnPropertyDescriptor(AbsBuybackResultGetters.protoMembers, "saleFirstDate");
        Object.defineProperty(prototype, "saleFirstDate", saleFirstDateGetter);
    }

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
absBuybackResultViewModel.inject = [Validation, EventAggregator, RepositoryService, DialogService, AbsBuybackResultVMToAbsBuybackResult];

export let AbsBuybackResultViewModel = absBuybackResultViewModel;