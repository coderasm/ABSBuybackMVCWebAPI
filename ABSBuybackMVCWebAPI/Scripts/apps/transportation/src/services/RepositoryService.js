import {TransportRepository} from '../repositories/TransportRepository';
import {TransportNoteRepository} from '../repositories/TransportNoteRepository';

export class RepositoryService
{
    TransportRepository = new TransportRepository();
    TransportNoteRepository = new TransportNoteRepository();

    constructor() {
        
    }
}