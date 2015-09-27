import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class BuybackVehicleRepository
{
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('http://localhost:63778/api/buybackvehicle/')
        });
    }

    getAll()
    {
        return this.http.fetch('');
    }

    search(buybackVehicleQueryObject)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "GET",
            body: JSON.stringify(buybackVehicleQueryObject)
        }
        return this.http.fetch('', requestInit);
    }

    //getAll(searchOptions)
    //{
    //    return this.http
    //        .withContent(searchOptions)
    //        .fetch();
    //}
}