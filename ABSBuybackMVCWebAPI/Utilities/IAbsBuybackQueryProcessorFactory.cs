
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public interface IAbsBuybackQueryProcessorFactory
    {
        IAbsBuybackQueryProcessor Create(AbsBuybackResultQuery absBuybackResultQuery);
    }
}
