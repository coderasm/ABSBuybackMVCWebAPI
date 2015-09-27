using System.Collections.Generic;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface IBaseRepository<T>
    {
        List<T> GetAll();
        T Get(int id);
        int Insert(T poco);
        bool Update(T poco);
        int Delete(T poco);
    }
}
