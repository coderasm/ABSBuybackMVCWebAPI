
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public interface IBuybackProcessor
    {
        int Process(VehicleWithChoices vehicleWithChoices);
    }
}
