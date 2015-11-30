import {MapperFactory} from "./MapperFactory";
import {BuybackVehicleFactory} from "../../models/BuybackVehicleFactory";

export function BuybackVehicleVMToBuybackVehicle() {
    let instanceObject = {
        map: function(buybackVehicleVM) {
            let toObject = this.toFactory();
            toObject.VehicleId = buybackVehicleVM.VehicleId === undefined ? null : buybackVehicleVM.VehicleId;
            toObject.Seller = buybackVehicleVM.Seller === undefined ? null : buybackVehicleVM.Seller;
            toObject.SellerId = buybackVehicleVM.SellerId === undefined ? null : buybackVehicleVM.SellerId;
            toObject.Buyer = buybackVehicleVM.Buyer === undefined ? null : buybackVehicleVM.Buyer;
            toObject.BuyerId = buybackVehicleVM.BuyerId === undefined ? null : buybackVehicleVM.BuyerId;
            toObject.BidSheetNumber = buybackVehicleVM.BidSheetNumber === undefined ? null : buybackVehicleVM.BidSheetNumber;
            toObject.YMM = buybackVehicleVM.YMM === undefined ? null : buybackVehicleVM.YMM;
            toObject.VIN = buybackVehicleVM.VIN === undefined ? null : buybackVehicleVM.VIN;
            toObject.Reserve = buybackVehicleVM.Reserve === undefined ? null : buybackVehicleVM.Reserve;
            toObject.SaleLocation = buybackVehicleVM.SaleLocation === undefined ? null : buybackVehicleVM.buyerId;
            toObject.SaleLocationId = buybackVehicleVM.SaleLocationId === undefined ? null : buybackVehicleVM.SaleLocationId;
            toObject.SaleFirstDate = buybackVehicleVM.SaleFirstDate === undefined ? null : buybackVehicleVM.SaleFirstDate;
            toObject.ReasonId = buybackVehicleVM.ReasonId === undefined ? null : buybackVehicleVM.ReasonId;
            toObject.SaleId = buybackVehicleVM.SaleId === undefined ? null : buybackVehicleVM.SaleId;
            toObject.ResultDescriptionId = buybackVehicleVM.ResultDescriptionId === undefined ? null : buybackVehicleVM.ResultDescriptionId;
            toObject.SaleInstanceId = buybackVehicleVM.SaleInstanceId === undefined ? null : buybackVehicleVM.SaleInstanceId;
            return toObject;
        },
        toFactory: function() {
            return BuybackVehicleFactory();
        }

    }
    return Object.assign(Object.create(MapperFactory(), {}), instanceObject);
}