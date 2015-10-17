
namespace ABSBuybackMVCWebAPI.Models
{
    public class AbsVehicleWithChoices : VehicleWithChoices
    {
        public int? SaleInstanceId { get; set; }
        public int SaleId { get; set; }
    }
}