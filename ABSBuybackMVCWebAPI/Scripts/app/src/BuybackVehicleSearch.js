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
    allVehicles = [];
    shownVehicles = [];
    queriedVehicles = [];
    reasons = [];
    saleOptions = [];
    saleLocationId = null;
    buyerId = null;
    vehicleIds = [];
    reason = 0;
    saleOption = 0;
    pageNumber = 1;
    pageSize = 15;

    constructor(repositoryService, mapper) {
        this.repositoryService = repositoryService;
        this.mapper = mapper;
    }

    activate()
    {
        if(this.allVehicles.length === 0)
            this.loadBuybackVehiclesFromApi();
        if(this.reasons.length === 0)
            this.loadReasons();
        if(this.saleOptions.length === 0)
            this.loadSaleOptions();
        return;
    }

    loadBuybackVehiclesFromApi()
    {
        var queryObject = this.createQueryObject();
        this.repositoryService.BuybackVehicleRepository.search(queryObject)
          .then(response => response.json())
          .then(json => $.map(json,(v) => {return new BuybackVehicleViewModel(v)}))
          .then(vehicles => this.loadVehicles(vehicles));
    }

    loadVehicles(vehicles)
    {
        this.shownVehicles = vehicles.slice(this.pageNumber-1, this.pageSize-1);
        this.allVehicles = vehicles;
        this.loadLocations();
        this.loadDealers(vehicles);
    }

    loadLocations()
    {
        var locations = $.map(this.allVehicles, v =>
                            {
                                return Object.create(SaleLocation.prototype, {id:{value:v.SaleLocationId},name:{value:v.SaleLocation}});
                            }).distinct();
        locations.unshift(Object.create(SaleLocation.prototype, {id:{value:null},name:{value:"All"}}));
        this.saleLocations = locations;
    }

    loadDealers(vehicles)
    {
        var dealers = $.map(vehicles, v =>
                            {
                                return Object.create(Dealer.prototype, {id:{value:v.BuyerId},name:{value:v.Buyer}});
                            }).distinct();
        dealers.unshift(Object.create(Dealer.prototype, {id:{value:null},name:{value:"All"}}));
        this.dealers = dealers;
    }

    loadBuybackVehiclesFromVM()
    {
        this.nullValues();
        this.queriedVehicles = this.allVehicles.filter(v => this.doesMatch(v));
        this.shownVehicles = this.queriedVehicles.slice(this.pageNumber-1, this.pageSize-1);
        this.loadDealers(this.queriedVehicles);
    }

    nullValues()
    {
        this.dealerUpdate();
        this.locationUpdate();
    }

    doesMatch(vehicle)
    {
        if(this.vehicleIds.length > 0)
            return this.matchesVids(vehicle);
        return this.matchFound(vehicle);

    }

    matchesVids(vehicle)
    {
        return this.vehicleIds.some(vid => vid == vehicle.VehicleId);
    }

    matchFound(vehicle)
    {
        var predicate = true;
        if (this.saleLocationId !== null)
            predicate = vehicle.SaleLocationId == this.saleLocationId;
        if(this.buyerId !== null)
            predicate = predicate && vehicle.BuyerId == this.buyerId;
        return predicate;
    }

    createQueryObject()
    {
        return this.mapper.map(this, BuybackVehicleQuery);
    }

    locationUpdate()
    {
        if (this.saleLocationId === "null")
            this.saleLocationId = null;
    }

    dealerUpdate()
    {
        if (this.buyerId === "null")
            this.buyerId = null;
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
