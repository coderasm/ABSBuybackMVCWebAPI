import {customElement, bindable} from 'aurelia-framework';

@customElement('buyback-vehicle')
export class BuybackVehicle {
    @bindable vehicle;

    showDateOnly() {
        return new Date(this.vehicle.SaleFirstDate).toDateString();
    }
}