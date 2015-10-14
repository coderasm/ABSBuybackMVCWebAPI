
namespace ABSBuybackMVCWebAPI.Utilities
{
    public interface IBuybackVehicleQueryProcessor
    {
        string ProcessAll();
        string ProcessSaleLocation();
        string ProcessDealer();
        string ProcessVids();
    }
}
