
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Utilities;
using Dapper;
using Dapper.Contrib.Extensions;
using System.Collections.Generic;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public class AbsBuybackResultRepository : IAbsBuybackResultRepository
    {
        private const string Select = @"SELECT bbr.*, dbo.Vehicle_Year(b.VehicleIdOriginal) AS Year, m.Manufacturer AS Make, g.VehicleDescription AS Model, g.VehicleMileage AS Mileage, g.VIN, bbras.VehicleId, bbras.SaleId FROM BuyBackResult bbr
                                        JOIN Buyback b ON bbr.BuybackId = b.BuyBackId
                                        JOIN GSV g ON b.VehicleIdOriginal = g.VehicleID
                                        JOIN Manufacturers m ON g.VehicleManufacturer = m.ManufacturerID
                                        JOIN BuybackResultAbsSale bbras ON bbr.BuybackResultId = bbras.BuybackResultId";
        private const string WhereTemplate = @" WHERE 1=1{0}";
        private string WherePredicate = "";
        private const string OrderBy = @" ORDER BY CreationDate DESC";
        private const string IdPredicateTemplate = @" AND bbr.BuybackResultId = {0}";
        private readonly IAbsBuybackQueryProcessorFactory absBuybackQueryProcessorFactory;

        public AbsBuybackResultRepository(IAbsBuybackQueryProcessorFactory absBuybackQueryProcessorFactory)
        {
            this.absBuybackQueryProcessorFactory = absBuybackQueryProcessorFactory;
        }

        public List<AbsBuybackResult> GetAll()
        {
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<AbsBuybackResult>(query).ToList();
            }
        }

        private string FormQuery()
        {
            return Select + String.Format(WhereTemplate, WherePredicate) + OrderBy;
        }

        public List<AbsBuybackResult> Search(AbsBuybackResultQuery queryObject)
        {
            WherePredicate = absBuybackQueryProcessorFactory.Create(queryObject).ProcessAll();
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<AbsBuybackResult>(query).ToList();
            }
        }

        public AbsBuybackResult Get(int id)
        {
            WherePredicate += string.Format(IdPredicateTemplate, id);
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<AbsBuybackResult>(query).FirstOrDefault();
            }
        }

        public int Insert(AbsBuybackResult poco)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return (int)connection.Insert(poco);
            }
        }

        public int Insert(AbsBuybackResult poco, IDbConnection connection)
        {
            return (int)connection.Insert(poco);
        }

        public bool Update(AbsBuybackResult poco)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Update(poco);
            }
        }
        public bool Update(AbsBuybackResult poco, IDbConnection connection)
        {
            return connection.Update(poco);
        }

        public int Delete(AbsBuybackResult poco)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<AbsBuybackResult> Paged(int pageSize, int pageNumber)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<AbsBuybackResult> SearchPaged(AbsBuybackResultQuery queryObject, int pageSize, int pageNumber)
        {
            throw new NotImplementedException();
        }
    }
}