import {BuybackVehicleViewModel} from 'viewModels/BuybackVehicleViewModel';
import {BuybackResult} from 'models/BuybackResult';
import {Dealer} from 'models/Dealer';
import {SaleLocation} from 'models/SaleLocation';
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
        this.repositoryService.BuybackVehicleRepository.getAll()
          .then(response => response.json())
          .then(json => $.map(json,(v) => {return new BuybackVehicleViewModel(v)}))
          .then(vehicles => this.vehicles = vehicles);
    }

    loadLocations()
    {
        var locations = $.map(this.vehicles, v =>
                            {
                                return Object.create(SaleLocation.prototype, {id:{value:v.SaleLocationId},name:{value:v.SaleLocation}});
                            }).distinct();
        locations.push(Object.create(SaleLocation.prototype, {id:{value:null},name:{value:"All"}}));
        this.locations = locations;
    }

    loadDealers()
    {
        var dealers = $.map(this.vehicles, v =>
                            {
                                return Object.create(Dealer.prototype, {id:{value:v.BuyerId},name:{value:v.Buyer}});
                            }).distinct();
        dealers.push(Object.create(Dealer.prototype, {id:{value:null},name:{value:"All"}}));
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
