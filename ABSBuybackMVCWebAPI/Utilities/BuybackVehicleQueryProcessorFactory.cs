
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class BuybackVehicleQueryProcessorFactory : IBuybackVehicleQueryProcessorFactory
    {
        public IBuybackVehicleQueryProcessor Create(BuybackVehicleQuery buybackVehicleQuery)
        {
            return BuybackVehicleQueryProcessor.Instance(buybackVehicleQuery);
        }
    }
}