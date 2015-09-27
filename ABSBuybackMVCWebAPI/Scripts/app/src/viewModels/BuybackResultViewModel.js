export class BuybackResultViewModel
{
    currentValues = {};

    constructor(data) {
        Object.assign(this, data);
        Object.assign(this.currentValues, data);
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