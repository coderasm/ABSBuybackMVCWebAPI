import {BuybackResultRepository} from '../repositories/BuybackResultRepository';
import {AbsBuybackResultRepository} from '../repositories/AbsBuybackResultRepository';
import {BuybackVehicleRepository} from '../repositories/BuybackVehicleRepository';
import {SaleOptionRepository} from '../repositories/SaleOptionRepository';
import {SaleLocationRepository} from '../repositories/SaleLocationRepository';
import {ReasonRepository} from '../repositories/ReasonRepository';
import {StatusRepository} from '../repositories/StatusRepository';

export class RepositoryService
{
    BuybackResultRepository = new BuybackResultRepository();
    AbsBuybackResultRepository = new AbsBuybackResultRepository();
    BuybackVehicleRepository = new BuybackVehicleRepository();
    SaleOptionRepository = new SaleOptionRepository();
    SaleLocationRepository = new SaleLocationRepository();
    ReasonRepository = new ReasonRepository();
    StatusRepository = new StatusRepository();

    constructor() {
        
    }
}