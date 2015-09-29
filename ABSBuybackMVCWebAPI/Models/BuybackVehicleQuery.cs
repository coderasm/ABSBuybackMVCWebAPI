
using System.Collections.Generic;

namespace ABSBuybackMVCWebAPI.Models
{
    public class BuybackVehicleQuery
    {
        public string BuyerId { get; set; }
        public int? SaleLocationId { get; set; }
        public List<int> VehicleIds { get; set; }
    }
}