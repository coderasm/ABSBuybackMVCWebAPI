import {DialogController} from 'aurelia-dialog';

export class CreateBuyback {
    static inject = [DialogController];
    rejectedBuyback = null;
    constructor(controller){
        this.controller = controller;
    }
    activate(rejectedBuyback) {
        this.rejectedBuyback = rejectedBuyback
    }
}