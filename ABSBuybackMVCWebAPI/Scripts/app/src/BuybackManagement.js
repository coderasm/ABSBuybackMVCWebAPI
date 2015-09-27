import {BuybackResultViewModel} from 'viewModels/BuybackResultViewModel';
import {BuybackResult} from 'models/BuybackResult';
import {Mapper} from 'utilities/Mapper';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';

@inject(RepositoryService, Mapper)
export class Buybacks {
    heading = 'Buyback Without Reserves';
    buybacks = [];
    saleOptions = [];
    statuses = [];

    constructor(repositoryService, mapper) {
        this.repositoryService = repositoryService;
        this.mapper = mapper;
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
        this.repositoryService.BuybackResultRepository.getAll(0,0)
          .then(response => response.json())
          .then(json => $.map(json,(v) => {return new BuybackResultViewModel(v)}))
          .then(buybacks => this.buybacks = buybacks);
    }

    updateBuybackResult(buybackResult)
    {
        buybackResult = this.mapper.map(buybackResult, BuybackResult);
        this.repositoryService.BuybackResultRepository.update(buybackResult);
    }
}
