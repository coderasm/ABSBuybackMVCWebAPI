
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class AbsBuybackQueryProcessorFactory : IAbsBuybackQueryProcessorFactory
    {
        public IAbsBuybackQueryProcessor Create(AbsBuybackResultQuery absBuybackResultQuery)
        {
            return AbsBuybackQueryProcessor.Instance(absBuybackResultQuery);
        }
    }
}