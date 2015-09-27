using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using Dapper;

namespace ABSBuybackMVCWebAPI.Repositories
{
    class BuybackResultDescriptionRepository : IBuybackResultDescritionRepository
    {
        private const string @select = @"SELECT * FROM BuybackResultDescription brd";

        private string @where = @" ";

        private const string orderBy = @"ORDER BY brd.ResultDescriptionId";

        public List<BuybackResultDescription> GetAll()
        {
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<BuybackResultDescription>(query).ToList();
            }
        }

        public BuybackResultDescription Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public int Insert(BuybackResultDescription poco)
        {
            throw new System.NotImplementedException();
        }

        public bool Update(BuybackResultDescription poco)
        {
            throw new System.NotImplementedException();
        }

        public int Delete(BuybackResultDescription poco)
        {
            throw new System.NotImplementedException();
        }

        private string FormQuery()
        {
            return @select + @where + orderBy;
        }

    }
}
