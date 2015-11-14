import {BuybackResultViewModel} from 'viewModels/BuybackResultViewModel';
import {AbsBuybackResultViewModel} from 'viewModels/AbsBuybackResultViewModel';
import {BuybackResultVMToBuybackResult} from 'utilities/mapping/BuybackResultVMToBuybackResult';
import {AbsBuybackResultVMToAbsBuybackResult} from 'utilities/mapping/AbsBuybackResultVMToAbsBuybackResult';
import {EditSaleStateToBuybackResultQuery} from 'utilities/mapping/EditSaleStateToBuybackResultQuery';
import {EditSaleState} from 'vmstate/EditSaleState';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';

@inject(RepositoryService, BuybackResultVMToBuybackResult, AbsBuybackResultVMToAbsBuybackResult, EditSaleStateToBuybackResultQuery, Validation, EditSaleState)
export class Buybacks {
    heading = 'Edit Buybacks';
    searchProperties = ['resultDescriptionId'];
    pageNumber = 1;
    pageSize = 15;

    constructor(repositoryService, buybackResultVMToBuybackResult, absBuybackResultVMToAbsBuybackResult, editSaleStateToBuybackResultQuery, validation, editSaleState) {
        this.repositoryService = repositoryService;
        this.buybackResultVMToBuybackResult = buybackResultVMToBuybackResult;
        this.absBuybackResultVMToAbsBuybackResult = absBuybackResultVMToAbsBuybackResult;
        this.editSaleStateToBuybackResultQuery = editSaleStateToBuybackResultQuery;
        this.state = editSaleState;
        this.validation = validation;
    }

    activate()
    {
        if(this.state.allBuybacks.length === 0) {
            Promise.all([
                    this.loadBuybackResults(),
                    this.loadAbsBuybackResults(),
                    this.loadSaleOptions(),
                    this.loadStatuses(),
                    this.loadLocations()
                ]).then((data) =>
                {
                    this.setBuybacks(data[0].concat(data[1]));
                    this.setSaleOptions(data[2]);
                    this.setStatuses(data[3]);
                    this.setLocations(data[4]);
                });
        }
    }

    loadSaleOptions()
    {
        return this.repositoryService.SaleOptionRepository.getAll()
               .then(response => response.json());
    }

    setSaleOptions(saleOptions)
    {
        saleOptions.unshift({ResultDescriptionId:null,ResultDescription:"All"});
        this.state.saleOptions = saleOptions;
    }

    loadStatuses()
    {
        return this.repositoryService.StatusRepository.getAll()
               .then(response => response.json());
    }

    setStatuses(statuses)
    {
        this.state.statuses = statuses;
    }

    loadLocations()
    {
        return this.repositoryService.SaleLocationRepository.getAll()
                .then(response => response.json());
    }

    setLocations(locations)
    {
        this.state.saleLocations = locations;
    }

    loadAbsBuybackResults()
    {
        var queryObject = this.createQueryObject();
        return this.repositoryService.AbsBuybackResultRepository.search(queryObject)
              .then(response => response.json())
              .then(json => $.map(json,v => {return AbsBuybackResultViewModel(this.validation, this.absBuybackResultVMToAbsBuybackResult, this.repositoryService).create(v)}));
    }

    loadBuybackResults()
    {
        var queryObject = this.createQueryObject();
        return this.repositoryService.BuybackResultRepository.search(queryObject)
              .then(response => response.json())
              .then(json => $.map(json, v => {return BuybackResultViewModel(v, this.validation, this.buybackResultVMToBuybackResult, this.repositoryService)}));
    }

    setBuybacks(buybackResults)
    {
        this.state.shownBuybacks = buybackResults.slice(this.pageNumber-1, this.pageSize-1);
        this.state.queriedBuybacks = buybackResults;
        this.state.allBuybacks = buybackResults;
    }

    loadAllBuybackResults()
    {
        Promise.all([
                    this.loadBuybackResults(),
                    this.loadAbsBuybackResults()
        ]).then((data) =>
                {
                    this.setBuybacks(data[0].concat(data[1]));
    });
    }

    createQueryObject()
    {
        this.nullSearchProperties();
        return this.editSaleStateToBuybackResultQuery.map(this.state);
    }

    saleOptionSelected()
    {
        this.nullSearchProperties();
        this.loadBuybackResultsFromVM();
    }

    nullSearchProperties()
    {
        for (var property of this.searchProperties) {
            if (this.state[property] === "null")
                this.state[property] = null;
        }
    }

    loadBuybackResultsFromVM()
    {
        this.state.queriedBuybacks = this.state.allBuybacks.filter(b => this.doesMatch(b));
        this.state.shownBuybacks = this.state.queriedBuybacks.slice(this.pageNumber-1, this.pageSize-1);
    }

    doesMatch(buyback)
    {
        var predicate = true;
        if (this.state.resultDescriptionId !== null)
            predicate = buyback.ResultDescriptionId == this.state.resultDescriptionId;
        return predicate;
    }
}
