
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class StatusRepository
{
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('http://localhost:63778/api/buybackstatus/')
        });
    }

getAll()
{
    return this.http.fetch('');
}
}