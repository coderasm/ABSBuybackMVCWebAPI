import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class BuybackResultRepository
{
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('api/buybackresult/')
        });
    }

getAll(reserve, status)
{
    var uri = reserve + "/" + status;
    return this.http.fetch(uri);
}

paged(pageNumber, pageSize)
{
    var uri = "paged/" + pageNumber + "/" + pageSize;
    return this.http.fetch(uri);
}

search(buybackResultQueryObject)
{
    var requestInit = {
        headers: {"content-type" : "application/json"},
        method: "POST",
        body: JSON.stringify(buybackResultQueryObject)
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

update(buybackResult)
{
    var requestInit = {
        headers: {"content-type" : "application/json"},
        method: "PUT",
        body: JSON.stringify(buybackResult)
    }
    return this.http.fetch('', requestInit);
}

insert(vehicleWithChoices)
{
    var requestInit = {
        headers: {"content-type" : "application/json"},
        method: "POST",
        body: JSON.stringify(vehicleWithChoices)
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