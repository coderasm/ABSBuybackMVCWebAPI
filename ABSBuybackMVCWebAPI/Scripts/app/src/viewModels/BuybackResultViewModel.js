
export class BuybackResultViewModel
{
    currentValues = {};

    constructor(data, validation, mapper, observerLocator, repositoryService) {
        Object.assign(this, data);
        Object.assign(this.currentValues, data);
        this.observerLocator = observerLocator;
        this.repositoryService = repositoryService;
        this.mapper = mapper;
        this.validation = validation.on(this)
            .ensure('Reserve')
                .containsOnly(/^[1-9]\d*$|^$/)
            .ensure('HighBid')
                .containsOnly(/^[1-9]\d*$|^$/)
            .onValidate( () => {
                    return {
                    }
            },(onValidateError)=>{ alert("Fix errors.")});
    }

    get isAbsSale()
    {
        return this.ResultDescriptionId == 10;
    }

    get isNonAbsSale()
    {
        return this.ResultDescriptionId != 10;
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

    update()
    {
        this.validation.validate() //the validate will fulfil when validation is valid, and reject if not
                       .then( () => {
                           this.updateIfChanged();
                       }).catch(err => {});
    }

    updateIfChanged()
    {
        for (var property in this.currentValues) {
            if (this.currentValues[property] !== this[property] ) {
                this.updateCurrentValues(property);
                this.doUpdate();
                return;
            }
        }
    }

    doUpdate()
    {
        let buybackResult = this.mapper.map(this);
        this.repositoryService.BuybackResultRepository.update(buybackResult);
    }

    updateCurrentValues(property)
    {
        this.currentValues[property] = this[property];

    }
}