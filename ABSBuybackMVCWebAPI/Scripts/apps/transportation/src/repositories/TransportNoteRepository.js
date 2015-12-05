import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

export class TransportNoteRepository
{
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config
              .useStandardConfiguration()
              .withBaseUrl('api/transportNote/')
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

    search(transportNoteQueryObject)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "POST",
            body: JSON.stringify(transportNoteQueryObject)
        }
        return this.http.fetch('search', requestInit);
    }

    searchPaged(transportNoteQueryObject, pageNumber, pageSize)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "POST",
            body: JSON.stringify(transportNoteQueryObject)
        }
        var uri = "search/" + pageNumber + "/" + pageSize;
        return this.http.fetch(uri, requestInit);
    }

    update(transportNote)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "PUT",
            body: JSON.stringify(transportNote)
        }
        return this.http.fetch('', requestInit);
    }

    insert(transportNote)
    {
        var requestInit = {
            headers: {"content-type" : "application/json"},
            method: "POST",
            body: JSON.stringify(transportNote)
        }
        return this.http.fetch('', requestInit);
    }
}