export function BuybackResult() {
    return {
        get isAbsSale()
        {
            return this.ResultDescriptionId == 10;
        },
        get isNonAbsSale()
        {
            return this.ResultDescriptionId != 10;
        },
        lastSixOfVIN: function lastSixOfVIN()
        {
            var indexForLastSix = this.VIN.length - 7;
            return this.VIN.substring(indexForLastSix);
        },
        sale: function sale(sales)
        {
            for(let sale of sales)
                if (sale.ResultDescriptionId === this.ResultDescriptionId)
                return sale.ResultDescription;
        },
        update: function update()
        {
            this.validation.validate() //the validate will fulfil when validation is valid, and reject if not
                           .then( () => {
                               this.updateIfChanged();
                           }).catch(err => {});
        },
        updateIfChanged: function updateIfChanged()
        {
            for (var property in this.currentValues) {
                if (this.currentValues[property] !== this[property] ) {
                    this.updateCurrentValues(property);
                    this.doUpdate();
                    return;
                }
            }
        },
        updateCurrentValues: function updateCurrentValues(property)
        {
            this.currentValues[property] = this[property];

        }
    };
}