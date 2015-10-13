
using System.Data;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface IBuybackResultAbsSaleRepository : IBaseRepository<BuybackResultAbsSale>
    {
        int Insert(BuybackResultAbsSale poco, IDbConnection connection);
        bool Update(BuybackResultAbsSale poco, IDbConnection connection);
    }
}
