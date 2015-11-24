import {DialogController} from 'aurelia-dialog';

export class CreateBuyback {
    static inject = [DialogController];
    lookup = null;
    buyback = null;
    constructor(controller){
        this.controller = controller;
    }
    activate(model) {
        this.lookup = model.lookup;
        this.buyback = model.buyback;
    }
}