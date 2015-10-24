
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Mapping
{
    public class GSVMapper : IMapToNew<GroupSaleVehicle, GSVInsert>
    {
        public GSVInsert Map(GroupSaleVehicle source)
        {
            return new GSVInsert
            {
                pSaleInstanceId = source.SaleInstanceId,
                pDealerId = source.DealerId,
                pBidSheetNumber = source.BidSheetNumber,
                pVIN = source.VIN,
                pVehicleStockNumber = source.VehicleStockNumber,
                pVehicleYear = source.VehicleYear,
                pVehicleDescription = source.VehicleDescription,
                pVehicleMileage = source.VehicleMileage,
                pVehicleCondition = source.VehicleCondition,
                pVehicleColor = source.VehicleColor,
                VehicleIntColor = source.VehicleIntColor,
                pVehicleComment = source.VehicleComment,
                pVehicleEngine = source.VehicleEngine,
                pwsbb = source.wsbb,
                pwsbba = source.wsbba,
                pma = source.ma,
                pCost = source.VehicleCost,
                pStatus = source.VehicleStatus,
                pSalesManager = source.SalesManager,
                pBook = source.Book,
                pPreviousVehicleId = source.PreviousVehicleId,
                pVehicleManufacturer = source.VehicleManufacturer,
                VehicleLicensePlate = source.VehicleLicensePlate,
                VehicleOtherNotes = source.VehicleOtherNotes,
                pPreviousVehicleStatus = source.PreviousVehicleStatus
            };
        }
    }
}