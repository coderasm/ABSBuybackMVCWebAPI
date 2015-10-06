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

update(buybackResult)
{
    var requestInit = {
        headers: {"content-type" : "application/json"},
        method: "PUT",
        body: JSON.stringify(buybackResult)
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