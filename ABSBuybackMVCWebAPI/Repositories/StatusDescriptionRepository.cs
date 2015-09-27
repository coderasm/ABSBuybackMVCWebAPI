using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using Dapper;

namespace ABSBuybackMVCWebAPI.Repositories
{
    class StatusDescriptionRepository : IStatusDescriptionRepository
    {
        private const string @select = @"SELECT * FROM BuybackStatusDescription bsd";
        private const string @where = @" ";

        private const string orderBy = @" ";

        public List<BuybackStatus> GetAll()
        {
            const string query = @select + @where + orderBy;
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<BuybackStatus>(query).ToList();
            }
        }

        public BuybackStatus Get(int id)
        {
            throw new NotImplementedException();
        }

        public int Insert(BuybackStatus poco)
        {
            throw new NotImplementedException();
        }

        public bool Update(BuybackStatus poco)
        {
            throw new NotImplementedException();
        }

        public int Delete(BuybackStatus poco)
        {
            throw new NotImplementedException();
        }
    }
}
