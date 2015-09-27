
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public interface IBuybackUpdateProcessor
    {
        bool Process(BuybackResult buybackResult);
    }
}
