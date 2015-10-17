
namespace ABSBuybackMVCWebAPI.Models
{
    public class GSVInsert
    {
        public int pSaleInstanceId { get; set; }
        public string pDealerId { get; set; }
        public int pBidSheetNumber { get; set; }
        public string pVIN { get; set; }
        public string pVehicleStockNumber { get; set; }
        public int pVehicleYear { get; set; }
        public string pVehicleDescription { get; set; }
        public int pVehicleMileage { get; set; }
        public string pVehicleCondition { get; set; }
        public string pVehicleColor { get; set; }
        public string VehicleIntColor { get; set; }
        public string pVehicleComment { get; set; }
        public string pVehicleEngine { get; set; }
        public int pwsbb { get; set; }
        public int pwsbba { get; set; }
        public int? pma { get; set; }
        public int pCost { get; set; }
        public int pStatus { get; set; }
        public string pSalesManager { get; set; }
        public int pBook { get; set; }
        public int pPreviousVehicleId { get; set; }
        public int pVehicleManufacturer { get; set; }
        public string VehicleLicensePlate { get; set; }
        public string VehicleOtherNotes { get; set; }
        public int pPreviousVehicleStatus { get; set; }
        public int VehicleId { get; set; }
    }
}