
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public interface IAbsBuybackInserter
    {
        int Process(BuybackVehicle vehicle);
    }
}
