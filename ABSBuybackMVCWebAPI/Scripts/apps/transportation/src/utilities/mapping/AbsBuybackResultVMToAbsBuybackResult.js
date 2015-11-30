import {MapperFactory} from "./MapperFactory";
import {AbsBuybackResultFactory} from "../../models/AbsBuybackResultFactory";

export function AbsBuybackResultVMToAbsBuybackResult() {
    let instanceObject = {
        map: function(absBuybackResultVM) {
            let toObject = this.toFactory();
            toObject.BuyBackResultId = absBuybackResultVM.BuyBackResultId === undefined ? null : absBuybackResultVM.BuyBackResultId;
            toObject.HighBid = absBuybackResultVM.HighBid === undefined ? null : absBuybackResultVM.HighBid;
            toObject.Reserve = absBuybackResultVM.Reserve === undefined ? null : absBuybackResultVM.Reserve;
            toObject.StatusDescriptionId = absBuybackResultVM.StatusDescriptionId === undefined ? null : absBuybackResultVM.StatusDescriptionId;
            toObject.ActionDate = absBuybackResultVM.ActionDate === undefined ? null : absBuybackResultVM.ActionDate;
            toObject.ResultDescriptionId = absBuybackResultVM.ResultDescriptionId === undefined ? null : absBuybackResultVM.ResultDescriptionId;
            toObject.HighBidDate = absBuybackResultVM.HighBidDate === undefined ? null : absBuybackResultVM.HighBidDate;
            toObject.BuybackId = absBuybackResultVM.BuybackId === undefined ? null : absBuybackResultVM.BuybackId;
            toObject.VehicleId = absBuybackResultVM.VehicleId === undefined ? null : absBuybackResultVM.VehicleId;
            toObject.SaleId = absBuybackResultVM.SaleId === undefined ? null : absBuybackResultVM.SaleId;
            toObject.SaleInstanceId = absBuybackResultVM.SaleInstanceId === undefined ? null : absBuybackResultVM.SaleInstanceId;
            return toObject;
        },
        toFactory: function() {
            return AbsBuybackResultFactory();
        }

    }
    return Object.assign(Object.create(MapperFactory(), {}), instanceObject);
}