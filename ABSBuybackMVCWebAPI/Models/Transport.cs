
using System.Collections.Generic;

namespace ABSBuybackMVCWebAPI.Models
{
    public class Transport
    {
        public int VID { get; set; }
        public List<TransportNote> Notes { get; set; }
    }
}