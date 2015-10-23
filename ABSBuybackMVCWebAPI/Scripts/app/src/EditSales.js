//import {BuybackResultViewModel} from 'viewModels/BuybackResultViewModel';
import {BuybackResultViewModelFactory} from 'viewModels/BuybackResultViewModelFactory';
import {BuybackResultVMToBuybackResult} from 'utilities/mapping/BuybackResultVMToBuybackResult';
import {EditSaleStateToBuybackResultQuery} from 'utilities/mapping/EditSaleStateToBuybackResultQuery';
import {EditSaleState} from 'vmstate/EditSaleState';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';
import {ObserverLocator} from 'aurelia-binding';  // or 'aurelia-framework'

@inject(RepositoryService, BuybackResultVMToBuybackResult, EditSaleStateToBuybackResultQuery, Validation, ObserverLocator, EditSaleState)
export class Buybacks {
    heading = 'Buyback';
    searchProperties = ['resultDescriptionId'];
    pageNumber = 1;
    pageSize = 15;

    constructor(repositoryService, buybackResultVMToBuybackResult, editSaleStateToBuybackResultQuery, validation, observerLocator, editSaleState) {
        this.repositoryService = repositoryService;
        this.buybackResultVMToBuybackResult = buybackResultVMToBuybackResult;
        this.editSaleStateToBuybackResultQuery = editSaleStateToBuybackResultQuery;
        this.state = editSaleState;
        this.validation = validation;
        this.observerLocator = observerLocator;
    }

    activate()
    {
        if(this.state.allBuybacks.length === 0) {
            Promise.all([
                    this.loadBuybackResults(),
                    this.loadSaleOptions(),
                    this.loadStatuses()
                ]).then((data) =>
                {
                    this.setBuybacks(data[0]);
                    this.setSaleOptions(data[1]);
                    this.setStatuses(data[2]);
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

    loadAbsBuybackResults()
    {
        var queryObject = this.createQueryObject();
        return this.repositoryService.AbsBuybackResultRepository.search(queryObject)
              .then(response => response.json())
              .then(json => $.map(json,(v) =>
    {
        return BuybackResultViewModelFactory(v, this.validation, this.buybackResultVMToBuybackResult, this.repositoryService)
    }));
    }

    loadBuybackResults()
    {
        var queryObject = this.createQueryObject();
        return this.repositoryService.BuybackResultRepository.search(queryObject)
              .then(response => response.json())
              .then(json => $.map(json,(v) =>
    {
        return BuybackResultViewModelFactory(v, this.validation, this.buybackResultVMToBuybackResult, this.repositoryService)
    }));
    }

    setBuybacks(buybackResults)
    {
        this.state.shownBuybacks = buybackResults.slice(this.pageNumber-1, this.pageSize-1);
        this.state.queriedBuybacks = buybackResults;
        this.state.allBuybacks = buybackResults;
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
