import {BuybackResultRepository} from '../repositories/BuybackResultRepository';
import {BuybackVehicleRepository} from '../repositories/BuybackVehicleRepository';
import {SaleOptionRepository} from '../repositories/SaleOptionRepository';
import {ReasonRepository} from '../repositories/ReasonRepository';
import {StatusRepository} from '../repositories/StatusRepository';

export class RepositoryService
{
    BuybackResultRepository = new BuybackResultRepository();
    BuybackVehicleRepository = new BuybackVehicleRepository();
    SaleOptionRepository = new SaleOptionRepository();
    ReasonRepository = new ReasonRepository();
    StatusRepository = new StatusRepository();

    constructor() {
        
    }
}