import {BuybackResultViewModel} from 'viewModels/BuybackResultViewModel';
import {BuybackResult} from 'models/BuybackResult';
import {EnterReservesState} from 'vmstate/EnterReservesState';
import {BuybackResultQuery} from 'models/BuybackResultQuery';
import {Mapper} from 'utilities/Mapper';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';
import {ObserverLocator} from 'aurelia-binding';  // or 'aurelia-framework'

@inject(RepositoryService, Mapper, Validation, ObserverLocator, EnterReservesState)
export class Buybacks {
    heading = 'Buyback Without Reserves';

    constructor(repositoryService, mapper, validation, observerLocator, enterReservesState) {
        this.repositoryService = repositoryService;
        this.mapper = mapper;
        this.state = enterReservesState;
        this.validation = validation;
        this.observerLocator = observerLocator;
    }

    activate()
    {
        if(this.state.saleOptions.length === 0)
            this.loadSaleOptions();
        if(this.state.buybacks.length === 0)
            this.loadBuybackResults();
    }

    loadSaleOptions()
    {
        this.repositoryService.SaleOptionRepository.getAll()
            .then(response => response.json())
            .then(saleOptions => this.state.saleOptions = saleOptions);
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

    updateBuybackResult(buybackResult)
    {
        buybackResult = this.mapper.map(buybackResult, BuybackResult);
        this.repositoryService.BuybackResultRepository.update(buybackResult);
    }
}
