
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using ABSBuybackMVCWebAPI.Models;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public class BuybackResultAbsSaleRepository : IBuybackResultAbsSaleRepository
    {
        public List<BuybackResultAbsSale> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public BuybackResultAbsSale Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public int Insert(BuybackResultAbsSale poco)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return (int)connection.Insert(poco);
            }
        }

        public int Insert(BuybackResultAbsSale poco, IDbConnection connection)
        {
                return (int)connection.Insert(poco);
        }

        public bool Update(BuybackResultAbsSale poco)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Update(poco);
            }
        }

        public bool Update(BuybackResultAbsSale poco, IDbConnection connection)
        {
            return connection.Update(poco);
        }

        public int Delete(BuybackResultAbsSale poco)
        {
            throw new System.NotImplementedException();
        }
    }
}