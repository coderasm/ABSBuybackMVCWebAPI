import {BuybackVehicleViewModel} from 'viewModels/BuybackVehicleViewModel';
import {BuybackResult} from 'models/BuybackResult';
import {Dealer} from 'models/Dealer';
import {SaleLocation} from 'models/SaleLocation';
import {Mapper} from 'utilities/Mapper';
import * from 'utilities/ArrayExtensions';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';

@inject(RepositoryService, Mapper)
export class Buybacks {
    heading = 'Buyback Vehicles Needing New Sale';
    saleLocations = [];
    dealers = [];
    vehicles = [];
    reasons = [];
    saleOptions = [];
    saleLocation = null;
    dealer = null;
    vehicleIds = null;
    reason = 0;
    saleOption = 0;

    constructor(repositoryService, mapper) {
        this.repositoryService = repositoryService;
        this.mapper = mapper;
    }

    activate()
    {
        this.loadBuybackVehicles();
        this.loadLocations();
        this.loadDealers();
        this.loadReasons();
        return this.loadSaleOptions();
    }

    loadBuybackVehicles()
    {
        this.repositoryService.BuybackResultRepository.getAll(0,0)
          .then(response => response.json())
          .then(json => $.map(json,(v) => {return new BuybackResultViewModel(v)}))
          .then(buybacks => this.buybacks = buybacks);
    }

    loadLocations()
    {
        var locations = $.map(vehicles, v =>
                            {
                                return Object.create(SaleLocation.prototype, {id:{value:v.SaleLocationId},name:{value:v.SaleLocation}});
                            }).distinct();
    }

    loadDealers()
    {
        var dealers = $.map(vehicles, v =>
                            {
                                return Object.create(Dealer.prototype, {id:{value:v.BuyerId},name:{value:v.Buyer}});
                            }).distinct();
    }

    loadReasons()
    {
        this.repositoryService.ReasonRepository.getAll()
            .then(response => response.json())
            .then(reasons => this.reasons = reasons);
    }

    loadSaleOptions()
    {
        this.repositoryService.SaleOptionRepository.getAll()
            .then(response => response.json())
            .then(saleOptions => this.saleOptions = saleOptions);
    }
}
