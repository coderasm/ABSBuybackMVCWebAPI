
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    interface IBuybackVehicleQueryProcessorFactory
    {
        IBuybackVehicleQueryProcessor Create(BuybackVehicleQuery buybackVehicleQuery);
    }
}
