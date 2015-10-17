using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    [Table("BuybackResultAbsSale")]
    public class BuybackResultAbsSale
    {
        public int Id { get; set; }
        public int BuybackResultId { get; set; }
        public int? VehicleId { get; set; }
        public int? SaleId { get; set; }
    }
}