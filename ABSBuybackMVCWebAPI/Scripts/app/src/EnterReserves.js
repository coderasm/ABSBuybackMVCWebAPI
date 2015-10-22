import {BuybackResultViewModel} from 'viewModels/BuybackResultViewModel';
import {BuybackResultVMToBuybackResult} from 'utilities/mapping/BuybackResultVMToBuybackResult';
import {EnterReserveStateToBuybackResultQuery} from 'utilities/mapping/EnterReserveStateToBuybackResultQuery';
import {EnterReservesState} from 'vmstate/EnterReservesState';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';
import {ObserverLocator} from 'aurelia-binding';  // or 'aurelia-framework'

@inject(RepositoryService, BuybackResultVMToBuybackResult, EnterReserveStateToBuybackResultQuery, Validation, ObserverLocator, EnterReservesState)
export class Buybacks {
    heading = 'Buyback Without Reserves';
    pageNumber = 1;
    pageSize = 15;

    constructor(repositoryService, buybackResultVMToBuybackResult, enterReserveStateToBuybackResultQuery, validation, observerLocator, enterReservesState) {
        this.repositoryService = repositoryService;
        this.buybackResultVMToBuybackResult = buybackResultVMToBuybackResult;
        this.enterReserveStateToBuybackResultQuery = enterReserveStateToBuybackResultQuery;
        this.state = enterReservesState;
        this.validation = validation;
        this.observerLocator = observerLocator;
    }

    activate()
    {
        if(this.state.allBuybacks.length === 0) {
            Promise.all([
                    this.loadBuybackResults(),
                    this.loadSaleOptions()
            ]).then((data) =>
                {
                    this.setBuybacks(data[0]);
                    this.setSaleOptions(data[1]);
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

    loadBuybackResults()
    {
        var queryObject = this.createQueryObject();
        return this.repositoryService.BuybackResultRepository.search(queryObject)
              .then(response => response.json())
              .then(json => $.map(json,(v) => {return new BuybackResultViewModel(v, this.validation, this.observerLocator)}));
    }

    setBuybacks(buybackResults)
    {
        this.state.shownBuybacks = buybackResults.slice(this.pageNumber-1, this.pageSize-1);
        this.state.queriedBuybacks = buybackResults;
        this.state.allBuybacks = buybackResults;
    }

    createQueryObject()
    {
        return this.enterReserveStateToBuybackResultQuery.map(this.state);
    }

    updateBuybackResult(buybackResult)
    {
        buybackResult = this.buybackResultVMToBuybackResult.map(buybackResult);
        this.repositoryService.BuybackResultRepository.update(buybackResult);
    }
}
