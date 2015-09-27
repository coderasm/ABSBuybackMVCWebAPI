using System;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    [Table("BuybackResult")]
    public class BuybackResult
    {
        [Key]
        public int BuyBackResultId { get; set; }
        public int? VehicleId { get; set; }
        public int? HighBid { get; set; }
        public int? Reserve { get; set; }
        public int StatusDescriptionId { get; set; }
        public DateTime? ActionDate { get; set; }
        public int ResultDescriptionId { get; set; }
        public DateTime? HighBidDate { get; set; }
        public int BuybackId { get; set; }
        [Computed]
        public int Year { get; set; }
        [Computed]
        public string Make { get; set; }
        [Computed]
        public string Model { get; set; }
        [Computed]
        public int Mileage { get; set; }
        [Computed]
        public string VIN { get; set; }
        [Computed]
        public DateTime CreationDate { get; set; }
    }
}
