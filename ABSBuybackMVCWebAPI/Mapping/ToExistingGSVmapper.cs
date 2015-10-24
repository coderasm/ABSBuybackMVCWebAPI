
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Mapping
{
    public class ToExistingGSVmapper : IMapToExisting<AbsBuybackResult, GroupSaleVehicle>
    {
        public void Map(AbsBuybackResult source, GroupSaleVehicle target)
        {
            target.ma = source.Reserve;
        }
    }
}