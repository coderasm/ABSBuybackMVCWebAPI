import {DialogController} from 'aurelia-dialog';
import {Lookups} from './lookups/lookups';

export class CreateBuyback {
    static inject = [DialogController, Lookups];
    lookup = null;
    buyback = null;
    constructor(controller, lookups){
        this.controller = controller;
        this.lookup = lookups;
    }
    activate(model) {
        this.buyback = model.buyback;
        return this.lookup.initialize();
    }
}