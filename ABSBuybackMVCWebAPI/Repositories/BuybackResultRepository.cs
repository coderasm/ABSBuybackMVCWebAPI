using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Utilities;
using Dapper;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Repositories
{
    class BuybackResultRepository : IBuybackResultRepository
    {
        private const string Select = @"SELECT bbr.*, dbo.Vehicle_Year(b.VehicleIdOriginal) AS Year, m.Manufacturer AS Make, g.VehicleDescription AS Model, g.VehicleMileage AS Mileage, g.VIN FROM BuyBackResult bbr
                                        JOIN Buyback b ON bbr.BuybackId = b.BuyBackId
                                        JOIN GSV g ON b.VehicleIdOriginal = g.VehicleID
                                        JOIN Manufacturers m ON g.VehicleManufacturer = m.ManufacturerID";
        private const string WhereTemplate = @" WHERE 1=1{0}";
        private string WherePredicate = "";
        private const string OrderBy = @" ORDER BY CreationDate DESC";
        private const string IdPredicateTemplate = @" AND bbr.BuybackResultId = {0}";
        private readonly IBuybackQueryProcessorFactory buybackQueryProcessorFactory;

        public BuybackResultRepository(IBuybackQueryProcessorFactory buybackQueryProcessorFactory)
        {
            this.buybackQueryProcessorFactory = buybackQueryProcessorFactory;
        }

        public List<BuybackResult> GetAll()
        {
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<BuybackResult>(query).ToList();
            }
        }
        private string FormQuery()
        {
            return Select + String.Format(WhereTemplate, WherePredicate) + OrderBy;
        }

        public List<BuybackResult> Search(BuybackResultQuery queryObject)
        {
            WherePredicate = buybackQueryProcessorFactory.Create(queryObject).ProcessAll();
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<BuybackResult>(query).ToList();
            }
        }

        public BuybackResult Get(int id)
        {
            WherePredicate += string.Format(IdPredicateTemplate, id);
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<BuybackResult>(query).FirstOrDefault();
            }
        }

        public int Insert(BuybackResult poco)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return (int)connection.Insert(poco);
            }
        }

        public int Insert(BuybackResult poco, IDbConnection connection)
        {
            return (int) connection.Insert(poco);
        }

        public bool Update(BuybackResult poco)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Update(poco);
            }
        }
        public bool Update(BuybackResult poco, IDbConnection connection)
        {
            return connection.Update(poco);
        }

        public int Delete(BuybackResult poco)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<BuybackResult> Paged(int pageSize, int pageNumber)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<BuybackResult> SearchPaged(BuybackResultQuery queryObject, int pageSize, int pageNumber)
        {
            throw new NotImplementedException();
        }
    }
}
