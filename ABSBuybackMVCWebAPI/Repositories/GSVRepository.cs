
using System.Configuration;
using System.Data.SqlClient;
using ABSBuybackMVCWebAPI.Models;
using System.Collections.Generic;
using System.Data;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public class GsvRepository : IGSVRepository
    {
        public List<GroupSaleVehicle> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public GroupSaleVehicle Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public int Insert(GroupSaleVehicle poco)
        {
            throw new System.NotImplementedException();
        }

        public bool Update(GroupSaleVehicle poco)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Update(poco);
            }
        }

        public bool Update(GroupSaleVehicle poco, IDbConnection connection)
        {
            return connection.Update(poco);
        }

        public int Delete(Models.GroupSaleVehicle poco)
        {
            throw new System.NotImplementedException();
        }
    }
}