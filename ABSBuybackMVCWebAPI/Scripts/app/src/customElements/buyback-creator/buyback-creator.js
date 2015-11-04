import {customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Validation} from 'aurelia-validation';
import {inject} from 'aurelia-framework';

@customElement('buyback-creator')
@inject(Validation, EventAggregator)
export class BuybackCreator {
    @bindable reasons = [];
    @bindable locations = [];
    @bindable saleOptions = [];

    absOptionLocations = [];
    absOptionSaleLocationInstances = [{ name: "Select", value: -1 }];
    saveProperties = ["reason", "saleOption", "absOptionLocationId"];
    reason = null;
    saleOption = null;
    absOptionLocationId = null;
    absOptionLocationInstanceId = -1;

    constructor(validation, eventAggregator)
    {
        this.eventAggregator = eventAggregator;
        this.eventAggregator.subscribe("resetSaveProperties", this.resetProperties(this.saveProperties));
        this.validation = validation;
        this.nonAbsSaleValidation = validation.on(this)
            .ensure('reason')
                .isNotEmpty()
                .passes((value) => {return value !== "null";})
                .withMessage("Choose a reason.")
            .ensure('saleOption')
                .isNotEmpty()
                .passes((value) => {return value !== "null";})
                .withMessage("Choose a sale option.")
            .onValidate( () => {
                return {
                }
            },(onValidateError)=>{ alert("Fix errors.")});
        this.absSaleValidation = validation.on(this)
            .ensure('absOptionLocationId', (config) => {config.computedFrom('saleOption')})
                .passes(() => {return true;})
                .if(() => { return this.saleOption == 10; })
                    .isNotEmpty()
                    .passes((value) => {return value !== "null";})
                    .withMessage("Choose a location.")
                .endIf()
            .ensure('absOptionLocationInstanceId', (config) => {config.computedFrom('absOptionLocationId')})
                .passes(() => {return true;})
                .if(() => { return this.absOptionLocationId !== null; })
                    .passes((value) => {return value != -1;})
                    .withMessage("Choose a sale.")
                .endIf()
            .onValidate( () => {
                return {
                }
            },(onValidateError)=>{ alert("Fix errors.")});
    }

    activate()
    {
        this.setAbsOptionLocations();
    }

    setAbsOptionLocations() {
        this.absOptionLocations = this.locations.slice(1);
        this.absOptionLocations.unshift({ SaleId: null, SaleLocation: "Select" });
    }

    get showAbsSaleLocations()
    {
        return this.saleOption == 10 ? true : false;
    }

    get showLocationSales()
    {
        return this.showAbsSaleLocations && this.absOptionLocationId !== null;
    }

    saleOptionSelected()
    {
        this.absOptionLocationId = null;
        this.absOptionLocationInstanceId = -1;
        if(this.saleOption == 10)
            this.absSaleValidation.validate().catch(err=>{});
    }

    absOptionLocationSelected()
    {
        this.absOptionLocationInstanceId = -1;
        if (this.absOptionLocationId === null)
            return;
        this.setSales();
        this.absSaleValidation.validate().catch(err=>{});

    }

    setSales()
    {
        for(let saleLocation of this.saleLocations)
        {
            if (this.absOptionLocationId == saleLocation.SaleId) {
                this.absOptionSaleLocationInstances = this.generateAbsOptionSaleLocationInstances(saleLocation);
                break;
        }
    }
    }

    generateAbsOptionSaleLocationInstances(location)
    {
        var nextSaleWording = "Next Sale Setup";
        if(location.Sales.length === 0)
            return [{name:"Select",value:-1},{name:nextSaleWording, value:null}];
        var date = (new Date(location.Sales[0].SaleFirstDate)).toLocaleDateString();
        return [{name:"Select",value:-1},{name:date, value:location.Sales[0].SaleInstanceId},{name:nextSaleWording, value:null}];
    }

    createSelected()
    {
        if(!this.isValid()) return;
        for(let vehicle of this.shownVehicles)
        {
            if (vehicle.create && vehicle.isValid()) {
                this.createBuybackResult(vehicle);
        };
    }
    }

    isValid()
    {
        this.nonAbsSaleValidation.validate().catch(err => {});
        this.absSaleValidation.validate().catch(err => {});
        if(!this.nonAbsSaleValidation.result.isValid || !this.absSaleValidation.result.isValid)
            return false;
        return true;
    }

    createBuybackResult(vehicle)
    {
        var vehicleWithChoices = this.createVehicleWithChoices(vehicle);
        if (this.saleOption != 10)
            this.repositoryService.BuybackResultRepository.insert(vehicleWithChoices);
        else
            this.createAbsBuyback(vehicleWithChoices);
    }

    createVehicleWithChoices(vehicle)
    {
        return {
            Vehicle:this.buybackVehicleVMToBuybackVehicle.map(vehicle),
            ResultDescriptionId:this.saleOption,
            ReasonId:this.reason
        }
    }

    createAbsBuyback(vehicle)
    {
        vehicle.SaleInstanceId = this.absOptionLocationInstanceId;
        vehicle.SaleId = this.absOptionLocationId;
        this.repositoryService.AbsBuybackResultRepository.insert(vehicle);
    }

    resetProperties(properties)
    {
        return function () {
                for(var property of properties)
                    this.state[property] = null;
            }
    }
}