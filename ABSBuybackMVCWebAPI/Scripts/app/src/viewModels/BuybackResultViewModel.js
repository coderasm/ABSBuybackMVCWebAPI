
export class BuybackResultViewModel
{
    currentValues = {};

    constructor(data, validation, observerLocator) {
        Object.assign(this, data);
        Object.assign(this.currentValues, data);
        this.observerLocator = observerLocator;
        this.validation = validation.on(this)
            .ensure('Reserve')
                .containsOnly(/^[1-9]\d*$|^$/)
            .onValidate( () => {
                    return {
                    }
            },(onValidateError)=>{ alert("Fix errors.")});
    }

    lastSixOfVIN()
    {
        var indexForLastSix = this.VIN.length - 7;
        return this.VIN.substring(indexForLastSix);
    }

    sale(sales)
    {
        for(let sale of sales)
            if (sale.ResultDescriptionId === this.ResultDescriptionId)
                return sale.ResultDescription;
        }

    updateIfChanged(event, parent)
    {
        this.validation.validate() //the validate will fulfil when validation is valid, and reject if not
                       .then( () => {
                           this.doUpdate(parent);
                       }).catch(err => {});
    }

    doUpdate(parent)
    {
        for (var property in this.currentValues) {
            if (this.currentValues[property] !== this[property] ) {
                this.updateCurrentValues(property);
                parent.updateBuybackResult(this);
                return;
            }
        }
    }

    updateCurrentValues(property, parent)
    {
        this.currentValues[property] = this[property];

    }
}