export class BuybackVehicleViewModel
{
    create = false;

    constructor(data, validation, observerLocator) {
        Object.assign(this, data);
        this.observerLocator = observerLocator;
        this.validation = validation.on(this)
            .ensure('Reserve')
                .containsOnly(/^[1-9]\d*$|^$/)
            .onValidate( () => {
                    return {
                    }
            },(onValidateError)=>{ alert("Fix errors.")});
    }

    showDateOnly() {
        return new Date(this.SaleFirstDate).toDateString();
    }

    isValid()
    {
        this.validation.validate().catch(err => {});
        return this.validation.result.isValid;
    }
}