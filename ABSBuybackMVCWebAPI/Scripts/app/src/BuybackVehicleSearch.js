import {BuybackVehicleViewModel} from 'viewModels/BuybackVehicleViewModel';
import {BuybackResult} from 'models/BuybackResult';
import {Dealer} from 'models/Dealer';
import {SaleLocation} from 'models/SaleLocation';
import {BuybackVehicleQuery} from 'models/BuybackVehicleQuery';
import {Mapper} from 'utilities/Mapper';
import {ArrayExtensions} from 'utilities/ArrayExtensions';
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
    saleLocationId = null;
    buyerId = null;
    vehicleIds = [];
    reason = 0;
    saleOption = 0;
    pageNumber = 1;
    pageSize = 10;

    constructor(repositoryService, mapper) {
        this.repositoryService = repositoryService;
        this.mapper = mapper;
    }

    activate()
    {
        this.loadBuybackVehicles();
        this.loadReasons();
        return this.loadSaleOptions();
    }

    loadBuybackVehicles()
    {
        var queryObject = this.createQueryObject();
        this.repositoryService.BuybackVehicleRepository.search(queryObject)
          .then(response => response.json())
          .then(json => $.map(json,(v) => {return new BuybackVehicleViewModel(v)}))
          .then(vehicles => this.loadVehicles(vehicles));
}

    createQueryObject()
    {
        return this.mapper.map(this, BuybackVehicleQuery);
    }

    loadVehicles(vehicles)
    {
        this.vehicles = vehicles;
        this.loadLocations();
        this.loadDealers();
    }

    loadLocations()
    {
        var locations = $.map(this.vehicles, v =>
                            {
                                return Object.create(SaleLocation.prototype, {id:{value:v.SaleLocationId},name:{value:v.SaleLocation}});
                            }).distinct();
        locations.unshift(Object.create(SaleLocation.prototype, {id:{value:null},name:{value:"All"}}));
        this.saleLocations = locations;
    }

    loadDealers()
    {
        var dealers = $.map(this.vehicles, v =>
                            {
                                return Object.create(Dealer.prototype, {id:{value:v.BuyerId},name:{value:v.Buyer}});
                            }).distinct();
        dealers.unshift(Object.create(Dealer.prototype, {id:{value:null},name:{value:"All"}}));
        this.dealers = dealers;
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
