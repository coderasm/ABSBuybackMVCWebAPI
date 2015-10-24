﻿import {BuybackResultViewModelFactory} from "./BuybackResultViewModelFactory";

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
        }
    };
    let instance = BuybackResultViewModelFactory(vehicle, validation, mapper, repositoryService);
    return Object.assign(instance, instanceMembers);
}