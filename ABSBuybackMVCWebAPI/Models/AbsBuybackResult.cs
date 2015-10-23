
using System;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    public class AbsBuybackResult : BuybackResult
    {
        [Computed]
        public int? VehicleId { get; set; }
        [Computed]
        public int? SaleId { get; set; }
        [Computed]
        public int? SaleInstanceId { get; set; }
        [Computed]
        public DateTime? SaleFirstDate { get; set; }
    }
}