using System.Collections.Generic;
using System.Data;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface IBuybackResultRepository : IBaseRepository<BuybackResult>
    {
        int Insert(BuybackResult poco, IDbConnection connection);
        List<BuybackResult> Search(BuybackResultQuery queryObject);
        IEnumerable<BuybackResult> Paged(int pageSize, int pageNumber);
        IEnumerable<BuybackResult> SearchPaged(BuybackResultQuery queryObject, int pageSize, int pageNumber);
        bool Update(BuybackResult poco, IDbConnection connection);
    }
}
