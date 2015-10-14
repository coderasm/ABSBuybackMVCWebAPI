
using System;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class BuybackQueryProcessor : IBuybackQueryProcessor
    {
        private readonly BuybackResultQuery buybackResultQuery;
        private string WherePredicate = "";
        private const string SaleOptionPredicateTemplate = @" AND bbr.ResultDescriptionId = {0}";
        private const string StatusPredicateTemplate = @" AND bbr.StatusDescriptionId = {0}";
        private const string ReservePredicateTemplate = @" AND bbr.Reserve {0}";

        private BuybackQueryProcessor(BuybackResultQuery buybackResultQuery)
        {
            this.buybackResultQuery = buybackResultQuery;
        }

        public static BuybackQueryProcessor Instance(BuybackResultQuery buybackResultQuery)
        {
            return new BuybackQueryProcessor(buybackResultQuery);
        }

        public string ProcessAll()
        {
            WherePredicate = "";
            ProcessSaleOption();
            ProcessStatus();
            ProcessReserve();
            return WherePredicate;
        }

        public string ProcessSaleOption()
        {
            var predicate = buybackResultQuery.ResultDescriptionId != null ? FormatSaleOptionPredicate(buybackResultQuery.ResultDescriptionId) : "";
            WherePredicate += predicate;
            return predicate;
        }

        private static string FormatSaleOptionPredicate(int saleOption)
        {
            return String.Format(SaleOptionPredicateTemplate, saleOption);
        }

        public string ProcessStatus()
        {
            var predicate = buybackResultQuery.StatusDescriptionId != null ? FormatStatusPredicate(buybackResultQuery.StatusDescriptionId) : "";
            WherePredicate += predicate;
            return predicate;
        }

        private static string FormatStatusPredicate(int status)
        {
            return String.Format(StatusPredicateTemplate, status);
        }

        public string ProcessReserve()
        {
            //Treating a 0 reserve as null or no reserve, since we can not have a 0 reserve
            var predicate = buybackResultQuery.Reserve != null ? FormatReservePredicate(buybackResultQuery.Reserve) : "";
            WherePredicate += predicate;
            return predicate;

        }

        private static string FormatReservePredicate(int reserve)
        {
            var reserveInQuery = reserve.Equals(0) ? "IS NULL" : "=" + reserve;
            return String.Format(ReservePredicateTemplate, reserveInQuery);
        }
    }
}