
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public interface IAbsBuybackProcessor
    {
        bool ProcessUpdate(AbsBuybackResult absBuybackResult);
        int ProcessInsert(BuybackVehicle vehicle);
    }
}
