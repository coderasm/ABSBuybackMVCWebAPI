using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using Dapper;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public class SaleLocationRepository : ISaleLocationRepository
    {
        private const string @select = @"SELECT gs.SaleID, gs.SaleLocation, g.SaleInstanceID, g.SaleFirstDate, g.SaleEndDate 
                                        FROM GroupSale gs
                                        LEFT JOIN GSI g  ON g.SaleID = gs.SaleID AND (GETDATE() BETWEEN g.SaleFirstDate AND g.SaleEndDate OR g.SaleEndDate >= GETDATE())";

        private string @where = @" WHERE (gs.ForDropDown = 1) AND gs.SaleID NOT IN (21, 87) ";

        private const string orderBy = @"ORDER by SaleLocation";

        public List<Location> GetAll()
        {
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<Location, List<SaleInstance>, Location>(query, (location, saleInstance) =>
                {
                    location.Sales = saleInstance; return location;
                }, null, null, true, "SaleInstanceId").ToList();
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
