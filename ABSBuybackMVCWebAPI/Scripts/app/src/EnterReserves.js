import {BuybackResultViewModel} from 'viewModels/BuybackResultViewModel';
import {AbsBuybackResultViewModelFactory} from 'viewModels/AbsBuybackResultViewModelFactory';
import {BuybackResultVMToBuybackResult} from 'utilities/mapping/BuybackResultVMToBuybackResult';
import {AbsBuybackResultVMToAbsBuybackResult} from 'utilities/mapping/AbsBuybackResultVMToAbsBuybackResult';
import {EnterReserveStateToBuybackResultQuery} from 'utilities/mapping/EnterReserveStateToBuybackResultQuery';
import {EnterReservesState} from 'vmstate/EnterReservesState';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';

@inject(RepositoryService, BuybackResultVMToBuybackResult, AbsBuybackResultVMToAbsBuybackResult, EnterReserveStateToBuybackResultQuery, Validation, EnterReservesState)
export class Buybacks {
    heading = 'Enter Reserves';
    pageNumber = 1;
    pageSize = 15;

    constructor(repositoryService, buybackResultVMToBuybackResult, absBuybackResultVMToAbsBuybackResult, enterReserveStateToBuybackResultQuery, validation, enterReservesState) {
        this.repositoryService = repositoryService;
        this.buybackResultVMToBuybackResult = buybackResultVMToBuybackResult;
        this.absBuybackResultVMToAbsBuybackResult = absBuybackResultVMToAbsBuybackResult;
        this.enterReserveStateToBuybackResultQuery = enterReserveStateToBuybackResultQuery;
        this.state = enterReservesState;
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
              .then(json => $.map(json,v => {return AbsBuybackResultViewModelFactory(v, this.validation, this.absBuybackResultVMToAbsBuybackResult, this.repositoryService)}));
    }

    loadBuybackResults()
    {
        var queryObject = this.createQueryObject();
        return this.repositoryService.BuybackResultRepository.search(queryObject)
              .then(response => response.json())
              .then(json => $.map(json, v => {return BuybackResultViewModel(this.validation, this.buybackResultVMToBuybackResult, this.repositoryService).create(v)}));
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
        return this.enterReserveStateToBuybackResultQuery.map(this.state);
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
