import {customElement, bindable} from 'aurelia-framework';

@customElement('select-all-none')
export class SelectAllNone {
    @bindable items;
    @bindable selector;

    selectAll() {
        for (var item of this.items) {
            item[this.selector] = true;
        }
    }

    selectNone() {
        for (var item of this.items) {
            item[this.selector] = false;
        }
    }
}