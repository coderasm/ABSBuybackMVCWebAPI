
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    [Table("GroupSaleVehicles")]
    public class GroupSaleVehicle
    {
        [Key]
        public int VehicleID { get; set; }
        public int SaleInstanceId { get; set; }
        public string DealerId { get; set; }
        public int BidSheetNumber { get; set; }
        public string VIN { get; set; }
        public string VehicleStockNumber { get; set; }
        public int VehicleYear { get; set; }
        public string VehicleDescription { get; set; }
        public int VehicleMileage { get; set; }
        public string VehicleCondition { get; set; }
        public string VehicleColor { get; set; }
        public string VehicleIntColor { get; set; }
        public string VehicleComment { get; set; }
        public string VehicleEngine { get; set; }
        public int wsbb { get; set; }
        public int wsbba { get; set; }
        public int? ma { get; set; }
        public int VehicleCost { get; set; }
        public int VehicleStatus { get; set; }
        public string SalesManager { get; set; }
        public int Book { get; set; }
        public int PreviousVehicleId { get; set; }
        public int VehicleManufacturer { get; set; }
        public string VehicleLicensePlate { get; set; }
        public string VehicleOtherNotes { get; set; }
        public int PreviousVehicleStatus { get; set; }
    }
}