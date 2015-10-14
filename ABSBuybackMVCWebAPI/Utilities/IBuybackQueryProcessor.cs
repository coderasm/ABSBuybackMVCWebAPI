
namespace ABSBuybackMVCWebAPI.Utilities
{
    public interface IBuybackQueryProcessor
    {
        string ProcessAll();
        string ProcessSaleOption();
        string ProcessStatus();
        string ProcessReserve();
    }
}
