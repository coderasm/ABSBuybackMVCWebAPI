using System.Collections.Generic;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface IBuybackVehicleRepository : IBaseRepository<BuybackVehicle>
    {
        List<BuybackVehicle> Search(BuybackVehicleQuery queryObject);
    }
}
