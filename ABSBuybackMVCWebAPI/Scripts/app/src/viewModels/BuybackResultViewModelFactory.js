import {BuybackResult} from "./BuybackResult"

export function BuybackResultViewModelFactory(vehicle, validation, mapper, repositoryService)
{
    let buybackPrototype = BuybackResult();
    let prototype = {
        doUpdate: function doUpdate()
        {
            let buybackResult = this.mapper.map(this);
            this.repositoryService.BuybackResultRepository.update(buybackResult);
        }
    }

    prototype = Object.assign(buybackPrototype, prototype);

    let instanceMembers = {
        validation: validation,
        mapper: mapper,
        repositoryService: repositoryService
    };

    let instance = Object.assign(Object.create(prototype), { currentValues: vehicle }, vehicle, instanceMembers);

    function initialize() {
        instance.validation = instance.validation.on(instance)
                    .ensure('Reserve')
                        .containsOnly(/^[1-9]\d*$|^$/)
                    .ensure('HighBid')
                        .containsOnly(/^[1-9]\d*$|^$/)
                    .onValidate( () => {
                        return {
                        }
                    },(onValidateError)=>{ alert("Fix errors.")});
    }
    initialize();
    return instance;
}