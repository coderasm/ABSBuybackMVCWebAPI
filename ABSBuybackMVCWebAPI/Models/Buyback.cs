
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    [Table("Buyback")]
    public class Buyback
    {
        [Key]
        public int BuyBackId { get; set; }
        public int VehicleIdOriginal { get; set; }
        public int ReasonId { get; set; }
    }
}
