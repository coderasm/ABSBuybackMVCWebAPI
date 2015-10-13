
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public interface IAbsBuybackUpdater
    {
        bool Process(AbsBuybackResult absBuybackResult);
    }
}