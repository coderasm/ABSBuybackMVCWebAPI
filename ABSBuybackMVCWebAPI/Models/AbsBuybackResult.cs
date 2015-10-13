
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    public class AbsBuybackResult : BuybackResult
    {
        [Computed]
        public int? VehicleId { get; set; }
        [Computed]
        public int? SaleId { get; set; }
    }
}