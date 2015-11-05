import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';

@inject(Validation, EventAggregator, RepositoryService)
export function BuybackVehicleViewModelFactory(validation, eventAggregator, repositoryService)
{

    let prototype = {
        textInputProperties: ["Reserve"],
        doCreate: function doCreate()
        {
            if (this.create && this.isValid())
                this.createBuybackResult();
        },
        createBuybackResult: function createBuybackResult()
        {
            var vehicleWithChoices = this.createVehicleWithChoices();
            if (this.saleOption != 10)
                this.repositoryService.BuybackResultRepository.insert(vehicleWithChoices);
            else
                this.createAbsBuyback(vehicleWithChoices);
        },
        createVehicleWithChoices: function createVehicleWithChoices()
        {
            return {
                Vehicle:this.buybackVehicleVMToBuybackVehicle.map(this),
                ResultDescriptionId:this.saleOption,
                ReasonId:this.reason
            }
        },
        createAbsBuyback: function createAbsBuyback(vehicle)
        {
            vehicle.SaleInstanceId = this.absOptionLocationInstanceId;
            vehicle.SaleId = this.absOptionLocationId;
            this.repositoryService.AbsBuybackResultRepository.insert(vehicle);
        },
        isValid: function isValid()
        {
            this.validation.validate().catch(err => {});
            return this.validation.result.isValid;
        },
        validation: validation,
        eventAggregator: eventAggregator,
        repositoryService: repositoryService
    };

    function nullTextInputProperties() {
        for(var property of prototype.textInputProperties)
            if (this.currentValues[property] === null)
                this.currentValues[property] = "";
    };

    function create(data) {
        let instance = Object.assign(Object.create(prototype), {currentValues: data}, data);
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