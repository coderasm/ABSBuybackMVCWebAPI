import {BuybackVehicleViewModel} from 'viewModels/BuybackVehicleViewModel';
import {CreateSalesState} from 'vmstate/CreateSalesState';
import {Dealer} from 'models/Dealer';
import {BuybackVehicleQuery} from 'models/BuybackVehicleQuery';
import {BuybackVehicle} from 'models/BuybackVehicle';
import {Mapper} from 'utilities/Mapper';
import {ArrayExtensions} from 'utilities/ArrayExtensions';
import {inject} from 'aurelia-framework';
import {RepositoryService} from 'services/RepositoryService';
import {Validation} from 'aurelia-validation';
import {computedFrom} from 'aurelia-framework';
import {bindingEngine} from 'aurelia-binding';  // or 'aurelia-framework'

@inject(RepositoryService, Mapper, bindingEngine, Validation, CreateSalesState)
export class CreateSales {
    heading = 'Buyback Vehicles Needing New Sale';
    searchProperties = ["saleLocationId", "buyerId"];
    saveProperties = ["reason", "saleOption", "absOptionLocationId"];
    pageNumber = 1;
    pageSize = 15;

    constructor(repositoryService, mapper, bindingEngine, validation, createSalesState) {
        this.repositoryService = repositoryService;
        this.mapper = mapper;
        this.bindingEngine = bindingEngine;
        this.state = createSalesState;
        this.validation = validation;
        this.nonAbsSaleValidation = validation.on(this.state)
            .ensure('reason')
                .isNotEmpty()
                .passes((value) => {return value !== "null";})
                .withMessage("Choose a reason.")
            .ensure('saleOption')
                .isNotEmpty()
                .passes((value) => {return value !== "null";})
                .withMessage("Choose a sale option.")
            .onValidate( () => {
                return {
                }
            },(onValidateError)=>{ alert("Fix errors.")});
        this.absSaleValidation = validation.on(this.state)
            .ensure('absOptionLocationId', (config) => {config.computedFrom('saleOption')})
                .passes(() => {return true;})
                .if(() => { return this.state.saleOption == 10; })
                    .isNotEmpty()
                    .passes((value) => {return value !== "null";})
                    .withMessage("Choose a location.")
                .endIf()
            .ensure('absOptionLocationInstanceId', (config) => {config.computedFrom('absOptionLocationId')})
                .passes(() => {return true;})
                .if(() => { return this.state.absOptionLocationId !== null; })
                    .containsOnly(/^[^\-]/)
                    .withMessage("Choose a sale.")
                .endIf()
            .onValidate( () => {
                return {
                }
            },(onValidateError)=>{ alert("Fix errors.")});
    }

    get showAbsSaleLocations()
    {
        return this.state.saleOption == 10 ? true : false;
    }

    get showLocationSales()
    {
        return this.showAbsSaleLocations && this.state.absOptionLocationId !== null;
    }

    activate()
    {
        if(this.state.allVehicles.length === 0)
            this.loadBuybackVehiclesFromApi();
        if(this.state.reasons.length === 0)
            this.loadReasons();
        if(this.state.saleOptions.length === 0)
            this.loadSaleOptions();
    }

    loadBuybackVehiclesFromApi()
    {
        var queryObject = this.createQueryObject();
        this.repositoryService.BuybackVehicleRepository.search(queryObject)
          .then(response => response.json())
          .then(json => $.map(json,(v) => {return new BuybackVehicleViewModel(v, this.validation)}))
          .then(vehicles => this.loadVehicles(vehicles));
    }

    loadVehicles(vehicles)
    {
        this.state.shownVehicles = vehicles.slice(this.pageNumber-1, this.pageSize-1);
        this.state.allVehicles = vehicles;
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
        var locations = allLocations.filter((l) => this.state.allVehicles.some((v) => v.SaleLocationId === l.SaleId));
        this.state.absOptionLocations = locations.slice(0);
        this.state.absOptionLocations.unshift({ SaleId: null, SaleLocation: "Select" });
        locations.unshift({SaleId:null,SaleLocation:"All"});
        this.state.saleLocations = locations;
    }

    loadDealers(vehicles)
    {
        var dealers = $.map(vehicles, v =>
                            {
                                return Object.create(Dealer.prototype, {id:{value:v.BuyerId},name:{value:v.Buyer}});
                            }).distinct();
        dealers.sort(this.compareDealerByName);
        dealers.unshift(Object.create(Dealer.prototype, {id:{value:null},name:{value:"All"}}));
        this.state.dealers = dealers;
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
        this.nullSearchProperties();
        this.resetProperties(this.saveProperties.concat("buyerId"));
        this.loadBuybackVehiclesFromVM();
        this.loadDealers(this.state.queriedVehicles);
    }

