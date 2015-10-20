import {BuybackResultViewModel} from 'viewModels/BuybackResultViewModel';
import {BuybackResult} from 'models/BuybackResult';
import {EditSaleState} from 'vmstate/EditSaleState';
import {BuybackResultQuery} from 'models/BuybackResultQuery';
import {Mapper} from 'utilities/Mapper';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';
import {ObserverLocator} from 'aurelia-binding';  // or 'aurelia-framework'

@inject(RepositoryService, Mapper, Validation, ObserverLocator, EditSaleState)
export class Buybacks {
    heading = 'Buyback';
    searchProperties = ['saleOption'];
    pageNumber = 1;
    pageSize = 15;

    constructor(repositoryService, mapper, validation, observerLocator, editSaleState) {
        this.repositoryService = repositoryService;
        this.mapper = mapper;
        this.state = editSaleState;
        this.validation = validation;
        this.observerLocator = observerLocator;
    }

    activate()
    {
        if(this.state.saleOptions.length === 0)
            this.loadSaleOptions();
        if(this.state.statuses.length === 0)
            this.loadStatuses();    
        if(this.state.buybacks.length === 0)
            this.loadBuybackResults();
    }

    loadSaleOptions()
    {
        this.repositoryService.SaleOptionRepository.getAll()
            .then(response => response.json())
            .then(saleOptions =>
                {
                    saleOptions.unshift({ResultDescriptionId:null,ResultDescription:"All"});
                    this.state.saleOptions = saleOptions;
                }
            );
    }

    loadStatuses()
    {
        this.repositoryService.StatusRepository.getAll()
            .then(response => response.json())
            .then(statuses => this.state.statuses = statuses);
    }

    loadBuybackResults()
    {
        var queryObject = this.createQueryObject();
        this.repositoryService.BuybackResultRepository.search(queryObject)
          .then(response => response.json())
          .then(json => $.map(json,(v) => {return new BuybackResultViewModel(v, this.validation, this.observerLocator)}))
          .then(buybacks => this.state.buybacks = buybacks);
    }

    createQueryObject()
    {
        return this.mapper.map(this.state, BuybackResultQuery);
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
        this.state.queriedBuybacks = this.state.allBuybacks.filter(v => this.doesMatch(v));
        this.state.shownBuybacks = this.state.queriedBuybacks.slice(this.pageNumber-1, this.pageSize-1);
    }

    doesMatch(vehicle)
    {
        var predicate = true;
        if (this.state.resultDescriptionId !== null)
            predicate = vehicle.SaleLocationId == this.state.saleLocationId;
        return predicate;
    }

    updateBuybackResult(buybackResult)
    {
        buybackResult = this.mapper.map(buybackResult, BuybackResult);
        this.repositoryService.BuybackResultRepository.update(buybackResult);
    }
}
