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
    class BuybackResultRepository : IBuybackResultRepository
    {
        private const string @select = @"SELECT bbr.*, dbo.Vehicle_Year(b.VehicleIdOriginal) AS Year, m.Manufacturer AS Make, g.VehicleDescription AS Model, g.VehicleMileage AS Mileage, g.VIN FROM BuyBackResult bbr
                                        JOIN Buyback b ON bbr.BuybackId = b.BuyBackId
                                        JOIN GSV g ON b.VehicleIdOriginal = g.VehicleID
                                        JOIN Manufacturers m ON g.VehicleManufacturer = m.ManufacturerID";
        private const string @where = @" ";
        private const string orderBy = @" ORDER BY CreationDate DESC";

        public List<BuybackResult> GetAll()
        {
            var query = FormQuery("", "", where);
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<BuybackResult>(query).ToList();
            }
        }

        public List<BuybackResult> Get(int reserve, int status)
        {
            var wherePredicate = string.Format(" WHERE {0} AND {1} ", FormatReservePredicate(reserve), FormatStatusPredicate(status));
            var query = FormQuery("", "", wherePredicate);
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<BuybackResult>(query).ToList();
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

        public BuybackResult Get(int buybackResultId)
        {
            var wherePredicate = string.Format(" WHERE {0} ", FormatBuybackResultIdPredicate(buybackResultId));
            var query = FormQuery("", "", wherePredicate);
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<BuybackResult>(query).FirstOrDefault();
            }
        }

        private string FormatBuybackResultIdPredicate(int buybackResultId)
        {
            return string.Format("bbr.BuybackResultId = {0}", buybackResultId);
        }

        public List<BuybackResult> GetBySaleOption(int saleOption)
        {
            var saleOptionPredicate = FormatSaleOptionPredicate(saleOption);
            var wherePredicate = saleOptionPredicate.Equals(where) ? where : " WHERE " + FormatSaleOptionPredicate(saleOption) + " ";
            var query = FormQuery("", "", wherePredicate);
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<BuybackResult>(query).ToList();
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
            throw new System.NotImplementedException();
        }

        private string FormQuery(string saleIdPredicate, string saleFirstDatePredicate, string wherePredicate)
        {
            return select + wherePredicate + orderBy;
        }

        public IEnumerable<BuybackResult> Paged(int pageSize, int pageNumber)
        {
            throw new NotImplementedException();
        }

        public List<BuybackResult> Search(BuybackResultQuery queryObject)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<BuybackResult> SearchPaged(BuybackResultQuery queryObject, int pageSize, int pageNumber)
        {
            throw new NotImplementedException();
        }

        private void ProcessQueryObject(BuybackVehicleQuery queryObject)
        {
            processDealer(queryObject);
            processSaleLocation(queryObject);
            processVehicleIds(queryObject);
        }

        private void processVehicleIds(BuybackVehicleQuery queryObject)
        {
            if (queryObject.VehicleIds.Count != 0)
                WherePredicate += processVehicleIds(queryObject.VehicleIds);
        }

        private void processSaleLocation(BuybackVehicleQuery queryObject)
        {
            if (queryObject.SaleLocationId != null)
                WherePredicate += FormatSaleIdPredicate(queryObject.SaleLocationId.Value);
        }

        private static string FormatSaleIdPredicate(int saleId)
        {
            var saleIdPredicate = String.Format(SaleIdPredicateTemplate, saleId);
            return saleIdPredicate;
        }

        private void processDealer(BuybackVehicleQuery queryObject)
        {
            if (queryObject.BuyerId != null)
                WherePredicate += FormatDealerIdPredicate(queryObject.BuyerId);
        }

        private static string FormatDealerIdPredicate(string dealerId)
        {
            var dealerIdPredicate = String.Format(DealerIdPredicateTemplate, dealerId);
            return dealerIdPredicate;
        }

        private string processVehicleIds(List<int> vehicleIds)
        {
            var andInPredicate = "";
            vehicleIds.ForEach(v =>
            {
                andInPredicate += v + ",";
            });
            return String.Format(VehicleIdPredicateTemplate, andInPredicate.TrimEnd(','));
        }
    }
}
