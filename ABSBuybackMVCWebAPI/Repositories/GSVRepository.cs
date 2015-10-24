
using System.Configuration;
using System.Data.SqlClient;
using ABSBuybackMVCWebAPI.Mapping;
using ABSBuybackMVCWebAPI.Models;
using System.Collections.Generic;
using System.Data;
using Dapper;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public class GsvRepository : IGSVRepository
    {
        private IMapToNew<GroupSaleVehicle, GSVInsert> mapper; 

        public GsvRepository(IMapToNew<GroupSaleVehicle, GSVInsert> mapper)
        {
            this.mapper = mapper;
        }

        public List<GroupSaleVehicle> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public GroupSaleVehicle Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public GroupSaleVehicle Get(int id, IDbConnection connection)
        {
            return connection.Get<GroupSaleVehicle>(id);
        }

        public int Insert(GroupSaleVehicle poco)
        {
            throw new System.NotImplementedException();
        }

        public int Insert(GroupSaleVehicle poco, IDbConnection connection)
        {
            var dynamicParams = new DynamicParameters(mapper.Map(poco));
            dynamicParams.Add("@VehicleID", dbType: DbType.Int32, direction: ParameterDirection.Output);
            connection.Execute("InsertSaleVehicle7", dynamicParams ,commandType: CommandType.StoredProcedure);
            return dynamicParams.Get<int>("@VehicleID");
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