    nullSearchProperties()
    {
        for (var property of this.searchProperties) {
            if (this.state[property] === "null")
                this.state[property] = null;
        }
    }

    resetProperties(properties)
    {
        for(var property of properties)
            this.state[property] = null;
    }

    dealerSelected()
    {
        this.nullSearchProperties();
        this.resetProperties(this.saveProperties);
        this.loadBuybackVehiclesFromVM();
    }

    loadBuybackVehiclesFromVM()
    {
        this.state.queriedVehicles = this.state.allVehicles.filter(v => this.doesMatch(v));
        this.state.shownVehicles = this.state.queriedVehicles.slice(this.pageNumber-1, this.pageSize-1);
    }

    doesMatch(vehicle)
    {
        if(this.state.vehicleIds.length > 0)
            return this.matchesVids(vehicle);
        return this.matchFound(vehicle);

    }

    matchesVids(vehicle)
    {
        return this.state.vehicleIds.some(vid => vid == vehicle.VehicleId);
    }

    matchFound(vehicle)
    {
        var predicate = true;
        if (this.state.saleLocationId !== null)
            predicate = vehicle.SaleLocationId == this.state.saleLocationId;
        if(this.state.buyerId !== null)
            predicate = predicate && vehicle.BuyerId == this.state.buyerId;
        return predicate;
    }

    createQueryObject()
    {
        return this.mapper.map(this.state, BuybackVehicleQuery);
    }

    loadReasons()
    {
        this.repositoryService.ReasonRepository.getAll()
            .then(response =>response.json())
            .then(reasons =>
                {
                    reasons.unshift({ ReasonId: null, ReasonDescription: "Select" });
                    this.state.reasons = reasons;
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
                    this.state.saleOptions = saleOptions;
                }
            );
    }

    saleOptionSelected()
    {
        this.state.absOptionLocationId = null;
        this.state.absOptionLocationInstanceId = -1;
        if(this.state.saleOption == 10)
            this.absSaleValidation.validate().catch(err=>{});
    }

    absOptionLocationSelected()
    {
        this.state.absOptionLocationInstanceId = -1;
        for(let saleLocation of this.state.saleLocations)
        {
            if (this.state.absOptionLocationId == saleLocation.SaleId) {
                this.state.absOptionSaleLocationInstances = this.generateAbsOptionSaleLocationInstances(saleLocation);
                break;
            }
        }
    }

    generateAbsOptionSaleLocationInstances(location)
    {
        var nextSaleWording = "Next Sale Setup";
        if(location.Sales.length === 0)
            return [{name:"Select",value:-1},{name:nextSaleWording, value:null}];
        this.state.absOptionLocationInstanceId = location.Sales[0].SaleInstanceId;
        var date = (new Date(location.Sales[0].SaleFirstDate)).toLocaleDateString();
        return [{name:"Select",value:-1},{name:date, value:this.state.absOptionLocationInstanceId},{name:nextSaleWording, value:null}];
    }

    createSelected()
    {
        if(!this.isValid()) return;
        for(let vehicle of this.state.shownVehicles)
        {
            if (vehicle.create && vehicle.isValid()) {
                this.createBuybackResult(vehicle);
            };
        }
    }

    isValid()
    {
        this.nonAbsSaleValidation.validate().catch(err => {});
        this.absSaleValidation.validate().catch(err => {});
        if(!this.nonAbsSaleValidation.result.isValid || !this.absSaleValidation.result.isValid)
            return false;
        return true;
    }

    createBuybackResult(vehicle)
    {
        var vehicleWithChoices = this.createVehicleWithChoices(vehicle);
        if (this.state.saleOption != 10)
            this.repositoryService.BuybackResultRepository.insert(vehicleWithChoices);
        else
            this.createAbsBuyback(vehicleWithChoices);
    }

    createVehicleWithChoices(vehicle)
    {
        return {
            Vehicle:this.mapper.map(vehicle, BuybackVehicle),
            ResultDescriptionId:this.state.saleOption,
            ReasonId:this.state.reason
        }
    }

    createAbsBuyback(vehicle)
    {
        vehicle.SaleInstanceId = this.state.absOptionLocationInstanceId;
        vehicle.SaleId = this.state.absOptionLocationId;
        this.repositoryService.AbsBuybackResultRepository.insert(vehicle);
    }
}
