import {BuybackResultViewModelFactory} from "./BuybackResultViewModelFactory";

export function AbsBuybackResultViewModelFactory(vehicle, validation, mapper, repositoryService)
{
    let instanceMembers = {
        doUpdate:  function doUpdate() {
            let buybackResult = mapper.map(instance);
            repositoryService.AbsBuybackResultRepository.update(buybackResult);
        },
        get saleFirstDate() {
            if (instance.SaleFirstDate === null)
                return "Next Sale";
            return (new Date(instance.SaleFirstDate)).toLocaleDateString();
        },
        location: function location(saleLocations) {
            for(let location of saleLocations)
                if (location.SaleId === this.SaleId)
                return location.SaleLocation;
        }
    };
    let instance = BuybackResultViewModelFactory(vehicle, validation, mapper, repositoryService);
    return Object.assign(instance, instanceMembers);
}