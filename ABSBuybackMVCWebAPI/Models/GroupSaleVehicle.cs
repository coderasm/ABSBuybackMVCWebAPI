
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    [Table("GroupSaleVehicles")]
    public class GroupSaleVehicle
    {
        [Key]
        public int VehicleID { get; set; }
        //Reserve
        public int MA { get; set; }
    }
}