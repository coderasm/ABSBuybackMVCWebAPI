using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using Dapper;

namespace ABSBuybackMVCWebAPI.Repositories
{
    class BuybackReasonDescriptionRepository : IBuybackReasonDescriptionRepository
    {
        private const string @select = @"SELECT * FROM BuybackReasonDescription brd";

        private string @where = @" ";

        private const string orderBy = @"ORDER BY brd.ReasonId";

        public List<BuybackReasonDescription> GetAll()
        {
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<BuybackReasonDescription>(query).ToList();
            }
        }

        public BuybackReasonDescription Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public int Insert(BuybackReasonDescription poco)
        {
            throw new System.NotImplementedException();
        }

        public bool Update(BuybackReasonDescription poco)
        {
            throw new System.NotImplementedException();
        }

        public int Delete(BuybackReasonDescription poco)
        {
            throw new System.NotImplementedException();
        }

        private string FormQuery()
        {
            return @select + @where + orderBy;
        }
    }
}
