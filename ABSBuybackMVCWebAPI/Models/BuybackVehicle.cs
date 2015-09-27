using System;

namespace ABSBuybackMVCWebAPI.Models
{
    public class BuybackVehicle
    {
        public int? Reserve { get; set; }
        public bool Create { get; set; }
        public int? VehicleId { get; set; }
        public string Seller { get; set; }
        public string SellerId { get; set; }
        public string Buyer { get; set; }
        public string BuyerId { get; set; }
        public int BidSheetNumber { get; set; }
        public string YMM { get; set; }
        public string VIN { get; set; }
        public string SaleLocation { get; set; }
        public int SaleLocationId { get; set; }
        public DateTime SaleFirstDate { get; set; }
        public bool Inserted { get; set; }
    }
}
