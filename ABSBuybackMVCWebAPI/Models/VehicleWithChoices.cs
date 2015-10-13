
namespace ABSBuybackMVCWebAPI.Models
{
    public class VehicleWithChoices
    {
        public BuybackVehicle Vehicle { get; set; }
        public int ResultDescriptionId { get; set; }
        public int ReasonId { get; set; }
    }
}