using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    public class BuybackResultAbsSale
    {
        [Key]
        public int BuybackResultId { get; set; }
        public int? VehicleId { get; set; }
        public int? SaleId { get; set; }
    }
}