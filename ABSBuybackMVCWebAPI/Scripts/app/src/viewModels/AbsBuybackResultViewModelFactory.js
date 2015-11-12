import {BuybackResultViewModel} from "./BuybackResultViewModel";

export function AbsBuybackResultViewModelFactory(vehicle, validation, mapper, repositoryService)
{
    let instanceMembers = {
        doUpdate:  function doUpdate() {
            let buybackResult = mapper.map(instance);
            repositoryService.AbsBuybackResultRepository.update(buybackResult);
        },
        get saleFirstDate() {
            if (instance.SaleFirstDate === null)
                return "Next Sale";
            return (new Date(instance.SaleFirstDate)).toLocaleDateString();
        },
        location: function location(saleLocations) {
            for(let location of saleLocations)
                if (location.SaleId === this.SaleId)
                return location.SaleLocation;
        }
    };
    let instance = BuybackResultViewModel(vehicle, validation, mapper, repositoryService);
    return Object.assign(instance, instanceMembers);
}

import {BuybackResult} from '../prototypes/BuybackResult';
import {BuybackResultVMToBuybackResult} from '../utilities/mapping/BuybackResultVMToBuybackResult';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';

function absBuybackResultViewModel(validation, eventAggregator, repositoryService, buybackResultVMToBuybackResult) {
    Object.assign(BuybackResult.protoMembers, {
        validation: validation,
        eventAggregator: eventAggregator,
        repositoryService: repositoryService,
        mapper: buybackResultVMToBuybackResult
    }
                    );
    let prototype = BuybackResult;

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