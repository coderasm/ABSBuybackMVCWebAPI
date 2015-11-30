
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class SaleOptionRepository
{
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('api/saleoption/')
        });
    }

getAll()
{
    return this.http.fetch('');
}
}