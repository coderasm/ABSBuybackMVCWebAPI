
using System.Collections.Generic;

namespace ABSBuybackMVCWebAPI.Models
{
    public class Location
    {
        public string SaleLocation { get; set; }
        public int SaleId { get; set; }
        public List<SaleInstance> Sales { get; set; }
    }
}
