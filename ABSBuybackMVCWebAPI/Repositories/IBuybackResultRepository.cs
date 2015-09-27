using System.Collections.Generic;
using System.Data;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface IBuybackResultRepository : IBaseRepository<BuybackResult>
    {
        int Insert(BuybackResult poco, IDbConnection connection);
        List<BuybackResult> GetBySaleOption(int saleOption);
        List<BuybackResult> Get(int reserve, int status);
        bool Update(BuybackResult poco, IDbConnection connection);
    }
}
