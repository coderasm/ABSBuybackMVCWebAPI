
using System;
using System.Collections.Generic;

namespace ABSBuybackMVCWebAPI.Models
{
    public class Transport
    {
        public int VID { get; set; }
        public string Buyer { get; set; }
        public string Seller { get; set; }
        public string YMM { get; set; }
        public string VIN { get; set; }
        public string BoughtFrom { get; set; }
        public string ShipTo { get; set; }
        public DateTime SetUPDate { get; set; }
        public string SetUPPerson { get; set; }
        public string VendorCompany { get; set; }
        public DateTime? Shipped { get; set; }
        public string VehicleStatus { get; set; }
        public int LateShipped { get; set; }
        public int LateReceived { get; set; }
        public int LateReleased { get; set; }
        public int? HeatID { get; set; }
        public string IGFrameStatus { get; set; }
        public int LotTransIgInspect { get; set; }
        public DateTime? ReleaseDT { get; set; }
        public List<TransportNote> Notes { get; set; }
    }
}