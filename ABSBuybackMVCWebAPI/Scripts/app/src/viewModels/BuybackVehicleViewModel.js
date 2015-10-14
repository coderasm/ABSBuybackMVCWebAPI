export class BuybackVehicleViewModel
{
    create = false;
    reserve = null;

    constructor(data, validation, observerLocator) {
        Object.assign(this, data);
        this.observerLocator = observerLocator;
        this.validation = validation.on(this)
            .ensure('reserve')
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
                .getObserver(this, "reserve")
                .subscribe(this.onChangeOfReserve);
    }

    onChangeOfReserve(newValue, OldValue)
    {
        if(newValue === "")
            this.reserve = null;
    }

    showDateOnly() {
        return new Date(this.SaleFirstDate).toDateString();
    }
}