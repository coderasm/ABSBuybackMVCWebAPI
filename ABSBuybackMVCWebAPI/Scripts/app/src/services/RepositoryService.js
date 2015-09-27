import {BuybackResultRepository} from '../repositories/BuybackResultRepository';
import {SaleOptionRepository} from '../repositories/SaleOptionRepository';
import {StatusRepository} from '../repositories/StatusRepository';

export class RepositoryService
{
    BuybackResultRepository = new BuybackResultRepository();
    SaleOptionRepository = new SaleOptionRepository();
    StatusRepository = new StatusRepository();

    constructor() {
        
    }
}