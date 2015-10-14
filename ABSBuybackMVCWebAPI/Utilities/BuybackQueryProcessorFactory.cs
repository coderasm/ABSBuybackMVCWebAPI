
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class BuybackQueryProcessorFactory : IBuybackQueryProcessorFactory
    {
        public IBuybackQueryProcessor Create(BuybackResultQuery buybackQuery)
        {
            return BuybackQueryProcessor.Instance(buybackQuery);
        }
    }
}