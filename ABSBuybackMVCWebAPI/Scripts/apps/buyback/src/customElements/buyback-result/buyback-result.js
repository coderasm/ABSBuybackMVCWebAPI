import {customElement, bindable} from 'aurelia-framework';

@customElement('buyback-result')
export class BuybackResult {
    @bindable buyback;
    @bindable lookup;
}