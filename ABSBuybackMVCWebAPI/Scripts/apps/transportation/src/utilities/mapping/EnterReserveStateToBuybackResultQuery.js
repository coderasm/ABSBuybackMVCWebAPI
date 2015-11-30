import {MapperFactory} from "./MapperFactory"
import {BuybackResultQueryFactory} from "../../models/BuybackResultQueryFactory"

export function EnterReserveStateToBuybackResultQuery() {
    let instanceObject = {
        map: function map(enterReserveState) {
            let toObject = this.toFactory();
            toObject.resultDescriptionId = enterReserveState.resultDescriptionId === undefined ? null : enterReserveState.resultDescriptionId;
            toObject.statusDescriptionId = enterReserveState.statusDescriptionId === undefined ? null : enterReserveState.statusDescriptionId;
            toObject.reserve = enterReserveState.reserve === undefined ? null : enterReserveState.reserve;
            return toObject;
        },
        toFactory: function toFactory() {
            return BuybackResultQueryFactory();
        }
    }
    return Object.assign(Object.create(MapperFactory(), {}), instanceObject);
}