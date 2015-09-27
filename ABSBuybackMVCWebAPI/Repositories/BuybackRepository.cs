using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using Dapper;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Repositories
{
    class BuybackRepository : IBuybackRepository
    {
        private const string @select = @"SELECT * FROM Buyback b";
        private const string @where = @" ";

        private const string orderBy = @" ORDER BY b.VehicleIdOriginal";

        public List<Buyback> GetAll()
        {
            var query = FormQuery("", "");
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<Buyback>(query).ToList();
            }
        }

        public Buyback Get(int id)
        {
            throw new NotImplementedException();
        }

        public int Insert(Buyback poco)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return (int)connection.Insert(poco);
            }
        }

        public int Insert(Buyback poco, IDbConnection connection)
        {
            return (int) connection.Insert(poco);
        }

        public bool Update(Buyback poco)
        {
            throw new NotImplementedException();
        }

        public int Delete(Buyback poco)
        {
            throw new NotImplementedException();
        }

        private string FormQuery(string saleIdPredicate, string saleFirstDatePredicate)
        {
            return select + @where + orderBy;
        }
    }
}
