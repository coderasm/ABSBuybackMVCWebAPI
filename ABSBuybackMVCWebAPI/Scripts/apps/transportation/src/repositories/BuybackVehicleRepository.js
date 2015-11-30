import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class BuybackVehicleRepository
{
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('/api/buybackvehicle/')
        });
    }

    getAll()
    {
        return this.http.fetch('');
    }

    paged(pageNumber, pageSize)
    {
        var uri = "paged/" + pageNumber + "/" + pageSize;
        return this.http.fetch(uri);
    }

    search(buybackVehicleQueryObject)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "POST",
            body: JSON.stringify(buybackVehicleQueryObject)
        }
        return this.http.fetch('search', requestInit);
    }

    searchPaged(buybackVehicleQueryObject, pageNumber, pageSize)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "POST",
            body: JSON.stringify(buybackVehicleQueryObject)
        }
        var uri = "search/" + pageNumber + "/" + pageSize;
        return this.http.fetch(uri, requestInit);
    }
}