
using System.Collections.Generic;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface ITransportRepository : IBaseRepository<Transport>
    {
        List<Transport> GetAll(int orderby);
    }
}