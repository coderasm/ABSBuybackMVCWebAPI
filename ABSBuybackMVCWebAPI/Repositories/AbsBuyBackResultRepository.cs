
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using Dapper;
using Dapper.Contrib.Extensions;
using System.Collections.Generic;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public class AbsBuyBackResultRepository : IAbsBuybackResultRepository
    {
        private const string @select = @"SELECT bbr.*, dbo.Vehicle_Year(b.VehicleIdOriginal) AS Year, m.Manufacturer AS Make, g.VehicleDescription AS Model, g.VehicleMileage AS Mileage, g.VIN FROM BuyBackResult bbr, bbras.VehicleId, bbras.SaleId
                                        JOIN Buyback b ON bbr.BuybackId = b.BuyBackId
                                        JOIN GSV g ON b.VehicleIdOriginal = g.VehicleID
                                        JOIN Manufacturers m ON g.VehicleManufacturer = m.ManufacturerID
                                        JOIN BuybackResultAbsSale bbras ON g.BuybackResultId = bbras.BuybackResultId";
        private const string @where = @" ";
        private const string orderBy = @" ORDER BY CreationDate DESC";

        public List<AbsBuybackResult> GetAll()
        {
            var query = FormQuery("", "", where);
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<AbsBuybackResult>(query).ToList();
            }
        }

        public List<AbsBuybackResult> Get(int reserve, int status)
        {
            var wherePredicate = string.Format(" WHERE {0} AND {1} ", FormatReservePredicate(reserve), FormatStatusPredicate(status));
            var query = FormQuery("", "", wherePredicate);
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<AbsBuybackResult>(query).ToList();
            }
        }

        private static string FormatReservePredicate(int reserve)
        {
            var reserveInQuery = reserve.Equals(0) ? "IS NULL" : "=" + reserve.ToString();
            return String.Format("bbr.Reserve {0}", reserveInQuery);
        }

        private string FormatStatusPredicate(int status)
        {
            return String.Format("bbr.StatusDescriptionId = {0}", status);
        }

        public AbsBuybackResult Get(int AbsBuybackResultId)
        {
            var wherePredicate = string.Format(" WHERE {0} ", FormatAbsBuybackResultIdPredicate(AbsBuybackResultId));
            var query = FormQuery("", "", wherePredicate);
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<AbsBuybackResult>(query).FirstOrDefault();
            }
        }

        private string FormatAbsBuybackResultIdPredicate(int AbsBuybackResultId)
        {
            return string.Format("bbr.AbsBuybackResultId = {0}", AbsBuybackResultId);
        }

        public List<AbsBuybackResult> GetBySaleOption(int saleOption)
        {
            var saleOptionPredicate = FormatSaleOptionPredicate(saleOption);
            var wherePredicate = saleOptionPredicate.Equals(where) ? where : " WHERE " + FormatSaleOptionPredicate(saleOption) + " ";
            var query = FormQuery("", "", wherePredicate);
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<AbsBuybackResult>(query).ToList();
            }
        }

        private static string FormatSaleOptionPredicate(int saleOption)
        {
            if (IsAllSaleOptions(saleOption))
                return where;
            return String.Format("bbr.ResultDescriptionId = {0}", saleOption);
        }

        private static bool IsAllSaleOptions(int saleOption)
        {
            return saleOption == 0;
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

        private string FormQuery(string saleIdPredicate, string saleFirstDatePredicate, string wherePredicate)
        {
            return select + wherePredicate + orderBy;
        }

        public List<AbsBuybackResult> Search(AbsBuybackResultQuery queryObject)
        {
            throw new NotImplementedException();
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