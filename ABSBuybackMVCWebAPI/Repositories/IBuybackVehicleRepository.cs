using System.Collections.Generic;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface IBuybackVehicleRepository : IBaseRepository<BuybackVehicle>
    {
        List<BuybackVehicle> Search(BuybackVehicleQuery queryObject);
        IEnumerable<BuybackVehicle> Paged(int pageSize, int pageNumber);
        IEnumerable<BuybackVehicle> SearchPaged(BuybackVehicleQuery queryObject, int pageSize, int pageNumber);
    }
}
