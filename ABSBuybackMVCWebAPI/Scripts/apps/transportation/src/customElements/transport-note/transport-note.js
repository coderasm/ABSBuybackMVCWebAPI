import {customElement, bindable} from 'aurelia-framework';

@customElement('transport-note')
export class TransportNote {
    @bindable note;
}