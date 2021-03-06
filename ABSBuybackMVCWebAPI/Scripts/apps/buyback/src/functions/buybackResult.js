﻿import {CreateBuyback} from '../CreateBuyback';

export let buybackResultFunctions = {
    get isAbsSale() {
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
    update: function update() {
        this.validation.validate() //the validate will fulfil when validation is valid, and reject if not
                        .then( () => {
                            this.updateIfChanged();
        }).catch(err => {});
    },
    updateIfChanged: function updateIfChanged()
    {
        for (var property in this.currentValues) {
            if (this.currentValues[property] != this[property] ) {
                this.updateCurrentValues(property);
                this.doUpdate();
                return;
            }
        }
    },
    doUpdate: function doUpdate()
    {
        let buybackResult = this.mapper.map(this);
        return this.update(buybackResult);
    },
    updateCurrentValues: function updateCurrentValues(property)
    {
        this.currentValues[property] = this[property];
    },
    statusChanged()
    {
        if(this.StatusDescriptionId === 2)
            promptForNewSale.call(this);
        else
            this.doUpdate();
    }
}


function promptForNewSale() {
    this.dialogService.open({ viewModel: CreateBuyback, model: {buyback:this}}).then(response => {
        if (!response.wasCancelled) {
        console.log('good - ', response.output);
} else {
            console.log('bad');
}
console.log(response.output);
});
}