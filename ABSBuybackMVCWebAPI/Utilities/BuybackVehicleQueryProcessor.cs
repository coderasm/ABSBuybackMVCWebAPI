
using System;
using System.Collections.Generic;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class BuybackVehicleQueryProcessor : IBuybackVehicleQueryProcessor
    {
        private readonly BuybackVehicleQuery buybackVehicleQuery;
        private string WherePredicate = "";
        private const string SaleIdPredicateTemplate = @" AND g2.SaleID = {0}";
        private const string DealerIdPredicateTemplate = @" AND g1.DealerID = '{0}'";
        private const string VehicleIdPredicateTemplate = @" AND g.VehicleID IN({0})";

        private BuybackVehicleQueryProcessor(BuybackVehicleQuery buybackVehicleQuery)
        {
            this.buybackVehicleQuery = buybackVehicleQuery;
        }

        public static BuybackVehicleQueryProcessor Instance(BuybackVehicleQuery buybackVehicleQuery)
        {
            return new BuybackVehicleQueryProcessor(buybackVehicleQuery);
        }

        public string ProcessAll()
        {
            WherePredicate = "";
            ProcessSaleLocation();
            ProcessDealer();
            ProcessVids();
            return WherePredicate;
        }

        public string ProcessVids()
        {
            var predicate = buybackVehicleQuery.VehicleIds.Count != 0 ? ProcessVehicleIds(buybackVehicleQuery.VehicleIds) : "";
            WherePredicate += predicate;
            return predicate;
        }

        private string ProcessVehicleIds(List<int> vehicleIds)
        {
            var andInPredicate = "";
            vehicleIds.ForEach(v =>
            {
                andInPredicate += v + ",";
            });
            return String.Format(VehicleIdPredicateTemplate, andInPredicate.TrimEnd(','));
        }

        public string ProcessSaleLocation()
        {
            var predicate = buybackVehicleQuery.SaleLocationId != null ? FormatSaleIdPredicate(buybackVehicleQuery.SaleLocationId.Value) : "";
            WherePredicate += predicate;
            return predicate;
        }

        private static string FormatSaleIdPredicate(int saleId)
        {
            var saleIdPredicate = String.Format(SaleIdPredicateTemplate, saleId);
            return saleIdPredicate;
        }

        public string ProcessDealer()
        {
            var predicate = buybackVehicleQuery.BuyerId != null ? FormatDealerIdPredicate(buybackVehicleQuery.BuyerId) : "";
            WherePredicate += predicate;
            return predicate;
        }

        private static string FormatDealerIdPredicate(string dealerId)
        {
            var dealerIdPredicate = String.Format(DealerIdPredicateTemplate, dealerId);
            return dealerIdPredicate;
        }
    }
}