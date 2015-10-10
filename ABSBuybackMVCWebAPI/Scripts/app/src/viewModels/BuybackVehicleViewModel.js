export class BuybackVehicleViewModel
{
    create = false;
    reserve = null;

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
        this.createReserveNullableSubscriber();
    }

    createReserveNullableSubscriber()
    {
        this.observerLocator
                .getObserver(this, "Reserve")
                .subscribe(this.onChangeOfReserve);
    }

    onChangeOfReserve(newValue, OldValue)
    {
        if(newValue === "")
            this.Reserve = null;
    }

    showDateOnly() {
        return new Date(this.SaleFirstDate).toDateString();
    }
}