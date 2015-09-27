using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using Dapper;

namespace ABSBuybackMVCWebAPI.Repositories
{
    class SaleLocationRepository : ISaleLocationRepository
    {
        private const string @select = @"SELECT salelocation, saleid FROM GroupSale";

        private string @where = @" where ForDropDown = 1 ";

        private const string orderBy = @"ORDER by SaleLocation";

        public List<Location> GetAll()
        {
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<Location>(query).ToList();
            }
        }

        public Location Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public int Insert(Location poco)
        {
            throw new System.NotImplementedException();
        }

        public bool Update(Location poco)
        {
            throw new System.NotImplementedException();
        }

        public int Delete(Location poco)
        {
            throw new System.NotImplementedException();
        }

        private string FormQuery()
        {
            return @select + @where + orderBy;
        }
    }
}
