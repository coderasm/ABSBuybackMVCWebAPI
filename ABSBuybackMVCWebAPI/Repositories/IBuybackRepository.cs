using System.Data;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface IBuybackRepository : IBaseRepository<Buyback>
    {
        int Insert(Buyback poco, IDbConnection connection);
    }
}
