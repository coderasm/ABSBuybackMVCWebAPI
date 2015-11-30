import {MapperFactory} from "./MapperFactory"
import {BuybackVehicleQueryFactory} from "../../models/BuybackVehicleQueryFactory"

export function CreateSaleStateToBuybackVehicleQuery() {
    let instanceObject = {
        map: function(createSaleState) {
            let toObject = this.toFactory();
            toObject.buyerId = createSaleState.buyerId === undefined ? null : createSaleState.buyerId;
            toObject.saleLocationId = createSaleState.saleLocationId === undefined ? null : createSaleState.saleLocationId;
            toObject.vehicleIds = createSaleState.vehicleIds === undefined ? null : createSaleState.vehicleIds;
            return toObject;
        },
        toFactory: function() {
            return BuybackVehicleQueryFactory();
        }

    }
    return Object.assign(Object.create(MapperFactory(), {}), instanceObject);
}