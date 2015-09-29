export class BuybackVehicleViewModel
{
    create = false;
    reserve = null;

    constructor(data) {
        Object.assign(this, data);
    }

    showDateOnly() {
        return new Date(this.SaleFirstDate).toDateString();
    }
}