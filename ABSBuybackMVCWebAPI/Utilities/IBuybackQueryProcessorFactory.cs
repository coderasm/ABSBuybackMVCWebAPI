
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public interface IBuybackQueryProcessorFactory
    {
        IBuybackQueryProcessor Create(BuybackResultQuery buybackQuery);
    }
}