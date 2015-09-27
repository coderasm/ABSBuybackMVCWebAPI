
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class SaleOptionRepository
{
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('http://localhost:63778/api/saleoption/')
        });
    }

getAll()
{
    return this.http.fetch('');
}
}