
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class SaleLocationRepository
{
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('http://localhost:63778/api/salelocation/')
        });
    }

    getAll()
    {
        return this.http.fetch('');
    }
}