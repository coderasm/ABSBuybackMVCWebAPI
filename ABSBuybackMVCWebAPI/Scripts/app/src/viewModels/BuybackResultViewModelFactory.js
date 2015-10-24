﻿
export function BuybackResultViewModelFactory(vehicle, validation, mapper, repositoryService)
{
    let prototype = {
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
        doUpdate: function doUpdate()
        {
            let buybackResult = this.mapper.map(this);
            this.repositoryService.BuybackResultRepository.update(buybackResult);
        },
        updateCurrentValues: function updateCurrentValues(property)
        {
            this.currentValues[property] = this[property];

        }
    };

    let instanceMembers = {
        validation: validation,
        mapper: mapper,
        repositoryService: repositoryService
    };

    let instance = Object.assign(Object.create(prototype), { currentValues: vehicle }, vehicle, instanceMembers);

    function initialize() {
        instance.validation = instance.validation.on(instance)
                    .ensure('Reserve')
                        .containsOnly(/^[1-9]\d*$|^$/)
                    .ensure('HighBid')
                        .containsOnly(/^[1-9]\d*$|^$/)
                    .onValidate( () => {
                        return {
                        }
                    },(onValidateError)=>{ alert("Fix errors.")});
    }
    initialize();
    return instance;
}