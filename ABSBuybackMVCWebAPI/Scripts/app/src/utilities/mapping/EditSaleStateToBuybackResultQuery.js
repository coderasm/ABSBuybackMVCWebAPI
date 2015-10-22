import {MapperFactory} from "./MapperFactory"
import {BuybackResultQueryFactory} from "../../models/BuybackResultQueryFactory"

export function EditSaleStateToBuybackResultQuery() {
    let instanceObject = {
        map: function map(editSaleState) {
            let toObject = this.toFactory();
            toObject.resultDescriptionId = editSaleState.resultDescriptionId === undefined ? null : editSaleState.resultDescriptionId;
            toObject.statusDescriptionId = editSaleState.statusDescriptionId === undefined ? null : editSaleState.statusDescriptionId;
            toObject.reserve = editSaleState.reserve === undefined ? null : editSaleState.reserve;
            return toObject;
        },
        toFactory: function toFactory() {
            return BuybackResultQueryFactory();
        }
    }
    return Object.assign(Object.create(MapperFactory(), {}), instanceObject);
}