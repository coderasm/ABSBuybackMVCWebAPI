import {customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Validation} from 'aurelia-validation';
import {inject} from 'aurelia-framework';

@customElement('buyback-creator')
@inject(Validation, EventAggregator)
export class BuybackCreator {
    @bindable reasons = [];
    @bindable saleOptions = [];
    @bindable absOptionLocations = [];

    absOptionSaleLocationInstances = [];
    saveProperties = ["reason", "saleOption", "absOptionLocationId"];
    reason = null;
    saleOption = null;
    absOptionLocationId = null;
    absOptionLocationInstanceId = -1;

    constructor(validation, eventAggregator)
    {
        this.eventAggregator = eventAggregator;
        this.eventAggregator.subscribe("resetSaveProperties", this.resetProperties.bind(this));
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

    get showAbsSaleLocations()
    {
        return this.saleOption == 10 ? true : false;
    }

    get showLocationSales()
    {
        return this.showAbsSaleLocations && this.absOptionLocationId !== null;
    }

    reasonSelected()
    {
        this.eventAggregator.publish("reasonSelected", this.reason);
    }

    saleOptionSelected()
    {
        this.eventAggregator.publish("saleOptionSelected", this.saleOption);
        this.absOptionLocationId = null;
        this.absOptionLocationInstanceId = -1;
        if(this.saleOption == 10)
            this.absSaleValidation.validate().catch(err=>{});
    }

    absOptionLocationSelected()
    {
        this.eventAggregator.publish("absSaleLocationSelected", this.absOptionLocationId);
        this.absOptionLocationInstanceId = -1;
        if (this.absOptionLocationId === null)
            return;
        this.setSales();
        this.absSaleValidation.validate().catch(err=>{});

    }

    absSaleInstanceSelected()
    {
        this.eventAggregator.publish("absSaleInstanceSelected", this.absOptionLocationInstanceId);
    }

    setSales()
    {
        for(let saleLocation of this.absOptionLocations)
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
        this.eventAggregator.publish("createBuyback");
    }

    isValid()
    {
        this.nonAbsSaleValidation.validate().catch(err => {});
        this.absSaleValidation.validate().catch(err => {});
        if(!this.nonAbsSaleValidation.result.isValid || !this.absSaleValidation.result.isValid)
            return false;
        return true;
    }

    resetProperties()
    {
        for(var property of this.saveProperties)
            this[property] = null;
    }
}