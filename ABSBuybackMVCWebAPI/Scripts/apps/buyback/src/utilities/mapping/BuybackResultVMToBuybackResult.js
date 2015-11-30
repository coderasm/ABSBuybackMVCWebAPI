import {MapperFactory} from "./MapperFactory";
import {BuybackResultFactory} from "../../models/BuybackResultFactory";

export function BuybackResultVMToBuybackResult() {
    let instanceObject = {
        map: function(buybackResultVM) {
            let toObject = this.toFactory();
            toObject.BuyBackResultId = buybackResultVM.BuyBackResultId === undefined ? null : buybackResultVM.BuyBackResultId;
            toObject.HighBid = buybackResultVM.HighBid === undefined ? null : buybackResultVM.HighBid;
            toObject.Reserve = buybackResultVM.Reserve === undefined ? null : buybackResultVM.Reserve;
            toObject.StatusDescriptionId = buybackResultVM.StatusDescriptionId === undefined ? null : buybackResultVM.StatusDescriptionId;
            toObject.ActionDate = buybackResultVM.ActionDate === undefined ? null : buybackResultVM.ActionDate;
            toObject.ResultDescriptionId = buybackResultVM.ResultDescriptionId === undefined ? null : buybackResultVM.ResultDescriptionId;
            toObject.HighBidDate = buybackResultVM.HighBidDate === undefined ? null : buybackResultVM.HighBidDate;
            toObject.BuybackId = buybackResultVM.BuybackId === undefined ? null : buybackResultVM.BuybackId;
            return toObject;
        },
        toFactory: function() {
            return BuybackResultFactory();
        }

    }
    return Object.assign(Object.create(MapperFactory(), {}), instanceObject);
}