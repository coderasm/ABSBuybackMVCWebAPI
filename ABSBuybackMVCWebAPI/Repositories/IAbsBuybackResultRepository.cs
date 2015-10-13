
using ABSBuybackMVCWebAPI.Models;
using System.Collections.Generic;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface IAbsBuybackResultRepository : IBaseRepository<AbsBuybackResult>
    {
        List<AbsBuybackResult> Search(AbsBuybackResultQuery queryObject);
        IEnumerable<AbsBuybackResult> Paged(int pageSize, int pageNumber);
        IEnumerable<AbsBuybackResult> SearchPaged(AbsBuybackResultQuery queryObject, int pageSize, int pageNumber);
    }
}
