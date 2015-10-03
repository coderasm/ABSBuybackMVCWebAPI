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
        private const string @select = @"SELECT gs.SaleID, gs.SaleLocation
                                        FROM GroupSale gs
                                        WHERE (gs.ForDropDown = 1) AND gs.SaleID NOT IN (21, 87)
                                        ORDER by SaleLocation
                                        SELECT g.SaleID, g.SaleInstanceID, g.SaleFirstDate, g.SaleEndDate
                                        FROM GSI g
                                        WHERE GETDATE() BETWEEN g.SaleFirstDate AND g.SaleEndDate OR g.SaleEndDate >= GETDATE()";

        private string @where = @"";

        private const string orderBy = @"";

        public List<Location> GetAll()
        {
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                using (var multi = connection.QueryMultiple(query))
                {
                    return FindLocations(multi).ToList();
                }
            }
        }

        private IEnumerable<Location> FindLocations(SqlMapper.GridReader multi)
        {
            var locations = multi.Read<Location>();
            var sales = multi.Read<SaleInstance>();
            foreach (var location in locations)
                location.Sales = sales.Where(s => s.SaleId == location.SaleId).ToList();
            return locations;
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
