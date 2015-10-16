
using System.Data;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface IGSVRepository : IBaseRepository<GroupSaleVehicle>
    {
        GroupSaleVehicle Get(int id, IDbConnection connection);
        bool Update(GroupSaleVehicle poco, IDbConnection connection);
        int Insert(GroupSaleVehicle poco, IDbConnection connection);
    }
}
