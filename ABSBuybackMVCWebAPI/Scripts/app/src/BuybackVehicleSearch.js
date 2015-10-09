import {BuybackVehicleViewModel} from 'viewModels/BuybackVehicleViewModel';
import {BuybackResult} from 'models/BuybackResult';
import {Dealer} from 'models/Dealer';
import {BuybackVehicleQuery} from 'models/BuybackVehicleQuery';
import {Mapper} from 'utilities/Mapper';
import {ArrayExtensions} from 'utilities/ArrayExtensions';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';
import {singleton} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {ObserverLocator} from 'aurelia-binding';  // or 'aurelia-framework'

@singleton()
@inject(RepositoryService, Mapper, ObserverLocator)
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
    reason = null;
    saleOption = null;
    absOptionLocations = [];
    absOptionLocationId = null;
    absOptionSaleLocationInstances = [];
    absOptionLocationInstanceId = -1;
    nullableValues = ["saleLocationId", "buyerId", "reason", "saleOption", "absOptionLocationId"];
    pageNumber = 1;
    pageSize = 15;

    constructor(repositoryService, mapper, observerLocator) {
        this.repositoryService = repositoryService;
        this.mapper = mapper;
        this.observerLocator = observerLocator;
        this.createNullableSubscribers();
    }

    createNullableSubscribers()
    {
        for (var property of this.nullableValues) {
            this.observerLocator
                .getObserver(this, property)
                .subscribe(this.onChange(property));
        }
    }

    onChange(property)
    {
        var self = this;
        return function(newValue, oldValue) {
            if (newValue === "null")
                self[property] = null;
        }
    }

    @computedFrom("saleOption")
    get showAbsSaleLocations()
    {
        return this.saleOption == 10 ? true : false;
    }

    @computedFrom("absOptionLocationId","showAbsSaleLocations")
    get showLocationSales()
    {
        return this.showAbsSaleLocations && this.absOptionLocationId !== null;
    }

    activate()
    {
        if(this.allVehicles.length === 0)
            this.loadBuybackVehiclesFromApi();
        if(this.reasons.length === 0)
            this.loadReasons();
        if(this.saleOptions.length === 0)
            this.loadSaleOptions();
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
        this.repositoryService.SaleLocationRepository.getAll()
        .then(response => response.json())
        .then(allLocations => this.filterAndSetLocations(allLocations));
    }

    filterAndSetLocations(allLocations)
    {
        var locations = allLocations.filter((l) => this.allVehicles.some((v) => v.SaleLocationId === l.SaleId));
        this.absOptionLocations = locations.slice(0);
        this.absOptionLocations.unshift({ SaleId: null, SaleLocation: "Select" });
        locations.unshift({SaleId:null,SaleLocation:"All"});
        this.saleLocations = locations;
    }

    loadDealers(vehicles)
    {
        var dealers = $.map(vehicles, v =>
                            {
                                return Object.create(Dealer.prototype, {id:{value:v.BuyerId},name:{value:v.Buyer}});
                            }).distinct();
        dealers.sort(this.compareDealerByName);
        dealers.unshift(Object.create(Dealer.prototype, {id:{value:null},name:{value:"All"}}));
        this.dealers = dealers;
    }
    
    compareDealerByName(a, b)
    {
        if(a.name.toUpperCase() < b.name.toUpperCase())
            return -1;
        if(a.name.toUpperCase() > b.name.toUpperCase())
            return 1;
        return 0;
    }

    locationSelected()
    {
        this.resetProperties(this.nullableValues.filter((p) => {return !["saleLocationId"].some((e) => {return e === p})}));
        this.loadBuybackVehiclesFromVM();
        this.loadDealers(this.queriedVehicles);
    }

    resetProperties(properties)
    {
        for(var property of properties)
            this[property] = null;
    }

    dealerSelected()
    {
        this.resetProperties(this.nullableValues.filter((p) => {return !["saleLocationId", "buyerId"].some((e) => {return e === p})}));
        this.loadBuybackVehiclesFromVM();
    }

    loadBuybackVehiclesFromVM()
    {
        this.queriedVehicles = this.allVehicles.filter(v => this.doesMatch(v));
        this.shownVehicles = this.queriedVehicles.slice(this.pageNumber-1, this.pageSize-1);
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

    loadReasons()
    {
        this.repositoryService.ReasonRepository.getAll()
            .then(response =>response.json())
            .then(reasons =>
                {
                    reasons.unshift({ ReasonId: null, ReasonDescription: "Select" });
                    this.reasons = reasons;
                }
            );
    };

    loadSaleOptions()
    {
        this.repositoryService.SaleOptionRepository.getAll()
            .then(response => response.json())
            .then(saleOptions =>
                {
                    saleOptions.unshift({ResultDescriptionId:null,ResultDescription:"Select"});
                    this.saleOptions = saleOptions;
                }
            );
    }

    absOptionLocationSelected()
    {
        this.absOptionLocationInstanceId = -1;
        for(let saleLocation of this.saleLocations)
        {
            if (this.absOptionLocationId == saleLocation.SaleId) {
                this.absOptionSaleLocationInstances = this.generateAbsOptionSaleLocationInstances(saleLocation);
                break;
            }
        }
    }

    generateAbsOptionSaleLocationInstances(location)
    {
        if(location.Sales.length === 0)
            return [{name:"Select",value:-1},{name:"Next", value:null}];
        this.absOptionLocationInstanceId = location.Sales[0].SaleInstanceId;
        return [{name:"Select",value:-1},{name:"Current", value:location.Sales[0].SaleInstanceId},{name:"Next", value:null}];
    }

    createSelected()
    {
        for(let buyback of this.buybacks)
        {
            if (buyback.create);
        }
    }
}
