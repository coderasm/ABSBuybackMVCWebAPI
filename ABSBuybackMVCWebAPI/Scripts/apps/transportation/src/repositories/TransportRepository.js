import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class TransportRepository
{
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('api/transport/')
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

    search(transportQueryObject)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "POST",
            body: JSON.stringify(transportQueryObject)
        }
        return this.http.fetch('search', requestInit);
    }

    searchPaged(buybackResultQueryObject, pageNumber, pageSize)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "POST",
            body: JSON.stringify(buybackResultQueryObject)
        }
        var uri = "search/" + pageNumber + "/" + pageSize;
        return this.http.fetch(uri, requestInit);
    }

    update(transport)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "PUT",
            body: JSON.stringify(transport)
        }
        return this.http.fetch('', requestInit);
    }

    insert(transport)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "POST",
            body: JSON.stringify(transport)
        }
        return this.http.fetch('', requestInit);
    }
}