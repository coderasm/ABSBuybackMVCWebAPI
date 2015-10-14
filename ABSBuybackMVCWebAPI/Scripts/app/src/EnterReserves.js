import {BuybackResultViewModel} from 'viewModels/BuybackResultViewModel';
import {BuybackResult} from 'models/BuybackResult';
import {BuybackResultQuery} from 'models/BuybackResultQuery';
import {Mapper} from 'utilities/Mapper';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';
import {singleton} from 'aurelia-framework';
import {ObserverLocator} from 'aurelia-binding';  // or 'aurelia-framework'

@singleton()
@inject(RepositoryService, Mapper, Validation, ObserverLocator)
export class Buybacks {
    heading = 'Buyback Without Reserves';
    buybacks = [];
    saleOptions = [];
    statuses = [];
    resultDescriptionId = null;
    statusDescriptionId = 0;
    reserve = 0;

    constructor(repositoryService, mapper, validation, observerLocator) {
        this.repositoryService = repositoryService;
        this.mapper = mapper;
        this.validation = validation;
        this.observerLocator = observerLocator;
    }

    activate()
    {
        this.loadSaleOptions();
        this.loadStatuses();
        return this.loadBuybackResults();
    }

    loadSaleOptions()
    {
        this.repositoryService.SaleOptionRepository.getAll()
            .then(response => response.json())
            .then(saleOptions => this.saleOptions = saleOptions);
    }

    loadStatuses()
    {
        this.repositoryService.StatusRepository.getAll()
            .then(response => response.json())
            .then(statuses => this.statuses = statuses);
    }

    loadBuybackResults()
    {
        var queryObject = this.createQueryObject();
        this.repositoryService.BuybackResultRepository.search(queryObject)
          .then(response => response.json())
          .then(json => $.map(json,(v) => {return new BuybackResultViewModel(v, this.validation, this.observerLocator)}))
          .then(buybacks => this.buybacks = buybacks);
    }

    createQueryObject()
    {
        return this.mapper.map(this, BuybackResultQuery);
    }

    updateBuybackResult(buybackResult)
    {
        buybackResult = this.mapper.map(buybackResult, BuybackResult);
        this.repositoryService.BuybackResultRepository.update(buybackResult);
    }
}
