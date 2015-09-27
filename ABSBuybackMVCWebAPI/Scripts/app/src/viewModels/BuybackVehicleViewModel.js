export class BuybackVehicleViewModel
{
    currentValues = {};
    create = false;

    constructor(data) {
        Object.assign(this, data);
        Object.assign(this.currentValues, data);
    }
}