using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using Dapper;

namespace ABSBuybackMVCWebAPI.Repositories
{
    class SaleFirstRepository : ISaleFirstRepository
    {
        private const string @select = @"SELECT g.SaleFirstDate, g.SaleID FROM GSI g";
        private string @where = @" WHERE g.SaleFirstDate IS NOT NULL ";

        private const string orderBy = @"ORDER BY g.SaleFirstDate DESC";


        public List<SaleFirst> GetAll()
        {
            var query = FormQuery("");
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<SaleFirst>(query).ToList();
            }
        }

        public SaleFirst Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public int Insert(SaleFirst poco)
        {
            throw new System.NotImplementedException();
        }

        public bool Update(SaleFirst poco)
        {
            throw new System.NotImplementedException();
        }

        public int Delete(SaleFirst poco)
        {
            throw new System.NotImplementedException();
        }

        private string FormQuery(string saleIdPredicate)
        {
            return String.Format(select, saleIdPredicate) + @where + orderBy;
        }
    }
}
